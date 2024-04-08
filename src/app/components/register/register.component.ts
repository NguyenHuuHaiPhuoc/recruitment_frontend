import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public username='';
  public password='';
  public account = [
    {
      username:'',
      password:'',
      create_date:'',
      is_del:false
    }
  ];
  public register_applicant() : void{
    console.log(this.account.values);
    
  };

  public register_company() : void{
    console.log("company");
    
  }
}
