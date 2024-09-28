import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../service/auth/auth-service.service';
import { ExperienceService } from '../../../../service/user/applicant/experience.service';
import { OptionDetailService } from '../../../../service/option-detail/option-detail-service.service';
import { ExpProjectService } from '../../../../service/user/applicant/expProject.service';

declare var $:any;
@Component({
  selector: 'app-my-exp',
  standalone: true,
  imports: [
    AngularEditorModule,
    ReactiveFormsModule
  ],
  templateUrl: './my-exp.component.html',
  styleUrl: './my-exp.component.scss',
  providers: [
    AuthService,
    ExperienceService,
    ExpProjectService,
    OptionDetailService
  ]
})
export class MyExpComponent {
  public listMyExp:any = []
  public listSkill:any = []
  public listSkillFormat:any = [];
  public listProjectEXP:any = [];

  public hiddenFormProject_addExp:boolean = true;
  public hiddenFormProject_editExp:boolean = true;
  public isSelectSkill:any = true;
  public listMonth: any = [
    { id: 1, name: 'Tháng 1' },
    { id: 2, name: 'Tháng 2' },
    { id: 3, name: 'Tháng 3' },
    { id: 4, name: 'Tháng 4' },
    { id: 5, name: 'Tháng 5' },
    { id: 6, name: 'Tháng 6' },
    { id: 7, name: 'Tháng 7' },
    { id: 8, name: 'Tháng 8' },
    { id: 9, name: 'Tháng 9' },
    { id: 10, name: 'Tháng 10' },
    { id: 11, name: 'Tháng 11' },
    { id: 12, name: 'Tháng 12' },
  ];
  public listYear: any = [
    { id: 2015, name: 'Năm 2015' },
    { id: 2016, name: 'Năm 2016' },
    { id: 2017, name: 'Năm 2017' },
    { id: 2018, name: 'Năm 2018' },
    { id: 2019, name: 'Năm 2019' },
    { id: 2020, name: 'Năm 2020' },
    { id: 2021, name: 'Năm 2021' },
    { id: 2022, name: 'Năm 2022' },
    { id: 2023, name: 'Năm 2023' },
    { id: 2024, name: 'Năm 2024' },
    { id: 2025, name: 'Năm 2025' },
    { id: 2026, name: 'Năm 2026' },
    { id: 2027, name: 'Năm 2027' },
    { id: 2028, name: 'Năm 2028' },
    { id: 2029, name: 'Năm 2029' },
    { id: 2030, name: 'Năm 2030' },
  ];

  public formEXP : FormGroup;
  public formProjectEXP : FormGroup;
  private typeActiveEXP:any = null;
  private typeActiveExpProject:any = null;
  private expID:any = 0;
  private account = this.authService.getAccount();

