import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [SharedAnimations]
})
export class ContactFormComponent implements OnInit {
  private formValues = {
    'email': null,
    'name': null,
    'subject': null,
    'message': null,

  };
 staticAlertClosed: true;
  error = null;
  success: any = null;
  HWmarked = false;
  HWCheckbox = false;

  BEmarked = false;
  BECheckbox = false;

  BMmarked = false;
  BMCheckbox = false;

  CMmarked = false;
  CMCheckbox = false;

  RMmarked = false;
  RMCheckbox = false;

  Amarked = false;
  ACheckbox = false;

  RoomMmarked = false;
  RoomMCheckbox = false;

  BOMAmarked = false;
  BOMACheckbox = false;

  CRMmarked = false;
  CRMCheckbox = false;

  HMAmarked = false;
  HMACheckbox = true;

  OPImarked = false;
  OPICheckbox = false;

  MUmarked = false;
  MUCheckbox = false;



  constructor(private http: HttpClient) {}

  ngOnInit() {}
  toggleVisibilityHW(e){
    this.HWmarked= e.target.checked;
  }
  toggleVisibilityHW(e){
    this.BEmarked= e.target.checked;
  }

  submitForm(form: NgForm) {
    const TO_EMAIL = 'samaya.muduli@credencesoft.co.nz';
    const API_URL = 'https://booking-api-csoft-in.appspot.com';
    // const API_URL = 'http://localhost:8080';

    this.formValues.email = form.value.email;
    this.formValues.toemail = this.TO_EMAIL;
    this.formValues.name = form.value.name;
    this.formValues.subject = form.value.subject;
    this.formValues.message = form.value.message;
    // this.success=true;
    // console.log(this.serviceName);
    // this.email.subject = this.serviceName ;
    // this.email.message = this.message.value ;
   // this.http.post<Email>(API_URL + 'api/website/sendEmailFromWebSite', this.email).
    this.http.post<boolean>(API_URL + '/api/website/sendEmailFromWebSite', this.formValues).
   subscribe(response => {
    this.success = response;
    console.log(response);
   });
  }

}
