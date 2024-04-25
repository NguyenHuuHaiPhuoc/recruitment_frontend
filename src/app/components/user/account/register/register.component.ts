import { Component, Renderer2} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public roles  = '';
  public searchs  = '';
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
  //, private elementRef: ElementRef
  constructor(private renderer: Renderer2) {
    
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
}
