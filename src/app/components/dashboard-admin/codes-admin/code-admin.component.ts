import { Component, OnInit, input } from '@angular/core';
import { CodeService } from '../../../service/code/code.service';
import { CommonModule, DatePipe } from '@angular/common';
import { OptionDetailService } from '../../../service/option-detail/option-detail-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import Swal from 'sweetalert2'
import { AuthService } from '../../../service/auth/auth-service.service';

declare var $:any;
@Component({
  selector: 'app-code-admin',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  templateUrl: './code-admin.component.html',
  styleUrl: './code-admin.component.scss',
  providers: [
    AuthService,
    CodeService,
    OptionDetailService
  ]
})
export class CodeAdminComponent implements OnInit{
  public codes:any = [];
  public filterCode:any = [];
  public option_details:any = [];
  public p:number = 1;
  public opd_name:any = '';
  public formOPDetail: FormGroup;
  public formAddCodeOption: FormGroup;
  public formUpdateCodeOption: FormGroup;
  private user = this.authService.getAccount();

  constructor (
    private authService: AuthService,
    private codeService: CodeService,
    private detailService: OptionDetailService,
    private fb: FormBuilder
  ){
    this.formAddCodeOption = this.fb.group({
      optionType: [null, [Validators.required]],
      optionName: [null, [Validators.required]]
    });

    this.formOPDetail = this.fb.group({
      option_name: [null,  [Validators.required]],
      create_by: [(this.user.id.split('_')[0]).toString()],
      create_date: [null]
    });

    this.formUpdateCodeOption = this.fb.group({
      id: [null],
      optionType: [null, [Validators.required]],
      optionName: [null, [Validators.required]],
      createBy:[(this.user.id.split('_')[0]).toString()],
      createDate: new Date()
    })
  }

  ngOnInit(): void {
    this.loadCodeOptionData();
  }

  private loadCodeOptionData() {
    this.codeService.getAllCodeoption().subscribe(
      {
        next: (resp) => {
          this.codes = resp.listResult;
          this.filterCode = resp.listResult;
        },
        error: (e) => {
          console.error(e);
        }
      }
    );
  }
  
  public searchCodeOption(event: Event) {
    let searchValue = (event.target as HTMLInputElement).value;

    this.filterCode = this.codes.filter((code:any) => {
      if (
        code.optionName.toLowerCase().includes(searchValue.toLowerCase())
        ||
        code.optionType.toLowerCase().includes(searchValue.toLowerCase())
        ||
        code.createDate.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return code;
      }
    });
  }

  public rowOnlyChecked(c:any) {
    const rowChecked = document.querySelectorAll('.td-checked');
    
    const tbody = document.querySelector('.tb-code-op tbody');
    const trs = tbody?.querySelectorAll('tr');
    
    rowChecked.forEach(row => {
      row.addEventListener('click', () => {
        rowChecked.forEach(r => {
          r.firstElementChild?.classList.remove('uncheck');
          r.lastElementChild?.classList.add('uncheck');
        })
        row.firstElementChild?.classList.add('uncheck');
        row.lastElementChild?.classList.remove('uncheck');
      })
    });
    
    trs?.forEach(tr => {
      tr.addEventListener('click', () => {
        trs.forEach(tr => {
          tr.classList.remove('table-active');
        })
        tr.classList.add('table-active');
      });
    });

    this.viewOptionDetail(c.id, c.optionType);
    
    this.formUpdateCodeOption.setValue({
      id: c.id,
      optionType: c.optionType,
      optionName: c.optionName,
      createBy:c.createBy,
      createDate: c.createDate
    });
  }
  
