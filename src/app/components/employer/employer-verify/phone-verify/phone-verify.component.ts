import { Component } from '@angular/core';
import { SmsService } from '../../../../service/sms/sms.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-verify',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './phone-verify.component.html',
  styleUrl: './phone-verify.component.scss',
  providers: [
    SmsService
  ]
})

export class PhoneVerifyComponent {

  public verifyOTP = false;
  public second = 0;
  private intervalId: any;
  private statusOTP = true;

  public formPhoneVerify: FormGroup;

  constructor (
    private smsService: SmsService,
    private fb: FormBuilder,
  ){
    this.formPhoneVerify = this.fb.group({
      phone: [null, [Validators.required]]
    });
  }

  public sendSMS () {
    this.verifyOTP = true;
    this.second = 60;

    this.intervalId = setInterval(() => {
      if (this.second > 0) {
        this.second--;
      } else {
        this.statusOTP = false;
        clearInterval(this.intervalId);
      }
    }, 1000);

    // Send OTP to phone number here
  }

  public back(){
    this.verifyOTP = false;
  }

  public confirmOTP (){
    if (this.statusOTP == false){
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Mã OTP đã hết hiệu lực",
        text:"Vui lòng nhấn 'Gửi lại mã' để nhận mã OTP mới!",
        showConfirmButton: true,
        confirmButtonText: 'OK'
      });
    } else {

    }
  }

  public focusNextInput (event: any) {
    let searchValue = (event.target as HTMLInputElement).value;
    const input = document.querySelectorAll('.otp-input');

    input.forEach(i => {
      i.addEventListener('click', () =>{
        console.log(i);
        console.log(searchValue);
      });
    });
  }
}
