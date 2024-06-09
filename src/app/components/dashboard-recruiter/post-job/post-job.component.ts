import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { JobService } from '../../../service/Job/job-service.service';
import { OptionDetailService } from '../../../service/option-detail/option-detail-service.service';

import Swal from 'sweetalert2';
import moment from 'moment';
import { ProcessService } from '../../../service/process/process-service.service';
import { AuthService } from '../../../service/auth/auth-service.service';
import { NgxPaginationModule } from 'ngx-pagination';

declare var $: any;
@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, AngularEditorModule, ReactiveFormsModule,NgxPaginationModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss',
  providers: [
    JobService,
    OptionDetailService,
    ProcessService
  ],
})
export class PostJobComponent implements OnInit {
  public jobs: any = [];
  public levels: any = [];
  public contractTypes: any = [];
  public workingForms: any = [];
  public processByJob:any = [];
  public isEditProcess:any = false;
  public page:number = 1;
  public form_job: FormGroup;
  private user = this.authService.getAccount();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jobService: JobService,
    private opDetailService: OptionDetailService,
    private proService: ProcessService
  ) {
    this.form_job = this.fb.group({
      position: [null],
      level: ['NO'],
      tech_use: [null],
      year_exp: [null],
      salary: [null],
      member: [null],
      expiration_date: [moment().format('YYYY-MM-DD')],
      contract_type: ['NO'],
      working_form: ['NO'],
      job_desc: [null],
      require: [null],
      welfare: [null],
      time_work: [null],
      address_work: [null],
      create_date: new Date(),
      create_by: this.user.id.split('_')[0],
      status: [false],
      is_confirmed: ['Chưa xét duyệt'],
      confirm_by: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();

    this.opDetailService.getOptionDetailLevel().subscribe((data) => {
      this.levels = data;
    });

    this.opDetailService.getOptionDetailContractType().subscribe((data) => {
      this.contractTypes = data;
    });

    this.opDetailService.getOptionDetailWorkingForm().subscribe((data) => {
      this.workingForms = data;
    });
  }

  configEditor: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    translate: 'yes',
    defaultParagraphSeparator: 'div',
    enableToolbar: true,
    showToolbar: true,
    defaultFontName: 'Times new Roman',
  };

  private loadData() {
    this.jobService.getAllJob(this.user.id.split('_')[0]).subscribe((data) => {
      this.jobs= data.listResult;
    });
  }

  public openEditJobModal(id: any) {
    $('.editJobModal').trigger('click');
    try {
      this.jobService.getJobById(id).subscribe((resp) => {
        if (resp.status == 200) {
          this.form_job.setValue({
            position: resp.result.position,
            level: resp.result.level,
            tech_use: resp.result.tech_use,
            year_exp: resp.result.year_exp,
            salary: resp.result.salary,
            member: resp.result.member,
            expiration_date: moment(resp.result.expiration_date).format('YYYY-MM-DD'),
            contract_type: resp.result.contract_type,
            working_form: resp.result.working_form,
            job_desc: resp.result.job_desc,
            require: resp.result.require,
            welfare: resp.result.welfare,
            time_work: resp.result.time_work,
            address_work: resp.result.address_work,
            create_date: resp.result.create_date,
            create_by: resp.result.create_by,
            status: resp.result.status,
            is_confirmed: resp.result.is_confirmed,
            confirm_by: resp.result.confirm_by
          });
          this.proService.processByJobID(resp.result.id).subscribe({
            next: (resp) => {
              this.processByJob = resp.listResult;
              if (this.processByJob.length <= 0) 
                this.isEditProcess = true;
            },
            error(err) {
              console.error(err)
            }
          });
          
        }
        if (resp.status == 404) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: resp.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public createJob(event: Event) {
    event.preventDefault();
    const step = $('#step-input').val();
    try {
      this.jobService.createJob(this.form_job.value).subscribe((resp) => {
        if (step != '') {
          const processInterview = [];
          for (let i = 0; i < step; i++) {
            let contentInterview = {
              step: $('#step_label_' + (i + 1)).text(),
              process_content: $('#content_interview_' + (i + 1)).val(),
              create_date: new Date(),
              jobs: {
                id: resp.result.id,
              }
            };
            processInterview.push(contentInterview);
          }
          
          for (let i = 0; i < processInterview.length; i++) {
            this.proService.createProcess(processInterview[i]).subscribe((resp) => {
              console.log(resp);
            });
          }
         
          $('.close-add-job').trigger('click');
          this.loadData();
  
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đăng công việc thành công!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Đăng công việc thất bại!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  public stepInterview() {
    const step = $('#step-input').val();
    const stepItem = document.querySelectorAll('step-item');

    if (stepItem.length <= 0) {
      $('#step').empty();
    }

    for (let i = 0; i < step; i++) {
      $('#step').append(
        '<div class="mb-3 step-item">' +
          '<label class="form-label" id="step_label_' + (i + 1) + '">Bước ' +
          (i + 1) +
          ':</label>' +
          '<input type="text" class="form-control" id="content_interview_' +
          (i + 1) +
          '" placeholder="Nội dung phỏng vấn" />' +
          '</div>'
      );
    }
  }

  public resetForm() {
    this.form_job.setValue({
      position: [null],
      level: ['NO'],
      tech_use: [null],
      year_exp: [null],
      salary: [null],
      member: [null],
      expiration_date: [moment().format('YYYY-MM-DD')],
      contract_type: ['NO'],
      working_form: ['NO'],
      job_desc: [null],
      require: [null],
      welfare: [null],
      time_work: [null],
      address_work: [null],
      create_date: new Date(),
      create_by: 1,
      status: false,
      is_confirmed: ['Chưa xét duyệt'],
      confirm_by: ['']
    });
  }
  // design edit process
  public openEditProcess () {
    this.isEditProcess=true;
  }
  public cancleEditProcess () {this.isEditProcess=false;}
}
