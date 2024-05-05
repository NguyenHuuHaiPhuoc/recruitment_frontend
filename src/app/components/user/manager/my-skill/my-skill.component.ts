import { Component, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-my-skill',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './my-skill.component.html',
  styleUrl: './my-skill.component.scss'
})
export class MySkillComponent{
  /** Danh sach skil lay tu db cho nguoi dung chon*/
  public skills = [
    {id:1, code:'Java'},
    {id:2, code:'PHP'},
    {id:3, code:'C#'},
    {id:4, code:'HTML/CSS'},
    {id:5, code:'Python'},
    {id:6, code:'.Net'},
    {id:7, code:'My SQL'},
    {id:8, code:'JavaScript'},
    {id:9, code:'MS SQL Server'}
  ];
  public searchs:any = '';
  public isHiddenSelect:boolean = true; /** xu ly lai voi bien nay (khi focus voi input) */
  public disabledSubmitAddSkill:boolean = true;
  public listSkillFilter:any = [];
  public listMySkill:any = [];/** Danh sach skill cua nguoi dung lay tu db */
  private listSkillChoose: any[] = [];
  private size:any = 0;

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit ():void {}

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
    const selectElement = document.getElementById('skills');
    
    if(selectElement){
      
      if(this.size === 0){
        this.size = 4;
      }else{
        this.size = 0;
      }
    }
    this.isHiddenSelect = !this.isHiddenSelect;
    this.listSkillFilter = this.skills;
    
    selectElement?.setAttribute('size',this.size.toString());
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
    const isValueInlistMySkill = this.listMySkill.filter((item:any) => item.id === id);
    const isValueInlistSkillChoose = this.listSkillChoose.filter((item:any) => item.id === id);
    
    if (isValueInlistSkillChoose.length <=0 && isValueInlistMySkill.length <= 0) {
      this.listSkillChoose.push({
        id: id,
        code: value
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
  addSkillElement(id:any,value:any){
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

      span_selection_remove.addEventListener('click', (event) =>{
        this.removeSkillElement(event);
      });

      skill_item.appendChild(span_selection_remove);
      
      const skill_text = document.createTextNode(value);
      skill_item.appendChild(skill_text);

      const firstChild = span_view_skills.firstChild;
      span_view_skills.insertBefore(skill_item, firstChild);
    }
  }

  // Xóa selecttion
  removeSkillElement(event: MouseEvent){
    const selectedElement = event.target as HTMLElement;
    const parentElement = selectedElement.parentNode as HTMLElement;
    const parentId = parseInt(parentElement.id);
    
    this.listSkillChoose = this.listSkillChoose.filter((item) => item.id !== parentId); // Xóa phần tử skill trong mảng
    this.renderer.removeChild(parentElement.parentNode, parentElement); // Xóa phần tử option
    // Kiem tra listSkillChose rong thi disabled nut cap nhat
    if (this.listSkillChoose.length <= 0) 
      this.disabledSubmitAddSkill = true;
    else
      this.disabledSubmitAddSkill = false;
  }
  
  // Filter input search skills
  searchSkill(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    const selectElement = document.getElementById('skills') as HTMLSelectElement;

    if ($('.search-skill').val() != '')
      this.isHiddenSelect = false;

    this.listSkillFilter = this.skills.filter(item => {
      return JSON.stringify(item.code).toLowerCase().includes(searchTerm);
    });
    
    if (this.listSkillFilter.length == 1)
      selectElement.size = (this.listSkillFilter.length + 1);
    else
      selectElement.size = this.listSkillFilter.length;
  }

  // Create skill in db
  addSkill () {
    this.listSkillChoose.forEach((skill:any) =>{
      this.listMySkill.push(skill);
    });
    this.closeAddSkillModal();
    this.messageSuccess('Cập nhật thành công!'); 
  }

  // Delele skill in db
  deleteSkill(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-md-2",
        cancelButton: "btn btn-danger mx-md-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Bạn sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Xóa thành công!",
          showConfirmButton: false,
          icon: "success",
          timer: 1500
        });
        this.listMySkill = this.listMySkill.filter((item:any) => item.id !== id);
      } 
      /* Read more about handling dismissals below */
      else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
          title: "Đã hủy!",
          showConfirmButton: false,
          icon: "error",
          timer: 1500
        });
      }
    });
  }
  messageSuccess (message:any) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
}


