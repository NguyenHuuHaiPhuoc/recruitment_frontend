import { Component, Renderer2, ElementRef, input} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder ,ValidatorFn ,ValidationErrors } from '@angular/forms';
import { Company } from './Company';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TestuploadComponent } from '../../../testupload/testupload.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,
            ReactiveFormsModule,
            CommonModule,
            TestuploadComponent
            ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public roles  = '';
  public searchs  = '';
  showPass:boolean=false;
  showPassConfirm:boolean=false;
  formValid:boolean= false;
  imageFile: any;
  // List skill (danh sách này sẽ được thay khi gọi api)
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
  public skill = '';
  public isHiddenSelect = true;
  public listSkillFilter:any[] = [];
  private listSkillChoose: any[] = [];
  private size = 0;

  userForm :FormGroup;
   constructor(private renderer: Renderer2, private elementRef: ElementRef,private formBuilder: FormBuilder,private router:Router) {
      this.userForm = this.formBuilder.group({
        email:['',
                  [Validators.required,Validators.email]],
                  
        password:['',
                    [
                     Validators.required,
                     Validators.minLength(8),
                     Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/)
                    ],                 
],
        confirmPass:['',
        [
          Validators.required
        ]
],
        nameCompany:['',Validators.required],
        taxCode:['',
                    [Validators.required]],
        typeBusiness:['',
                        [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
        website:['',[Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]],
        address:['',Validators.required],
        date:['',Validators.required],
        logo:['',Validators.required],
        phone:['',
                  [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
        sumary:['',Validators.required],
        skill:['',Validators.required],
        searchs:['',Validators.required],
      },{
      validators: [this.passwordMatchValidator,this.taxCodeValidator]
    });
  }

    // kiem tra xac nhan trung khop mat khau
    passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPass = formGroup.get('confirmPass')?.value;
    return password === confirmPass ? null : { passwordMismatch: true };
  }
    // kiem tra ma so thue 
    taxCodeValidator(formGroup : FormGroup){
      const taxCode = formGroup.get('taxCode')?.value;
      // Kiểm tra xem mã số thuế có 10 chữ số không
      const regex = /^[0-9]{10}$/;
      console.log(taxCode);
      if(regex.test(taxCode)){
        console.log("hoiisdf");
        return null;
      }else{
        return {taxCodeError :true};
      }
    }
   
  ngOnInit() {
    this.openPopup();
  
  }

  openPopup() {
    const btn = document.getElementById('openModal');
    btn?.click();
  }

  chosseApplicantRole() {
    const raido = document.getElementById('applicant');
    raido?.click();
  }

  chosseCompanyRole() {
    const raido = document.getElementById('company');
    raido?.click();
  }
  
  showSelectSkill(setSize: HTMLSelectElement) {
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

  getOption(setSize: HTMLSelectElement){
    // gan gia tri tu form
      this.skill =  this.userForm.get('skill')?.value;
      this.searchs = this.userForm.get('searchs')?.value;
    // var h= this.userForm.get('skill').value;
    // console.log(h);
    // Kiểm tra khi chọn 1 option 2 lần
    const isValueInlistSkillChoose = this.listSkillChoose.includes(this.skill);
    if (!isValueInlistSkillChoose) {
      this.listSkillChoose.push(this.skill);
      this.addSkillElement();
      this.showSelectSkill(setSize);
      if(this.searchs != '') this.searchs = '';
    }
  }

  // Add option được chọn vào danh sách và hiển thị ra giao diện
  addSkillElement(){
    const span_view_skills = document.getElementById('view-skills');
    const lastlistSkillChoose = this.listSkillChoose[this.listSkillChoose.length - 1];
    this.skill =  this.userForm.get('skill')?.value;

    // create and style <div>
    if(span_view_skills){
      const skill_item = document.createElement('div');
      skill_item.className = 'skill_item';
      skill_item.setAttribute('id',this.skill);
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
      
      const skill_text = document.createTextNode(lastlistSkillChoose);
      skill_item.appendChild(skill_text);

      const firstChild = span_view_skills.firstChild;
      span_view_skills.insertBefore(skill_item, firstChild);
    }
  }

  // Xóa selecttion
  removeSkillElement(event: MouseEvent){
    const selectedElement = event.target as HTMLElement;
    const parentElement = selectedElement.parentNode as HTMLElement;
    const parentId = parentElement.id;
    this.listSkillChoose = this.listSkillChoose.filter(item => item !== parentId); // Xóa phần tử skill trong mảng
    this.renderer.removeChild(parentElement.parentNode, parentElement); // Xóa phần tử option 
    // console.log(this.listSkillChoose);
  }

  // Filter input search skills
  searchSkill(event: Event) {
    
    const searchTerm = (event.target as HTMLInputElement).value;
    const selectElement = document.getElementById('skills') as HTMLSelectElement;
    this.listSkillFilter = this.skills.filter(item => {
      return JSON.stringify(item).toLowerCase().includes(searchTerm);
    });
    selectElement.size = this.listSkillFilter.length;
  }
  register(){
    console.log(this.userForm.value);
     if(this.userForm.get('email')?.valid 
   &&
    this.userForm.get('password')?.valid
   &&
   this.userForm.get('confirmPass')?.valid
   && 
   this.userForm.get('nameCompany')?.valid
   &&
   this.userForm.get('taxCode')?.valid
   && 
   this.userForm.get('typeBusiness')?.valid
   &&
   this.userForm.get('website')?.valid
   &&
   this.userForm.get('address')?.valid
   &&
   this.userForm.get('date')?.valid
   &&
   this.userForm.get('logo')?.valid
   &&
   this.userForm.get('phone')?.valid
   && 
   (this.userForm.get('skill')?.valid )
   && 
   this.userForm.get('sumary')?.valid
    ){
    const obj = new Company
    (
    this.userForm.get('email')?.value,
    this.userForm.get('password')?.value,
    this.userForm.get('confirmPass')?.value,
    this.userForm.get('nameCompany')?.value,
    this.userForm.get('taxCode')?.value,
    this.userForm.get('typeBusiness')?.value,
    this.userForm.get('website')?.value,
    this.userForm.get('address')?.value,
    this.userForm.get('date')?.value,
    this.imageFile,
    this.userForm.get('phone')?.value,
    this.listSkillChoose,
    this.userForm.get('sumary')?.value,
    );
    console.log(obj);
    // sau nay se gui doi tuong nay qua backend lưu xuống database
    this.router.navigateByUrl('/dang-nhap');
    
   }else{
    this.formValid = true;
   }
  }

  hidePass(showPass:boolean){
    this.showPass=showPass;
  }
  hidePassConfirm(showPassConfirm:boolean){
    this.showPassConfirm=showPassConfirm;
  }
  getImage(event:any){
   this.imageFile = event.target.files[0];
    console.log(this.imageFile);
  }
   
}
