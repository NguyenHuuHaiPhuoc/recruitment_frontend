import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

import Swal from 'sweetalert2';

import moment from 'moment';
import { AuthService } from '../../../service/auth/auth-service.service';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { OptionDetailService } from '../../../service/option-detail/option-detail-service.service';
import { JobService } from '../../../service/Job/job-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProcessService } from '../../../service/process/process-service.service';
import { Subscription, interval } from 'rxjs';

declare var $:any;
@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [
    MatTabsModule,
    AngularEditorModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
  providers: [
    AuthService,
    JobService,
    OptionDetailService,
    ProcessService
  ]
})
export class CampaignComponent implements OnInit, OnDestroy{
  public error:boolean = false;
  public levels:any = null;
  public contractTypes:any = null;
  public workingForms:any = null;
  public jobs:any = [];
  public formJob: FormGroup;
  public formEditJob: FormGroup;
  public page:number = 1;
  public isEditJob = false;
  public processByJob:any = [];
  public isEditProcess:any = false;
  private subscription?: Subscription;

  private account = this.authService.getAccount();

  constructor( 
    private authService: AuthService,
    private opDetailService: OptionDetailService,
    private jobService: JobService,
    private proService: ProcessService,
    private formbuilder: FormBuilder){
    this.formJob = this.formbuilder.group({
      position: [null, [Validators.required]],
      level: ['NO'],
      tech_use: [null, [Validators.required]],
      year_exp: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      member: [null, [Validators.required]],
      expiration_date: [moment().format('YYYY-MM-DD')],
      contract_type: ['NO'],
      working_form: ['NO'],
      job_desc: [null],
      require: [null],
      welfare: [null],
      time_work: [null],
      address_work: [null],
      create_date: new Date(),
      create_by: this.account.id.split('_')[0],
      status: false,
      is_confirmed: 'Chưa xét duyệt',
      confirm_by: null
    });
    this.formEditJob = this.formbuilder.group({
      id: [null],
      position: [null, [Validators.required]],
      level: ['NO'],
      tech_use: [null, [Validators.required]],
      year_exp: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      member: [null, [Validators.required]],
      expiration_date: [moment().format('YYYY-MM-DD')],
      contract_type: ['NO'],
      working_form: ['NO'],
      job_desc: [null],
      require: [null],
      welfare: [null],
      time_work: [null],
      address_work: [null],
      create_date: new Date(),
      create_by: this.account.id.split('_')[0],
      status: [false],
      is_confirmed: 'Chưa xét duyệt',
      confirm_by: null
    });

    const checkInterval = interval(3000); // kiem tra data thay doi tu db sau moi 2s
    this.subscription = checkInterval.subscribe(() => {
      this.jobService.getAllJobByAccountID(this.account.id.split('_')[0]).subscribe(data => {
        this.jobs = data.listResult;
      });
    });
  }

