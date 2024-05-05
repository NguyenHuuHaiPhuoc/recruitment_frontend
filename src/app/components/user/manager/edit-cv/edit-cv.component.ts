import { Component, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { AngularEditorConfig, AngularEditorModule } from "@kolkov/angular-editor";
import { HttpClientModule} from '@angular/common/http';

declare var $:any;
@Component({
    selector: 'app-edit-cv',
    standalone: true,
    imports: [
        AngularEditorModule,
        HttpClientModule
    ],
    templateUrl: './edit-cv.component.html',
    styleUrl: './edit-cv.component.scss'
})

export class EditCvComponent {
    public image_user:string = '';
    public isStudyNow:boolean = false;
    public isWorking:boolean = false;
    public searchs:string = '';
    public skills = [
        {id:1, code:'Java'},
        {id:2, code:'PHP'},
        {id:3, code:'C#'},
        {id:4, code:'HTML/CSS'},
        {id:5, code:'Python'},
        {id:6, code:'.Net'},
        {id:7, code:'My SQL'},
        {id:8, code:'JavaScript'},
        {id:9, code:'MS SQL Server'},
        {id:10, code:'PostgreSQL'}
      ];
    public listSkillFilter:any = [];
    public listMySkill:any = [];
    public listChooseSkill:any = [];
    public listProject:any = [
        // {
        //     id: 1,
        //     name: 'Website selling Laptop',
        //     use_tech: 'Java Spring Boot, Angular, SQL Server',
        //     completion_time: '2 Tháng',
        //     description: 'Hãy đặt CV này là CV chính & kích hoạt “Đang tìm việc” - Nhà tuyển dụng sẽ tìm thấy hồ sơ của bạn và liên hệ nếu bạn phù hợp.'
        // }
    ];
    public hiddenSelect:boolean = true;
    private size:number = 0;

    configEditor: AngularEditorConfig = {
        editable : true,
        spellcheck : true,
        height : "18rem",
        minHeight : '5rem',
        translate : 'yes',
        defaultParagraphSeparator : 'p',
        defaultFontName : 'Times new Roman'
    };

    constructor (
        private router: Router,
        private renderer: Renderer2
    ){}
    
    backToCV () {
        this.router.navigate(['/u/cv']);
    }

    openChooseImgUser () {
        $('#image-user').trigger('click');
    }

    openSumaryModal () {$('#btn-sumary-modal').trigger('click');}
    studyNow () {this.isStudyNow = !this.isStudyNow}
    working () {this.isWorking = !this.isWorking}

    showSelectSkill () {
        const selectElement = document.getElementById('skills');
        
        if(selectElement){
            if(this.size === 0){
                this.size = 4;
            }else{
                this.size = 0;
            }
        }
        this.listSkillFilter = this.skills;
        this.hiddenSelect = !this.hiddenSelect;
        selectElement?.setAttribute('size',this.size.toString());
    }

    selectOption (id:number, code:string) {
        const itemMySkill = this.listMySkill.filter((item:any) => item.id === id);
        const itemChooseSkill = this.listChooseSkill.filter((item:any) => item.id === id);

        if (itemMySkill.length <= 0 && itemChooseSkill.length <= 0){
            this.listChooseSkill.push(
                {
                    id: id,
                    code: code
                }
            )
            this.addElementSkill(id,code);
            this.showSelectSkill();
            if ($('#search-skill').val() != '') $('#search-skill').val('');
        }
    }

    addElementSkill (id:any,value:any) {
        const span_view_skills = document.getElementById('view-skills');
    
        // create and style <div>
        if(span_view_skills){
        const skill_item = document.createElement('div');
        skill_item.className = 'skill_item';
        skill_item.setAttribute('id',id);
        skill_item.style.padding = '3px';
        skill_item.style.margin = '5px';
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

    removeSkillElement(event: MouseEvent){
        const selectedElement = event.target as HTMLElement;
        const parentElement = selectedElement.parentNode as HTMLElement;
        const parentId = parseInt(parentElement.id);
        
        this.listChooseSkill = this.listChooseSkill.filter((item:any) => item.id !== parentId); // Xóa phần tử skill trong mảng
        this.renderer.removeChild(parentElement.parentNode, parentElement); // Xóa phần tử option
    }

    // Filter input search skills
    searchSkill(event: Event) {
        const searchTerm = (event.target as HTMLInputElement).value;
        const selectElement = document.getElementById('skills') as HTMLSelectElement;

        if ($('#search-skill').val() != '')
            this.hiddenSelect = false;

        this.listSkillFilter = this.skills.filter(item => {
            return JSON.stringify(item.code).toLowerCase().includes(searchTerm);
        });
        
        if (this.listSkillFilter.length == 1)
            selectElement.size = (this.listSkillFilter.length + 1);
        else
            selectElement.size = this.listSkillFilter.length;
    }

    noActive () {
        $('.no-exp').addClass('btn-exp-active');
        $('.have-exp').removeClass('btn-exp-active');

        $('.form-no-exp').removeAttr('hidden');
        $('.form-have-form').attr('hidden','true');
    }
    yesActive () {
        $('.no-exp').removeClass('btn-exp-active');
        $('.have-exp').addClass('btn-exp-active');

        $('.form-have-exp').removeAttr('hidden');
        $('.form-no-exp').attr('hidden','true');
    }

    openAddProject () {
        $('#add-project-modal').trigger('click');
    }
    saveCV () {
        
    }
}
