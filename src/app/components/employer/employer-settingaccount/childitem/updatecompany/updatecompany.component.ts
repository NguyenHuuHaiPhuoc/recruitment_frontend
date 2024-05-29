import { Component } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-updatecompany',
  standalone: true,
  imports: [CKEditorModule, ],
  templateUrl: './updatecompany.component.html',
  styleUrl: './updatecompany.component.scss'
})
export class UpdatecompanyComponent {
  public Editor = ClassicEditor

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

}
