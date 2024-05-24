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

declare var $: any;
@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, AngularEditorModule, ReactiveFormsModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss',
  providers: [JobService, OptionDetailService, ProcessService],
})
export class PostJobComponent implements OnInit {
  public jobs: any = [];
  public levels: any = [];
  public contractTypes: any = [];
  public workingForms: any = [];
  public form_job: FormGroup;

  constructor(
    private fb: FormBuilder,
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
      create_by: [1],
      status: [false],
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
    this.jobService.getAllJob().subscribe((data) => {
      this.jobs = data;
    });
  }

  public openEditJobModal(id: any) {
    $('.editJobModal').trigger('click');
    try {
      this.jobService.getJobById(id).subscribe((resp) => {
        this.form_job.setValue({
          position: resp.position,
          level: resp.level,
          tech_use: resp.tech_use,
          year_exp: resp.year_exp,
          salary: resp.salary,
          member: resp.member,
          expiration_date: moment(resp.expiration_date).format('YYYY-MM-DD'),
          contract_type: resp.contract_type,
          working_form: resp.working_form,
          job_desc: resp.job_desc,
          require: resp.require,
          welfare: resp.welfare,
          time_work: resp.time_work,
          address_work: resp.address_work,
          create_date: resp.create_date,
          create_by: resp.create_by,
          status: resp.status,
        });
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Công việc không tìm thấy!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  public createJob(event: Event) {
    event.preventDefault();
    const step = $('#step-input').val();
    try {
      this.jobService.createJob(this.form_job.value).subscribe((resp) => {
        const processInterview = [];
        for (let i = 0; i < step; i++) {
          let contentInterview = {
            step: $('#step_label_' + (i + 1)).text(),
            process_content: $('#content_interview_' + (i + 1)).val(),
            create_date: '2024-05-16T21:49:12',
            jobs: {
              id: resp.id,
            }
          };
          processInterview.push(contentInterview);
        }
        // const process = [
        //   {
        //     step: 'Vòng 1',
        //     process_content: 'Vòng CV',
        //     create_date: '2024-05-16T21:49:12',
        //     jobs: {
        //       id: resp.id,
        //     },
        //   },
        //   {
        //     step: 'Vòng 2',
        //     process_content:
        //       'Phỏng vấn với HR: Giới thiệu về công ty, chia sẻ phúc lợi',
        //     create_date: '2024-05-16T21:49:12',
        //     jobs: {
        //       id: resp.id,
        //     },
        //   },
        // ];
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
    });
  }
}
