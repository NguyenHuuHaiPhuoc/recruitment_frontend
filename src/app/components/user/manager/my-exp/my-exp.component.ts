import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

declare var $:any;
@Component({
  selector: 'app-my-exp',
  standalone: true,
  imports: [AngularEditorModule],
  templateUrl: './my-exp.component.html',
  styleUrl: './my-exp.component.scss'
})
export class MyExpComponent {
  public listMyExp:any = [
    {
      company_name : 'Cong ty TNHH A',
      position : 'Java Dev',
      start_date : '12/2020',
      end_date : null,
      skill : [
        {
          id: 1,
          code : 'Java core'
        },
        {
          id : 2,
          code : 'Java spring'
        }
      ],
      description : 'Toi thuc hien ...',
      project : [
        {
          name : 'Selling Web Lap top',
          start_date : '10/2020',
          completion_date : '12/2020',
          description : 'Web cos chuc nang ...',
          url : 'localhost:4200/easyjob',
          type_code : 1,
          type_name : 'Dự án cá nhân'
        }
      ]
    }
    // ,
    // {
    //   company_name : 'Cong ty TNHH B',
    //   position : 'PHP Dev',
    //   start_date : '12/2020',
    //   end_date : '12/2024',
    //   skill : [
    //     {
    //       id : 3,
    //       code : 'PHP'
    //     },
    //     {
    //       id : 4,
    //       code : 'Lavarel'
    //     }
    //   ],
    //   description : 'Toi thuc hien ...',
    //   project : [
    //     {
    //       name : 'Selling Web Lap top',
    //       start_date : '10/2020',
    //       completion_date : '12/2020',
    //       description : 'Prevent long strings of text from breaking your components’ layout by using .text-break to set word-wrap: break-word and word-break: break-word. We use word-wrap instead of the more common overflow-wrap for wider browser support, and add the deprecated word-break: break-word to avoid issues with flex containers.',
    //       url : 'localhost:4200/easyjob'
    //     },
    //     {
    //       name : 'Selling Web Lap top',
    //       start_date : '10/2020',
    //       completion_date : '12/2020',
    //       description : 'Web cos chuc nang ...',
    //       url : 'localhost:4200/easyjob'
    //     }
    //   ]
    // }
  ]
  configEditor: AngularEditorConfig = {
    editable : true,
    spellcheck : true,
    height : "10rem",
    minHeight : '5rem',
    translate : 'yes',
    defaultParagraphSeparator : 'p',
    defaultFontName : 'Times new Roman'
  }
  constructor () {}
  public hiddenFormProject_addExp:boolean = true;
  public hiddenFormProject_editExp:boolean = true;
  ngOnInit () {}

  openAddExptModal () {$('#btn-model-add_exp').trigger('click');}
  
  openFormAddProject () {
    $('#form-project_add').removeAttr('hidden');
    this.hiddenFormProject_addExp = false;
    $('#btn-add-exp').attr('disabled','true');
  }

  closeFormProject_addExp () {
    $('#btn-add-exp').removeAttr('disabled');
    this.hiddenFormProject_addExp = true;
    $('#form-project_add').attr('hidden','true');
  }

  submitFormProject_addExp () {}

  // Modal Edit
  openEditExpModal (value:any) {
    $('#btn-model-edit_exp').trigger('click');
    $('#edit-exp-title').text(value);
    // Thuc hien hien thi exp duoc chon edit
  }
  openFormProject_editExp () {
    $('#form-project_edit').removeAttr('hidden');
    this.hiddenFormProject_editExp = false;
    $('#btn-edit-exp').attr('disabled','true');
  }
  closeFormProject_editExp (){
    $('#btn-edit-exp').removeAttr('disabled');
    this.hiddenFormProject_editExp = true;
    $('#form-project_edit').attr('hidden','true');
  }
  submitFormProject_editExp (){}
  
  submitFormAddExp () {}
  
  deleteExp (id:any) {}
}
