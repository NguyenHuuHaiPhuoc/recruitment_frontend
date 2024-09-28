import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { EducationService } from '../../../../service/user/applicant/education.service';
import { AuthService } from '../../../../service/auth/auth-service.service';

declare var $: any;
@Component({
  selector: 'app-my-education',
  standalone: true,
  imports: [
    // FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './my-education.component.html',
  styleUrl: './my-education.component.scss',
  providers: [AuthService, EducationService],
})
export class MyEducationComponent implements OnInit {
  public edus: any = [];
  public isHiddenEndDate: boolean = false;
  public list_month: any = [
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
  public list_year: any = [
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
  public formEducation: FormGroup;

  private account = this.authServive.getAccount();
  private typeActive:any = null;

  constructor(
    private eduService: EducationService,
    private authServive: AuthService,
    private fb: FormBuilder
  ) {
    this.formEducation = this.fb.group({
      id: [null],
      university_name: [null, [Validators.required]],
      major: [null, [Validators.required]],
      start_date: [null],
      completion_date: [null],
      description: [null],
      update_date: new Date(),
      applicant: {
        id: this.account.type_user,
      },
      status: false,
    });
  }
  // CRUD Education

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.eduService.findByApplicantID(this.account.type_user).subscribe({
      next: (resp) => {
        if (resp.status == 200) {
          this.edus = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  public openAddEdu() {
    $('#btn-add-edu-modal').trigger('click');
    this.typeActive = 'create';
    this.resetFormEducation();
  }

  public openEditEdu(e: any) {
    this.typeActive = 'update';

    $('#btn-add-edu-modal').trigger('click');

    this.formEducation.setValue({
      id: e.id,
      university_name: e.university_name,
      major: e.major,
      start_date: e.start_date,
      completion_date: e.completion_date,
      description: e.description,
      update_date: new Date(),
      applicant: {
        id: e.applicant.id,
      },
      status: e.status,
    });

    $('#start_month').val(e.start_date.split('/')[0]);
    $('#start_year').val(e.start_date.split('/')[1]);

    if (e.completion_date == '') {
      $('#study-now').prop('checked', true);
      $('#end_month').val('NO');
      $('#end_year').val('NO');
      this.isHiddenEndDate = true;
      return;
    }

    $('#study-now').prop('checked', false);
    this.isHiddenEndDate = false;
    $('#end_month').val(e.completion_date.split('/')[0]);
    $('#end_year').val(e.completion_date.split('/')[1]);
  }

  public activeEducation() {
    if (this.typeActive == 'create'){
      this.formatDate();
      this.eduService.createEducation(this.formEducation.value).subscribe({
        next: (resp) => {
          if (resp.status == 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.loadData();
          }
  
          if (resp.status == 403) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        error(err) {
          console.error(err);
        },
      });
    }

    if (this.typeActive == 'update'){
      this.formatDate();
      
      this.eduService.updateEducation(this.formEducation.value).subscribe({
        next: (resp) => {
          if (resp.status == 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.loadData();
          }
  
          if (resp.status == 405) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }
  
  // update and delete education
  public deleteEducation(id: any) {
    Swal.fire({
      title: "Bạn có muốn xóa?",
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

        this.eduService.deleteEducation(id, obj).subscribe({
          next : (resp) => {
            if(resp.status == 200) {
              Swal.fire({
                title: resp.message,
                icon: "success"
              });
              this.loadData();
            }
          },
          error(err) {
            Swal.fire({
              title: 'Xóa thất bại!',
              icon: "warning"
            });
            console.error(err);
          },
        })
      }
    });
  }

  public isStudyNowChecked() {
    if ($('#study-now').is(':checked')) {
      this.isHiddenEndDate = true;
      $('#end_month').val('NO');
      $('#end_year').val('NO');
    } else {
      this.isHiddenEndDate = false;
      if (this.typeActive == 'update'){
        const obj = this.edus.filter((item:any) => item.id == this.formEducation.value.id);
        
        if (obj[0].completion_date != ''){
          $('#end_month').val(obj[0].completion_date.split('/')[0]);
          $('#end_year').val(obj[0].completion_date.split('/')[1]);
        }
      }
    }
  }

  private resetFormEducation() {
    this.formEducation.setValue({
      id:[null],
      university_name: [null],
      major: [null],
      start_date: [null],
      completion_date: [null],
      description: [null],
      update_date: new Date(),
      applicant: {
        id: this.account.type_user,
      },
      status: false,
    });

    this.isHiddenEndDate = false;
    $('#study-now').prop('checked', false);

    $('#start_month').val('NO');
    $('#start_year').val('NO');

    $('#end_month').val('NO');
    $('#end_year').val('NO');
  }

  private formatDate() {
    const startDate = $('#start_month').val() + '/' + $('#start_year').val();
    this.formEducation.get('start_date')?.setValue(startDate);

    let completionDate = '';
    if (!this.isHiddenEndDate) {
      completionDate = $('#end_month').val() + '/' + $('#end_year').val();
      this.formEducation.get('completion_date')?.setValue(completionDate);
    } else{
      this.formEducation.get('completion_date')?.setValue(completionDate);
    }
  }
}