  public addCodeOption () {
    let codeOption = {
      optionType: this.formAddCodeOption.value.optionType.toUpperCase(),
      optionName: this.formAddCodeOption.value.optionName,
      createBy: (this.user.id.split('_')[0]).toString(),
      createDate: new Date(),
      status: false,
    }
    
    this.codeService.createCodeOption(codeOption).subscribe({
      next: (resp) => {
        if(resp.status == 400){
            Swal.fire({
              position: "center",
              icon: "warning",
              title: resp.message,
              showConfirmButton: false,
              timer: 1500
          });
        }
        
        if(resp.status == 200){
          Swal.fire({
            position: "center",
            icon: "success",
            title: resp.message,
            showConfirmButton: false,
            timer: 1500
          });
          
          this.resetCodeOptionForm();
          $('.close-addCodeOptionModal').trigger('click');
          this.loadCodeOptionData();
        }
      },
      error:(err) => {
        console.log(err);
      },
    });
  }

  public openEditCodeOptionForm() {
    if (!this.isSelectedCodeOption()) {
      this.formUpdateCodeOption.setValue({
        id: '',
        optionType: '',
        optionName: '',
        createBy: this.user.full_name,
        createDate: new Date()
      });
    }

    if (this.formUpdateCodeOption.value.id != '') {
      $('#open-edit-code-option').trigger('click');
    }else{
      Swal.fire({
        title: "Hãy chọn 1 Code Option trước khi thực hiện hành động này!",
        icon: "warning"
      });
      return;
    }
  }
  private isSelectedCodeOption (){
    const rowChecked = document.querySelectorAll('.td-checked');
    let isCheck = false;
    rowChecked.forEach(r => {
      if (r.lastElementChild?.className == '') {
        isCheck =  true;
      }
    })
    return isCheck;
  }
  
  public updateCodeOption () {
    let codeOption = {
      id: this.formUpdateCodeOption.value.id,
      optionType: this.formUpdateCodeOption.value.optionType.toUpperCase(),
      optionName: this.formUpdateCodeOption.value.optionName,
      createBy: (this.user.id.split('_')[0]).toString(),
      createDate: this.formUpdateCodeOption.value.createDate,
      status: false,
    }
    
    this.codeService.updateCodeOption(codeOption).subscribe({
      next: (resp) => {
        if(resp.status == 400){
            Swal.fire({
              position: "center",
              icon: "warning",
              title: resp.message,
              showConfirmButton: false,
              timer: 1500
          });
        }
        
        if(resp.status == 200){
          Swal.fire({
            position: "center",
            icon: "success",
            title: resp.message,
            showConfirmButton: false,
            timer: 1500
          });
          
          // this.resetCodeOptionForm();
          $('.close-editCodeOptionModal').trigger('click');
          this.loadCodeOptionData();
        }
      },
      error:(err) => {
        console.log(err);
      },
    });

  }

  public deleteCodeOption() {
    if (!this.isSelectedCodeOption()) {
      this.formUpdateCodeOption.setValue({
        id: '',
        optionType: '',
        optionName: '',
        createBy: this.user.full_name,
        createDate: new Date()
      });
    }

    if (this.formUpdateCodeOption.value.id != '') {
      let codeOption = {
        id: this.formUpdateCodeOption.value.id,
        optionType: this.formUpdateCodeOption.value.optionType,
        optionName: this.formUpdateCodeOption.value.optionName,
        createBy:(this.user.id.split('_')[0]).toString(),
        createDate: this.formUpdateCodeOption.value.createDate,
        status: true
      }
  
      this.codeService.deleteCodeOption(codeOption).subscribe({
        next: (resp) => {
            if (resp.status == 400) {
              Swal.fire({
                position: "center",
                icon: "warning",
                title: resp.message,
                showConfirmButton: false,
                timer: 1500
              });
            }
            if (resp.status == 200){
              Swal.fire({
                position: "center",
                icon: "success",
                title: resp.message,
                showConfirmButton: false,
                timer: 1500
              });
              this.loadCodeOptionData();
            }
        },
        error(err) {
            console.error(err)
        },
      });
    }else{
      Swal.fire({
        title: "Hãy chọn 1 Code Option trước khi thực hiện hành động này!",
        icon: "warning"
      });
      return;
    }
  }
  