  configEditor: AngularEditorConfig = {
    editable : true,
    spellcheck : true,
    height : "10rem",
    minHeight : '5rem',
    translate : 'yes',
    defaultParagraphSeparator : 'p',
    defaultFontName : 'Times new Roman'
  }
  constructor (
    private authService: AuthService,
    private expService: ExperienceService,
    private expProjectService: ExpProjectService,
    private opDetailService: OptionDetailService,
    private fb: FormBuilder
  ) {
    this.formEXP = this.fb.group({
      id: [null],
      company: [null],
      job_position: [null],
      start_date: [null],
      end_date: [null],
      description_exp: [null],
      skill: [null],
      update_date: new Date(),
      applicant: {
        id: this.account.type_user
      },
      status: false
    });

    this.formProjectEXP = this.fb.group({
      id: [null],
      project_name: [null],
      start_date: [null],
      completion_date: [null],
      desc_project: [null],
      create_date: new Date(),
      experience: {
        id: null
      },
      status: false,
      url: [null]
    });
  }
  // CRUD Experience
  // CRUD Project of Experience
  ngOnInit () {
    this.opDetailService.optionDetailByOptionType('TECH').subscribe({
      next: (resp) => {
        if(resp.status == 200) {
          this.listSkill = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    });
    this.loadExperience();
  }

  private loadExperience() {
    this.expService.findByApplicantID(this.account.type_user).subscribe({
      next: (resp) => {
        if(resp.status == 200) {
          this.listMyExp = resp.listResult;

          resp.listResult.forEach((item:any) => {
            if(item.skill != null){
              const listFormat = item.skill.split(',');
              this.listSkillFormat = listFormat;
            }
          });
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  private loadExpProject() {
    this.expProjectService.findByExperienceID(this.expID).subscribe({
      next: (resp) => {
        if(resp.status == 200) {
          this.listProjectEXP = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  public openAddExptModal () {
    $('#btn-model-exp').trigger('click');
    this.typeActiveEXP = 'exp-create';
    this.resetFormEXP();
    this.resetFormProjectEXP();
    this.expID = 0;
    this.listProjectEXP = [];

    const skillItem = document.querySelectorAll('.skill-item');
    if(skillItem.length > 0) {
      skillItem.forEach(item => {
        item.remove();
      });
    }
  }
  
  public closeFormProject_addExp () {
    $('#btn-add-exp').removeAttr('disabled');
    this.hiddenFormProject_addExp = true;
    $('#form-project_add').attr('hidden','true');
  }

  public showListSkill() {
    this.isSelectSkill = !this.isSelectSkill;

    $('#list-skill').attr('size',4);
  }

  public chooseSkill(value:any){
    const skills = document.querySelectorAll('.skill-item-value');
    let existSkill = false;
    skills.forEach((item) => {
      if(item.textContent == value)
        existSkill = true;
    });

    if(!existSkill){
      const element = document.createElement('div');
      element.className = `skill-item p-md-2 rounded-2 bg-danger text-light`;
      element.id = `skill-${value}`;
      const spanItem = document.createElement('span');
      spanItem.className = 'skill-item-value';
      spanItem.textContent = value;
      element.appendChild(spanItem);
  
      const spanIcon = document.createElement('span');
      spanIcon.className = 'ms-md-2';
      spanIcon.role = 'button';
      spanIcon.innerHTML = '<i class="bi bi-trash"></i>';
      spanIcon.addEventListener('click', () => {
        this.removeSkill(value);
      });
      element.appendChild(spanIcon);
  
      $('.view-skill').append(element);
      this.isSelectSkill = !this.isSelectSkill;
    }
  }

  public openEditExpModal (exp:any) {
    this.typeActiveEXP = 'exp-update';
    this.expID = exp.id;
    $('#btn-model-exp').trigger('click');
    this.formEXP.setValue({
      id: exp.id,
      company: exp.company,
      job_position: exp.job_position,
      start_date: exp.start_date,
      end_date: exp.end_date,
      description_exp: exp.description_exp,
      skill: exp.skill,
      update_date: new Date(),
      applicant: {
        id: exp.applicant.id
      },
      status: exp.status
    });
    
    $('#exp-start_month').val(exp.start_date.split('/')[0]);
    $('#exp-start_year').val(exp.start_date.split('/')[1]);
    
    if(exp.end_date != ''){
      $('#is_working').prop('checked', false);
      $('#exp-end_month').attr('disabled',false);
      $('#exp-end_year').attr('disabled',false);
      
      $('#exp-end_month').val(exp.end_date.split('/')[0]);
      $('#exp-end_year').val(exp.end_date.split('/')[1]);
    } else {
      $('#is_working').prop('checked', true);
      $('#exp-end_month').val('NO');
      $('#exp-end_year').val('NO');
    }

    if(exp.skill.length > 0){
      $('.view-skill .skill-item').remove();
      const skill = exp.skill.split(',');
      skill.forEach((item:any) => {
        const element = document.createElement('div');
        element.className = `skill-item p-md-2 rounded-2 bg-danger text-light`;
        element.id = `skill-${item}`;
        const spanItem = document.createElement('span');
        spanItem.className = 'skill-item-value';
        spanItem.textContent = item;
        element.appendChild(spanItem);
        
        const spanIcon = document.createElement('span');
        spanIcon.className = 'ms-md-2';
        spanIcon.role = 'button';
        spanIcon.innerHTML = '<i class="bi bi-trash"></i>';
        spanIcon.addEventListener('click', () => {
          this.removeSkill(item);
        });
        element.appendChild(spanIcon);
        
        $('.view-skill').append(element);
      })
    }
    
    this.loadExpProject();
  }
  
  public removeSkill(className:any) {
    const skillItem = document.querySelectorAll('.skill-item');
    skillItem.forEach(item => {
      if(item.id == `skill-${className}`){
        item.remove();
      }
    });
  }

  public isWorking(){
    if ($('#is_working').is(':checked')) {
      $('#exp-end_month').attr('disabled',true);
      $('#exp-end_year').attr('disabled',true);
      
      $('#exp-end_month').val('NO');
      $('#exp-end_year').val('NO');
    } else {
      $('#exp-end_month').attr('disabled',false);
      $('#exp-end_year').attr('disabled',false);

      if (this.formEXP.value.end_date != null){
        const date = this.formEXP.value.end_date.split('/');
        $('#exp-end_month').val(date[0]);
        $('#exp-end_year').val(date[1]);
      }
    }
  }
  
  public submitFormEXP () {
    this.formEXP.get('start_date')?.setValue($('#exp-start_month').val()+'/'+$('#exp-start_year').val());
    this.formEXP.get('end_date')?.setValue($('#exp-end_month').val()+'/'+$('#exp-end_year').val());
    
    const skilItem = document.querySelectorAll('.skill-item-value');
    let tech_use = '';
    if(skilItem.length > 0){
      for (let i = 0; i < skilItem.length; i++) {
        if(i == (skilItem.length - 1))
          tech_use += skilItem[i].innerHTML;
        else
        tech_use += skilItem[i].innerHTML + ',';
      }
    }
    this.formEXP.get('skill')?.setValue(tech_use);
  
    if (this.typeActiveEXP == 'exp-create'){
      
      this.expService.createExperience(this.formEXP.value).subscribe({
        next: (resp) => {
          if(resp.status == 403){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if(resp.status ==200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.loadExperience();
            $('#btn-model-exp').trigger('click');
          }
        },
        error(err) {
          console.error(err);
        },
      });
    }

    if (this.typeActiveEXP == 'exp-update'){
      this.expService.updateExperience(this.formEXP.value).subscribe({
        next: (resp) => {
          if(resp.status == 405){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }

          if(resp.status ==200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.loadExperience();
            $('#btn-model-exp').trigger('click');
          }
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }
  
  public deleteExp (id:any) {
    Swal.fire({
      title: "Bạn có muốn xóa dự án?",
      text: "Bạn sẽ không thể khôi phục lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2A6563",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy"
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          status: true
        }
        this.expService.deleteExperience(id, obj).subscribe({
          next : (resp) => {
            if(resp.status == 200) {
              Swal.fire({
                title: resp.message,
                icon: "success"
              });
              this.loadExperience();
            }
          },
          error(err) {
            Swal.fire({
              title: 'Xóa thất bại!',
              icon: "warning"
            });
            console.error(err);
          },
        });
      }
    });
  }
  
  public openFormAddProjectEXP () {
    this.typeActiveExpProject = 'expProject-create';
    $('#form-project_add').removeAttr('hidden');
    this.hiddenFormProject_addExp = false;
    $('#btn-add-exp').attr('disabled','true');
    this.resetFormProjectEXP();
  }

  public editProjectEXP(proj:any) {
    this.typeActiveExpProject = 'expProject-update';

    $('#form-project_add').removeAttr('hidden');
    this.hiddenFormProject_addExp = false;
    $('#btn-add-exp').attr('disabled','true');
    
    this.formProjectEXP.setValue({
      id: proj.id,
      project_name: proj.project_name,
      start_date: proj.start_date,
      completion_date: proj.completion_date,
      desc_project: proj.desc_project,
      create_date: proj.create_date,
      experience: {
        id: proj.experience.id
      },
      status: proj.status,
      url: proj.url
    });
    $('#proj_exp-start_month').val(proj.start_date.split('/')[0]);
    $('#proj_exp-start_year').val(proj.start_date.split('/')[1]);
    $('#proj_exp-end_month').val(proj.completion_date.split('/')[0]);
    $('#proj_exp-end_year').val(proj.completion_date.split('/')[1]);
  }

  public submitFormProjectEXP () {
    this.formProjectEXP.setValue({
      id: this.formProjectEXP.value.id,
      project_name: this.formProjectEXP.value.project_name,
      start_date: $('#proj_exp-start_month').val() + '/' + $('#proj_exp-start_year').val(),
      completion_date: $('#proj_exp-end_month').val() + '/' + $('#proj_exp-end_year').val(),
      desc_project: this.formProjectEXP.value.desc_project,
      create_date: this.formProjectEXP.value.create_date,
      experience: {
        id: this.expID
      },
      status: this.formProjectEXP.value.status,
      url: this.formProjectEXP.value.url
    });

    if (this.typeActiveExpProject == 'expProject-create'){
      this.expProjectService.createProjectEXP(this.formProjectEXP.value).subscribe({
        next: (resp) => {
          if(resp.status == 403){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if(resp.status ==200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.loadExpProject();
            this.closeFormProject_addExp();
          }
        },
        error(err) {
          console.error(err);
        },
      });
    }
    
    if (this.typeActiveExpProject == 'expProject-update'){
      this.expProjectService.updateProjectEXP(this.formProjectEXP.value).subscribe({
        next: (resp) => {
          if(resp.status == 405){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if(resp.status ==200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.loadExpProject();
            this.closeFormProject_addExp();
          }
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  public deleteProjectEXP(id:any) {
    Swal.fire({
      title: "Bạn có muốn xóa dự án?",
      text: "Bạn sẽ không thể khôi phục lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2A6563",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy"
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          status: true
        }
        this.expProjectService.deleteProjectEXP(id, obj).subscribe({
          next : (resp) => {
            if(resp.status == 200) {
              Swal.fire({
                title: resp.message,
                icon: "success"
              });
              this.loadExpProject();
            }
          },
          error(err) {
            Swal.fire({
              title: 'Xóa thất bại!',
              icon: "warning"
            });
            console.error(err);
          },
        });
      }
    });
  }

  private resetFormEXP(){
    this.formEXP.setValue({
      id: null,
      company: null,
      job_position: null,
      start_date: null,
      end_date: null,
      description_exp: null,
      skill: null,
      update_date: new Date(),
      applicant: {
        id: this.account.type_user
      },
      status: false
    });

    $('#is_working').prop('checked', false);
    $('#exp-end_month').attr('disabled',false);
    $('#exp-end_year').attr('disabled',false);
    $('#exp-start_month').val('NO');
    $('#exp-start_year').val('NO');
    $('#exp-end_month').val('NO');
    $('#exp-end_year').val('NO');
  }

  private resetFormProjectEXP() {
    this.formProjectEXP.setValue({
      id: null,
      project_name: null,
      start_date: null,
      completion_date: null,
      desc_project: null,
      create_date: new Date(),
      experience: {
        id: null
      },
      status: false,
      url: null
    });

    $('#proj_exp-start_month').val('NO');
    $('#proj_exp-start_year').val('NO');
    $('#proj_exp-end_month').val('NO');
    $('#proj_exp-end_year').val('NO');
  }
}
