import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
export interface Email {
  fromEmail: string;
  toEmail: string;
  message: string;
  subject: string;

}
export interface ServiceList {
  fromEmail: string;
  toEmail: string;
  message: string;
  subject: string;

}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [SharedAnimations]
})

export class ContactFormComponent implements OnInit {
  serviceType = [
    {name: 'BookOne Support', value: 'BookOne Support'},
    {name: 'Website Development', value: 'Website Development'},
    {name: 'Integration Service', value: 'Integration Service'},
    {name: 'Product Development', value: 'Product Development'},
    {name: 'Others', value: 'Others'},
  ];

  private formValues = {
    'email': null,
    'name': null,
    'subject': null,
    'message': null,

  };

 staticAlertClosed: true;
  error = null;
  success: any = null;

  constructor(private http: HttpClient) { }
  
  subject: FormControl = new FormControl();
  name: FormControl = new FormControl();
  fromEmail: FormControl = new FormControl();
  toEmail: FormControl = new FormControl();
  message: FormControl = new FormControl();
  serviceName: string ;
  email: Email ;
  emailSuccess: Boolean ;
  form = new FormGroup({
    subject: new FormControl(),
    name: new FormControl(),
    fromEmail: new FormControl(),
    message:  new FormControl()
  });
  ngOnInit() {
    this.email = {
      fromEmail: '',
      toEmail: '',
      message: '',
      subject: ''
    };
  }


  send() {
    const TO_EMAIL = 'samaya.muduli@credencesoft.co.nz';
    const API_URL = 'https://booking-api-csoft-in.appspot.com';

    // const API_URL = 'http://localhost:8080';

    this.email.fromEmail = this.fromEmail.value ;
    this.email.toEmail = TO_EMAIL ;
    console.log(this.serviceName);
    this.email.subject = this.serviceName ;
    this.email.message = this.message.value ;

   // this.http.post<Email>(API_URL + 'api/website/sendEmailFromWebSite', this.email).

    this.http.post<boolean>(API_URL + '/api/website/sendEmailFromWebSite', this.email).
   subscribe(response => {
    this.emailSuccess = response;
    console.log(response);
    this.email = {
      fromEmail: '',
      toEmail: '',
      message: '',
      subject: ''
    };
   });
  }

  submitForm(form: NgForm) {
    this.formValues.email = form.value.email;
    this.formValues.name = form.value.name;
    this.formValues.subject = form.value.subject;
    this.formValues.message = form.value.message;
    this.success = true;



  }

}