  public viewOptionDetail (id:number, op_type:string) {
    this.p = 1;
    this.opd_name = op_type;
    
    this.detailService.getoptioDetailByCodeOptionID(id).subscribe({
      next: (resp) => {
          this.option_details = resp.listResult;
      },
      error: (e)=>{
        console.error(e);
      }
    });
  }

  public addOptionDetail () {
    if (this.opd_name == ''){
      Swal.fire({
        title: "Hãy chọn 1 Code Option trước khi thực hiện hành động này!",
        icon: "warning"
      });
      return;
    }

    Swal.fire({
      title: "Thêm mới Option Detail",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      showLoaderOnConfirm: true,
      preConfirm: async (value) => {
        try {
          if(value != ''){
            let opDetail = {
              option_name: value,
              create_by: (this.user.id.split('_')[0]).toString(),
              create_date: new Date(),
              codeOption: {
                id: this.formUpdateCodeOption.value.id
              },
              status: false
            }
            
            this.detailService.createOpDetail(opDetail).subscribe(
              {
                next:(resp) => {
                  return resp;
                },
              }
            );
          }
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value == ''){
          Swal.fire({
            title: "Không được để trống!",
            icon: "warning"
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm mới thành công!",
            showConfirmButton: false,
            timer: 1500
          });
          this.viewOptionDetail(
            this.formUpdateCodeOption.value.id,
            this.formUpdateCodeOption.value.optionType
          );
        }
      }
    });
  }

  private op_detail_id: number = 0;

  public editOptionDetail (o:any) {
    $('#open-eit-OPDetail').trigger('click');
    this.op_detail_id = o.id;
    this.formOPDetail.setValue({
      option_name: o.option_name,
      create_by: o.create_by,
      create_date: moment(o.create_date).format('YYYY-MM-DD')
    });
  }

  public updateOPDetail() {
    let opDetail = {
      id: this.op_detail_id,
      option_name: this.formOPDetail.value.option_name,
      create_by: (this.user.id.split('_')[0]).toString(),
      create_date: this.formOPDetail.value.create_date,
      codeOption: {
        id: this.formUpdateCodeOption.value.id
      },
      status: false
    }
    this.detailService.updateOpDetail(opDetail).subscribe({
      next: (resp) => {
        if (resp.status == 400){
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Tên "+resp.message,
            showConfirmButton: false,
            timer: 1500
          });
        }

        if (resp.status == 200){
          Swal.fire({
            position: "center",
            icon: "success",
            title: resp.message,
            showConfirmButton: false,
            timer: 1500
          });

          $('.btn-close').trigger('click');
          this.viewOptionDetail(
            this.formUpdateCodeOption.value.id,
            this.formUpdateCodeOption.value.optionType
          );
        }
      }
    });
  }

  public deleteOPDetail() {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Bạn sẽ không thể khôi phục lại sau khi xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy"
    }).then((result) => {
      if (result.isConfirmed) {
        let opDetail = {
          id: this.op_detail_id,
          option_name: this.formOPDetail.value.option_name,
          create_by: (this.user.id.split('_')[0]).toString(),
          create_date: this.formOPDetail.value.create_date,
          codeOption: {
            id: this.formUpdateCodeOption.value.id
          },
          status: true
        }
        console.log(opDetail)
        this.detailService.deleteOpDetail(opDetail).subscribe({
          next: (resp) => {
            if (resp.status == 200){
              Swal.fire({
                position: "center",
                icon: "success",
                title: resp.message,
                showConfirmButton: false,
                timer: 1500
              });

              $('.btn-close').trigger('click');
              this.viewOptionDetail(
                this.formUpdateCodeOption.value.id,
                this.formUpdateCodeOption.value.optionType
              );
            }
          }
        });
      }
    });
  }
  
  public resetCodeOptionForm(){
    this.formAddCodeOption.setValue({
      optionType: [null],
      optionName: [null]
    });
  }

}
