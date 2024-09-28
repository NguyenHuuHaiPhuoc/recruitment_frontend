import { Component, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../service/auth/auth-service.service';
import { OptionDetailService } from '../../../../service/option-detail/option-detail-service.service';
import { SkillService } from '../../../../service/user/applicant/skill.service';

declare var $:any;
@Component({
  selector: 'app-my-skill',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './my-skill.component.html',
  styleUrl: './my-skill.component.scss',
  providers: [
    AuthService,
    OptionDetailService,
    SkillService
  ]
})
export class MySkillComponent{
  /** Danh sach skil lay tu db cho nguoi dung chon*/
  public skills = [];
  public searchs:any = '';
  public isHiddenSelect:boolean = true; /** xu ly lai voi bien nay (khi focus voi input) */
  public disabledSubmitAddSkill:boolean = true;
  public listSkillFilter:any = [];
  public listMySkill:any = [];/** Danh sach skill cua nguoi dung lay tu db */
  private listSkillChoose: any[] = [];

  private account = this.authService.getAccount();

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private skillService: SkillService,
    private opDetailService: OptionDetailService
  ) {}
  // CRUD Skill
  ngOnInit ():void {
    this.opDetailService.optionDetailByOptionType('TECH').subscribe({
      next : (resp) => {
        if(resp.status == 200) {
          this.skills = resp.listResult;
          this.listSkillFilter = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    });

    this.loadData();
  }

  private loadData(){
    this.skillService.findAllSkill(this.account.type_user).subscribe({
      next: (resp) => {
        if(resp.status == 200) {
          this.listMySkill = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    })
  }

  openAddSkillModal () {
    $('#btn-add-skill').trigger('click');
  }

  openEditSkillModal() {
    $('#btn-edit-skill').trigger('click');
  }
  closeEditSkillModal() {
    $('#btn-edit-skill').trigger('click');
  }

  showSelectSkill() {
    this.isHiddenSelect = !this.isHiddenSelect;
    this.listSkillFilter = this.skills;
    $('#skills').attr('size', 4);
  }

  closeAddSkillModal(){
    // Xoa tat ca cac option da chon khi dong modal
    const spans = document.querySelectorAll('.skill_item');
    
    spans.forEach(span => {
      this.renderer.removeChild(span.parentNode, span);
    });
    //Xoa cac phan tu trong danh sach listSkillChose
    this.listSkillChoose = [];
    // Disabled nut cap nhat
    this.disabledSubmitAddSkill = true;
    // Dong modal
    $('#btn-add-skill').trigger('click');
  }

  choseOptionSkill(id:number,value:any){
    // Kiểm tra khi chọn 1 option 2 lần
    const isValueInlistMySkill = this.listMySkill.filter((item:any) => item.skill_name === value);
    const isValueInlistSkillChoose = this.listSkillChoose.filter((item:any) => item.id === id);
    
    if (isValueInlistSkillChoose.length <=0 && isValueInlistMySkill.length <= 0) {
      this.listSkillChoose.push({
        id: id,
        name: value
      });
      this.addSkillElement(id,value);
      this.showSelectSkill();
      if($('.search-skill').val() != '') $('.search-skill').val('');
    }
    // Disabled button khi chua chon option nao
    if (this.listSkillChoose.length <= 0) 
      this.disabledSubmitAddSkill = true;
    else
      this.disabledSubmitAddSkill = false;
  }

  // Add option được chọn vào danh sách và hiển thị ra giao diện
  private addSkillElement(id:any,value:any){
    const span_view_skills = document.getElementById('view-skills');
    
    // create and style <div>
    if(span_view_skills){
      const skill_item = document.createElement('div');
      skill_item.className = 'skill_item';
      skill_item.setAttribute('id',id);
      skill_item.style.padding = '3px';
      skill_item.style.marginLeft = '5px';
      skill_item.style.border = '1px solid red';
      skill_item.style.borderRadius = '5px';
      skill_item.style.backgroundColor = 'red';
      skill_item.style.color = '#ffff';

      // create and style <span>
      const span_selection_remove = document.createElement('span');
      
      span_selection_remove.className='selection-remove';
      span_selection_remove.style.marginRight='7px';
      span_selection_remove.setAttribute('role', 'button');
      span_selection_remove.innerText = 'x';

      skill_item.appendChild(span_selection_remove);
      
      const skill_text = document.createTextNode(value);
      skill_item.appendChild(skill_text);

      const firstChild = span_view_skills.firstChild;
      span_view_skills.insertBefore(skill_item, firstChild);
    }
  }
  
  // Filter input search skills
  public searchSkill(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;

    if ($('.search-skill').val() != '')
      this.isHiddenSelect = false;

    this.listSkillFilter = this.skills.filter((item:any) => {
      return JSON.stringify(item.option_name.toLowerCase()).includes(searchTerm.toLowerCase());
    });
    $('#skills').attr('size',this.listSkillFilter.length + 1);
  }

  // Create skill in db
  public addSkill () {
    // console.log(this.listSkillChoose);
    let listSkill = [];
    for (let i = 0; i < this.listSkillChoose.length; i++) {
      const skill = {
        skill_key: 'specializes_skill',
        skill_name: this.listSkillChoose[i].name,
        applicant: {
          id: this.account.type_user
        }
      }
      listSkill.push(skill);
    }
    
    this.skillService.createSkill(listSkill).subscribe({
      next: (resp) => {
        if(resp.status == 200) {
          this.closeAddSkillModal();
          this.message('success',resp.message);
          this.loadData()
        }
      },
      error(err) {
        console.error(err);
      },
    });

  }

  // Delele skill in db
  public deleteSkill(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-md-2",
        cancelButton: "btn btn-danger mx-md-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Bạn chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillService.deleteSkill(id).subscribe({
          next: (resp) => {
            if(resp.status == 200) {
              this.message('success',resp.message);
              this.loadData()
            }
          },
          error:(err) => {
            this.message('warning','Xóa thất bại');
            console.error(err);
          },
        });
      }
    });
  }

  private message (status:any,message:any) {
    Swal.fire({
      position: "center",
      icon: status,
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
}


