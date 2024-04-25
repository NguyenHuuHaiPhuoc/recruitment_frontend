import { Component } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-my-exp',
  standalone: true,
  imports: [],
  templateUrl: './my-exp.component.html',
  styleUrl: './my-exp.component.scss'
})
export class MyExpComponent {
  public listMyExp:any = [
    // {
    //   company_name : 'Cong ty TNHH A',
    //   position : 'Java Dev',
    //   start_date : '12/2020',
    //   end_date : null,
    //   skill : [
    //     {
    //       id: 1,
    //       code : 'Java core'
    //     },
    //     {
    //       id : 2,
    //       code : 'Java spring'
    //     }
    //   ],
    //   description : 'Toi thuc hien ...',
    //   project : [
    //     {
    //       name : 'Selling Web Lap top',
    //       start_date : '10/2020',
    //       completion_date : '12/2020',
    //       description : 'Web cos chuc nang ...',
    //       url : 'localhost:4200/easyjob'
    //     }
    //   ]
    // },
    {
      company_name : 'Cong ty TNHH B',
      position : 'PHP Dev',
      start_date : '12/2020',
      end_date : '12/2024',
      skill : [
        {
          id : 3,
          code : 'PHP'
        },
        {
          id : 4,
          code : 'Lavarel'
        }
      ],
      description : 'Toi thuc hien ...',
      project : [
        {
          name : 'Selling Web Lap top',
          start_date : '10/2020',
          completion_date : '12/2020',
          description : 'Prevent long strings of text from breaking your components’ layout by using .text-break to set word-wrap: break-word and word-break: break-word. We use word-wrap instead of the more common overflow-wrap for wider browser support, and add the deprecated word-break: break-word to avoid issues with flex containers.',
          url : 'localhost:4200/easyjob'
        },
        {
          name : 'Selling Web Lap top',
          start_date : '10/2020',
          completion_date : '12/2020',
          description : 'Web cos chuc nang ...',
          url : 'localhost:4200/easyjob'
        }
      ]
    }
  ]
  constructor () {}

  ngOnInit () {}

  openAddProjectModel () {$('#btn-model-add_project').trigger('click');}
}