  public configEditor: AngularEditorConfig = {
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

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  private loadData() {
    this.opDetailService.optionDetailByOptionType('LEVEL').subscribe({
      next: (resp) => {
          if(resp.status == 200)
            this.levels = resp.listResult;
      },
      error(err) {
        console.log(err);
      },
    });
    this.opDetailService.optionDetailByOptionType('CONTRACT_TYPE').subscribe({
      next: (resp) => {
          if(resp.status == 200)
            this.contractTypes = resp.listResult;
      },
      error(err) {
        console.log(err);
      },
    });
    this.opDetailService.optionDetailByOptionType('WORKING_FORM').subscribe({
      next: (resp) => {
          if(resp.status == 200)
            this.workingForms = resp.listResult;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  public createJob(){
    this.jobService.createJob(this.formJob.value).subscribe({
      next : (resp) => {
        if(resp.status != 200){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Đăng công việc thất bại!',
            showConfirmButton: false,
            timer: 1500,
          });
          return ;
        }

        if(resp.status == 200){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đăng công việc thành công!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.resetFormCreateJob();

          if($('#step-input').val() > 0){
            const stepItem = document.querySelectorAll('.step-item');
            for (let i = 0; i < stepItem.length; i++) {
              const process = {
                step: $('#step_label_' + (i + 1)).text(),
                  process_content: $('#content_interview_' + (i + 1)).val(),
                  create_date: new Date(),
                  jobs: {
                    id: resp.result.id
                  }
              };
              this.proService.createProcess(process).subscribe();
            }
            $('#step-input').val(0);
            $('#step').empty();
          }
        }
      },
      error(err) {
          console.log(err);
      },
    });
  }

  public stepInterview() {
    const step = $('#step-input').val();
    const stepEdit = $('#step-input-edit').val();
    const stepItem = document.querySelectorAll('step-item');

    if(step < 0){
      $('#step-input').val(0);
    }
    if(stepEdit < 0){
      $('#step-input-edit').val(0);
    }

    if (stepItem.length <= 0) {
      $('#step').empty();
      $('#step-edit').empty();
    }
    
    if (step != null){
      for (let i = 0; i < step; i++) {
        $('#step').append(
          '<div class="mb-3 step-item w-50">' +
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
    
    if (stepEdit != null){
      for (let i = 0; i < stepEdit; i++) {
        $('#step-edit').append(
          '<div class="mb-3 step-edit-item">' +
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
  }

  public editJob(job:any){
    this.isEditJob = true;
    this.formEditJob.setValue({
      id: job.id,
      position: job.position,
      level: job.level,
      tech_use: job.tech_use,
      year_exp: job.year_exp,
      salary: job.salary,
      member: job.member,
      expiration_date: moment(job.expiration_date).format('YYYY-MM-DD'),
      contract_type: job.contract_type,
      working_form: job.working_form,
      job_desc: job.job_desc,
      require: job.require,
      welfare: job.welfare,
      time_work: job.time_work,
      address_work: job.address_work,
      create_date: job.create_date,
      create_by: this.account.id.split('_')[0],
      status: job.status,
      is_confirmed: job.is_confirmed,
      confirm_by: job.confirm_by
    });
    this.proService.processByJobID(job.id).subscribe({
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

  public backToList() {this.isEditJob = false;}

  public openEditProcess () {this.isEditProcess=true;}
  public cancleEditProcess () {this.isEditProcess=false;}

  public updateJob(){
    this.jobService.updateJob(this.formEditJob.value).subscribe({
      next: (resp) => {
        if (resp.status == 405){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: resp.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        if (resp.status = 200){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: resp.message,
            showConfirmButton: false,
            timer: 1500,
          });

          if(this.isEditProcess || this.processByJob.length == 0){
            if(this.processByJob.length > 0) {
              this.processByJob.forEach((p:any) => {
                this.proService.deleteProcess(p.id).subscribe();
              });
            }

            const stepItem = document.querySelectorAll('.step-edit-item');
            for (let i = 0; i < stepItem.length; i++) {
              const process = {
                step: $('#step_label_' + (i + 1)).text(),
                  process_content: $('#content_interview_' + (i + 1)).val(),
                  create_date: new Date(),
                  jobs: {
                    id: resp.result.id
                  }
              };
              this.proService.createProcess(process).subscribe();
            }
          }
        }
      },
      error(err) {
          console.error(err);
      },
    })
  }

  public deleteJob(id:any) {
    Swal.fire({
      title: "Bạn có muốn xóa không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, hãy xóa!",
      cancelButtonText: "Hủy"
    }).then((result) => {
      if (result.isConfirmed) {
        let request = {
          status: true
        }
    
        this.jobService.deleteJob(id, request).subscribe({
          next: (resp) => {
              if(resp.status == 200){
                $('.edit-job-modal').trigger('click');
                this.loadData();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: resp.message,
                  showConfirmButton: false,
                  timer: 1500
                });
              } else if (resp.status == 405) {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: resp.message,
                  showConfirmButton: false,
                  timer: 1500
                });
              }
          },
        });
      }
    });
  }

  public resetFormCreateJob(){
    this.isEditJob = false;
    this.formJob.setValue({
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
      create_by: this.account.id.split('_')[0],
      status: [false],
    });
  }
}
