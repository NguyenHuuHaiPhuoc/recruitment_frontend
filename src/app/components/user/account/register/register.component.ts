import { Component, Renderer2, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TestuploadComponent } from '../../../testupload/testupload.component';
import { OptionDetailService } from '../../../../service/option-detail/option-detail-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import Swal from 'sweetalert2';
import { AccountService } from '../../../../service/user/account.service';
import { AuthorityService } from '../../../../service/auth/authority.service';
import { ApplicantService } from '../../../../service/user/applicant.service';
import { CompanyService } from '../../../../service/user/company.service';
import { finalize } from 'rxjs/operators';
import moment from 'moment';

declare var $: any;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TestuploadComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [
    OptionDetailService,
    AccountService,
    AuthorityService,
    ApplicantService,
    CompanyService,
  ]
})
export class RegisterComponent implements OnInit {
  public roles = '';
  public searchs = '';
  public logoReview:string = '/assets/img/logos/logo-company-review.png';
  public showPass: boolean = false;
  showPassConfirm: boolean = false;
  formValid: boolean = false;
  // List skill (danh sách này sẽ được thay khi gọi api)
  public skills = [];
  public skill = '';
  public isHiddenSelect = true;
  public listSkillFilter: any[] = [];
  public skillValid:boolean = true;
  private listSkillChoose: any[] = [];
  private size = 0;
  private logoCompany:any = null;

