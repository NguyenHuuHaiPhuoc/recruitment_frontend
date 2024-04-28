import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth-service.service';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MySkillComponent } from '../my-skill/my-skill.component';
import Swal from 'sweetalert2';
import { MyExpComponent } from '../my-exp/my-exp.component';
import { MyProjectComponent } from '../my-project/my-project.component';


declare var $: any;
@Component({
  selector: 'app-my-cv',
  standalone: true,
  imports: [
    MySkillComponent,
    MyExpComponent,
    MyProjectComponent,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule
  ],
  templateUrl: './my-cv.component.html',
  styleUrl: './my-cv.component.scss'
})
export class MyCvComponent {
  public avatar = '/assets/img/users/icon-user-male-default.png';
  public list_month:any = [{id:1,name:'Tháng 1'},{id:2,name:'Tháng 2'},{id:3,name:'Tháng 3'},{id:4,name:'Tháng 4'},
                          {id:5,name:'Tháng 5'},{id:6,name:'Tháng 6'},{id:7,name:'Tháng 7'},{id:8,name:'Tháng 8'},
                          {id:9,name:'Tháng 9'},{id:10,name:'Tháng 10'},{id:11,name:'Tháng 11'},{id:12,name:'Tháng 12'}];
  public list_year:any = [{id:1990,name:'Năm 1990'},{id:1991,name:'Năm 1991'},{id:1992,name:'Năm 1992'},{id:1993,name:'Năm 1993'}];
  public user:any = [];
  // List education của người dùng lấy về từ db
  public edu:any = [
    // {
    //   id : 1,
    //   university_name : 'Cao đẳng FPT POlytecnich',
    //   major : 'CNTT-UDPM',
    //   start_date : '10/1990',
    //   end_date : '10/1993',
    //   description : ''
    // },
    // {
    //   id : 2,
    //   university_name : 'Đại học kinh tế quốc dân',
    //   major : 'Kinh tế',
    //   start_date : '10/1990',
    //   end_date : '10/1993',
    //   description : 'Toi dang hoc o'
    // }
  ];

  public form_infoUser: FormGroup;
  public form_infoEdu: FormGroup;

  public isHiddenEndDate:boolean = false;
  
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
    private fb: FormBuilder
  ) {
    this.form_infoUser = new FormGroup({
      full_name : new FormControl(''),
      sumary : new FormControl('')
    });

    this.form_infoEdu = this.fb.group({
      university_name : '',
      major : '',
      study_now: false,
      start_month : 'selected',
      start_year : 'selected',
      end_month : 'selected',
      end_year : 'selected',
      description : ''
    });
  }

  ngOnInit () {
    this.user = this.authService.getAccount();
    // console.log(this.form_infoEdu.value);
    
  }

  openUpdateModal () {
    const btn_updateModal = document.getElementById('btn-modal-updateInfoUser') as HTMLButtonElement;
    btn_updateModal.click();
  }

  openEditEdu (id:any) {
    $('#btn-edit-edu-modal').trigger('click');
    const edu_filter = this.edu.filter((e:any) => e.id === id);
    const edu_item = edu_filter[0];
    
    this.form_infoEdu.setValue({
      university_name : edu_item.university_name,
      major : edu_item.major,
      study_now : false,
      start_month : edu_item.start_date.split("/")[0],
      start_year : edu_item.start_date.split("/")[1],
      end_month : edu_item.end_date.split("/")[0],
      end_year : edu_item.end_date.split("/")[1],
      description : edu_item.description
    });
    // xử lý khi chọn đang học -->
  }
  
  openAddEdu () {
    $('#btn-add-edu-modal').trigger('click');
  }
  
  upadteUser () {
    console.log(this.form_infoUser.value);
  }

  // post create education of user
  addEducation(){
    // this.isHidden_addEduForm = !this.isHidden_addEduForm;
  }
  // post update education of user
  updateEducation () {
    console.log(this.form_infoEdu.value);
    
  }

  deleteEducation (id:any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  isStudyNowChecked () {
    if( $('#study-now').is(':checked') ){
      this.isHiddenEndDate = true;
    }
    else{
      this.isHiddenEndDate = false;
    }
  }
}
