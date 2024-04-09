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
  private check = true;
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
    console.log(this.roles);
  }

  chosseCompanyRole() {
    const raido = document.getElementById('company');
    raido?.click();
    console.log(this.roles);
  }

}
