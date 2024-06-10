import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../service/Job/job-service.service';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { AuthService } from '../../../service/auth/auth-service.service';
import { OptionDetailService } from '../../../service/option-detail/option-detail-service.service';
import { ProcessService } from '../../../service/process/process-service.service';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-managerment-job',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    UpperCasePipe,
    AngularEditorModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  templateUrl: './manager-job.component.html',
  styleUrl: './manager-job.component.scss',
  providers: [
    JobService,
    OptionDetailService,
    ProcessService
  ]
})
export class ManagermentjobComponent implements OnInit{

  private jobs:any = [];
  public filterJob:any = [];
  public levels: any = [];
  public contractTypes: any = [];
  public workingForms: any = [];
  public approvals: any = [];
  public processByJob:any = [];
  public p = 1;
  public isEditProcess:any = false;
  public formJob: FormGroup;
  private user = this.authService.getAccount();

  constructor(
    private jobService: JobService,
    private fb: FormBuilder,
    private authService: AuthService,
    private opDetailService: OptionDetailService,
    private proService: ProcessService
  ) {
    this.formJob = this.fb.group({
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
      create_by: '',
      status: [false],
      is_confirmed: 'Chưa xét duyệt',
      confirm_by: ''
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

      this.opDetailService.getOptionDetailApproval().subscribe((data) => {
        this.approvals = data;
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
    this.p = 1;
    this.jobService.getAllJob().subscribe({
      next: (resp) => {
          if(resp.status == 200){
            this.jobs = resp.listResult;
            this.filterJob = resp.listResult;
          }
      },
      error(err) {
          console.error(err);
      },
    })
  }

  private jobID:number = 0;
  public openEditJob(j:any){
    $('.edit-job-modal').trigger('click');
    this.jobID = j.id;
    this.formJob.setValue({
      position: j.position,
      level: j.level,
      tech_use: j.tech_use,
      year_exp: j.year_exp,
      salary: j.salary,
      member: j.member,
      expiration_date: moment(j.expiration_date).format('YYYY-MM-DD'),
      contract_type: j.contract_type,
      working_form: j.working_form,
      job_desc: j.job_desc,
      require: j.require,
      welfare: j.welfare,
      time_work: j.time_work,
      address_work: j.address_work,
      create_date: j.create_date,
      create_by: this.responseFullnameCreateBy(j.create_by)[0],
      status: j.status,
      is_confirmed: j.is_confirmed,
      confirm_by: j.confirm_by
    });

    this.proService.processByJobID(j.id).subscribe({
      next: (resp) => {
        this.processByJob = resp.listResult;
        if (this.processByJob.length <= 0) 
          this.isEditProcess = true;
        else
          this.isEditProcess = false;
      },
      error(err) {
        console.error(err)
      }
    });
  }
  
  public approvalJob() {
    let approval = {
      is_confirmed: this.formJob.value.is_confirmed,
      confirm_by: this.user.id.split('_')[0]
    }
    this.jobService.approvalJob(this.jobID,approval).subscribe({
      next: (resp) => {
        if(resp.status == 200) {
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
    })
  }

  public deleteJob() {
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
    
        this.jobService.deleteJob(this.jobID, request).subscribe({
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

  //Search Job
  public searchJob() {
    const techUse = $('#techUseValue').val();
    const approval = $('#approval').val();
    const createDate = moment($('#createDateValue').val()).format('YYYYMMDD');
    const expirationDate = moment($('#expirationDateValue').val()).format('YYYYMMDD');
    console.log(approval)
    this.filterJob = this.jobs.filter((job:any) => {
      if (techUse != '' && createDate == 'Invalid date' && expirationDate == 'Invalid date' && approval == 'NO') {
        if(job.tech_use.toLowerCase().includes(techUse.toLowerCase())){
          return job;
        }
      } else if (techUse == '' && createDate != 'Invalid date' && expirationDate == 'Invalid date' && approval == 'NO'){
        if(moment(job.create_date).format('YYYYMMDD').includes(createDate)){
          return job;
        }
      } else if (techUse == '' && createDate == 'Invalid date' && expirationDate != 'Invalid date' && approval == 'NO'){
        if(moment(job.expiration_date).format('YYYYMMDD').includes(expirationDate)){
          return job;
        }
      } else if (techUse == '' && createDate == 'Invalid date' && expirationDate == 'Invalid date' && approval != 'NO'){
        if(job.is_confirmed.toLowerCase().includes(approval.toLowerCase())){
          return job;
        }
      } else if(techUse != '' && createDate != 'Invalid dte' && expirationDate == 'Invalid date'){
        if(
          job.tech_use.toLowerCase().includes(techUse.toLowerCase())
          &&
          moment(job.create_date).format('YYYYMMDD').includes(createDate)
        ){
          console.log
          return job;
        }
      } else if (techUse != '' && createDate != 'Invalid date' && expirationDate != 'Invalid date'){
        if(
          job.tech_use.toLowerCase().includes(techUse.toLowerCase())
          &&
          moment(job.create_date).format('YYYYMMDD').includes(createDate)
          &&
          moment(job.expiration_date).format('YYYYMMDD').includes(expirationDate)
        ){
          return job;
        }
      } else if (techUse != '' && createDate == 'Invalid date' && expirationDate != 'Invalid date'){
        if(
          job.tech_use.toLowerCase().includes(techUse.toLowerCase())
          &&
          moment(job.expiration_date).format('YYYYMMDD').includes(expirationDate)
        ){
          return job;
        }
      } else if (techUse == '' && createDate != 'Invalid date' && expirationDate != 'Invalid date'){
        if(
          moment(job.create_date).format('YYYYMMDD').includes(createDate)
          &&
          moment(job.expiration_date).format('YYYYMMDD').includes(expirationDate)
        ){
          return job;
        }
      } else{
        return job;
      }
    });
  }

  public openEditProcess () {
    this.isEditProcess=true;
  }
  public cancleEditProcess () {this.isEditProcess=false;}

  public responseFullnameCreateBy(createBy:any) {
    return createBy.split('_');
  }
}