  public companyForm: FormGroup;
  public applicantForm: FormGroup;
  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router,
    private opDetialService: OptionDetailService,
    private accountService: AccountService,
    private authorityService: AuthorityService,
    private applicantService: ApplicantService,
    private companyService: CompanyService,
    private fireStorage: AngularFireStorage
  ) {
    this.companyForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        full_name: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
            ),
          ],
        ],
        confirmPass: ['', [Validators.required]],
        nameCompany: ['', Validators.required],
        taxCode: ['', [Validators.required]],
        typeBusiness: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
        ],
        website: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$'
            ),
          ],
        ],
        address: ['', Validators.required],
        date: ['', Validators.required],
        logo: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        sumary: ['', Validators.required],
        skill: [''],
        searchs: ['', Validators.required],
      },
      {
        validators: [this.passwordMatchValidator, this.taxCodeValidator],
      }
    );

    this.applicantForm = this.formBuilder.group({
      username: [null],
      password: [null],
      create_date: new Date(),
      is_del: false,
      full_name: [null]
    });
  }

  ngOnInit() {
    this.openPopup();
    this.opDetialService.getOptionDetailTechnologiesUsing().subscribe((resp) => {
      this.skills = resp;
    });
  }

  // kiem tra xac nhan trung khop mat khau
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPass = formGroup.get('confirmPass')?.value;
    return password === confirmPass ? null : { passwordMismatch: true };
  }
  // kiem tra ma so thue
  taxCodeValidator(formGroup: FormGroup) {
    const taxCode = formGroup.get('taxCode')?.value;
    // Kiểm tra xem mã số thuế có 10 chữ số không
    const regex = /^[0-9]{10}$/;
    if (regex.test(taxCode)) {
      return null;
    } else {
      return { taxCodeError: true };
    }
  }


  openPopup() {
    $('#openModal').trigger('click');
  }

  chosseApplicantRole() {
    $('#applicant').trigger('click');
  }

  chosseCompanyRole() {
    $('#company').trigger('click');
  }

  showSelectSkill() {
    const selectElement = document.getElementById('skills');
    if (selectElement) {
      if (this.size === 0) {
        this.size = 4;
      } else {
        this.size = 0;
      }
    }
    this.isHiddenSelect = !this.isHiddenSelect;
    this.listSkillFilter = this.skills;

    selectElement?.setAttribute('size', this.size.toString());
  }

  getOption() {
    // gan gia tri tu form
    this.skill = this.companyForm.get('skill')?.value;
    // var h= this.companyForm.get('skill').value;
    // console.log(h);
    // Kiểm tra khi chọn 1 option 2 lần
    const isValueInlistSkillChoose = this.listSkillChoose.includes(this.skill);
    if (!isValueInlistSkillChoose) {
      this.listSkillChoose.push(this.skill);
      this.addSkillElement();
      this.showSelectSkill();
      if($('.search-skill').val() != '') $('.search-skill').val('');
    }
    this.listSkillValid();
  }

  // Add option được chọn vào danh sách và hiển thị ra giao diện
  addSkillElement() {
    const span_view_skills = document.getElementById('view-skills');
    const lastlistSkillChoose =
      this.listSkillChoose[this.listSkillChoose.length - 1];
    this.skill = this.companyForm.get('skill')?.value;

    // create and style <div>
    if (span_view_skills) {
      const skill_item = document.createElement('div');
      skill_item.className = 'skill_item';
      skill_item.setAttribute('id', this.skill);
      skill_item.style.padding = '3px';
      skill_item.style.marginLeft = '5px';
      skill_item.style.border = '1px solid red';
      skill_item.style.borderRadius = '5px';
      skill_item.style.backgroundColor = 'red';
      skill_item.style.color = '#ffff';

      // create and style <span>
      const span_selection_remove = document.createElement('span');

      span_selection_remove.className = 'selection-remove';
      span_selection_remove.style.marginRight = '7px';
      span_selection_remove.setAttribute('role', 'button');
      span_selection_remove.innerText = 'x';

      span_selection_remove.addEventListener('click', (event) => {
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
  removeSkillElement(event: MouseEvent) {
    const selectedElement = event.target as HTMLElement;
    const parentElement = selectedElement.parentNode as HTMLElement;
    const parentId = parentElement.id;
    this.listSkillChoose = this.listSkillChoose.filter(
      (item) => item !== parentId
    ); // Xóa phần tử skill trong mảng
    this.renderer.removeChild(parentElement.parentNode, parentElement); // Xóa phần tử option
    this.listSkillValid();
  }

  // Filter input search skills
  searchSkill(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    const selectElement = document.getElementById('skills') as HTMLSelectElement;
    
    this.listSkillValid();

    if ($('.search-skill').val() != '') this.isHiddenSelect = false;

    this.listSkillFilter = this.skills.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(searchTerm);
    });
    selectElement.size = this.listSkillFilter.length+1;
  }

  registerRecruiter(event: Event) {
    event.preventDefault();
    if (
      this.companyForm.get('email')?.valid &&
      this.companyForm.get('password')?.valid &&
      this.companyForm.get('confirmPass')?.valid &&
      this.companyForm.get('nameCompany')?.valid &&
      this.companyForm.get('taxCode')?.valid &&
      this.companyForm.get('typeBusiness')?.valid &&
      this.companyForm.get('website')?.valid &&
      this.companyForm.get('address')?.valid &&
      this.companyForm.get('date')?.valid &&
      this.companyForm.get('logo')?.valid &&
      this.companyForm.get('phone')?.valid &&
      this.companyForm.get('skill')?.valid &&
      this.companyForm.get('sumary')?.valid
    ) {
      let mySkill:any = [];
      const skillItem = document.querySelectorAll('.skill_item');
      skillItem.forEach(e => {
        mySkill.push(e.id);
      });

      const account = {
        username: this.companyForm.value.email,
        password: this.companyForm.value.password,
        create_date: new Date(),
        is_del: false,
        full_name: this.companyForm.value.full_name
      }
      try {
        // luu image vaof firebase va tra ve url image
        if (this.logoCompany == null) {
          this.logoCompany = 'logo-company-review.png';
        }

        let filePath = `images/recruiter/${this.logoCompany.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.fireStorage.ref(filePath);
        this.fireStorage.upload(filePath, this.logoCompany).snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe((url)=>{
              let imgUrl = url;
              if(account != null) {
                this.accountService.register(account).subscribe((resp) => {
                  if(resp.result != null){
                    const authorityData = {
                      create_date: new Date(),
                      account: {
                        id: resp.result.id
                      },
                      role: {
                        id: 3
                      }
                    };
                    
                    const company = {
                      name: this.companyForm.value.nameCompany,
                      tax_code: this.companyForm.value.taxCode,
                      image: imgUrl,
                      business_type: this.companyForm.value.typeBusiness,
                      skill: mySkill.join(),
                      headquarter: this.companyForm.value.address,
                      establishment_date: this.companyForm.value.date,
                      sumary: this.companyForm.value.sumary,
                      web_url: this.companyForm.value.website,
                      email: this.companyForm.value.email,
                      phone: this.companyForm.value.phone,
                      create_date: new Date(),
                      account: {
                        id: resp.result.id
                      }
                    };
                    this.authorityService.createAuthority(authorityData).subscribe();
                    this.companyService.createCompany(company).subscribe((resp) => {
                      this.resetCompanyForm();
                      const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: resp.message
                      });
                      this.router.navigateByUrl('/dang-nhap');
                    });
      
                  }
                });
              }
            })
          })
        ).subscribe();
      } catch (error) {
        console.log(error);
      }
    } else {
      this.formValid = true;
    }
  }

  registerApplicant (event: Event) {
    event.preventDefault();
    try {
      this.accountService.register(this.applicantForm.value).subscribe((resp) => {
        let authorityData = {
            create_date: new Date(),
            account: {
              id: resp.result.id
            },
            role: {
              id: 1
            }
          }
        ;
        let applicant = {
            positions: null,
            email: resp.result.username,
            phone: null,
            address: null,
            img: null,
            sumary: null,
            app_view: 0,
            create_date: new Date(),
            update_date: new Date(),
            account: {
              id : resp.result.id
            }
          }
        ;

        this.authorityService.createAuthority(authorityData).subscribe();
        this.applicantService.createApplicant(applicant).subscribe((resp) => {
          this.resetApplicantForm();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: resp.message
          });
          this.router.navigateByUrl('/dang-nhap');
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  listSkillValid () {
    const skillItem = document.querySelectorAll('.skill_item');
    if(skillItem.length > 0)
      this.skillValid = true;
    else 
      this.skillValid = false
  }

  hidePass(showPass: boolean) {
    this.showPass = showPass;
  }
  hidePassConfirm(showPassConfirm: boolean) {
    this.showPassConfirm = showPassConfirm;
  }
  getImage(event: any) {
    const file = event.target.files;
    if(file && file[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.logoReview = e.target.result;
      reader.readAsDataURL(file[0])
      this.logoCompany = file[0];
    }else {
      this.logoReview = '/assets/img/logos/logo-company-review.png';
      this.logoCompany = null;
    }
  }

  private resetApplicantForm():void {
    this.applicantForm.setValue({
      username: [null],
      password: [null],
      create_date: new Date(),
      is_del: false,
      full_name: [null]
    });
  }
  private resetCompanyForm():void {
    this.companyForm.setValue(
      {
      email: [''],
        full_name: [''],
        password: [''],
        confirmPass: [''],
        nameCompany: [''],
        taxCode: [''],
        typeBusiness: [''],
        website: [''],
        address: [''],
        date: [''],
        logo: [''],
        phone: [''],
        sumary: [''],
        skill: [''],
        searchs: ['']
      }
    );
  }
}