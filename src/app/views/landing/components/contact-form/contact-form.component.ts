import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
export interface Email {

  fromEmail: string;
  toEmail: string;
  subject: string;
  message: string;

}
export interface ServiceList {
  fromEmail: string;
  toEmail: string;
  subject: string;
  message: string;

}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [SharedAnimations]
})
export class ContactFormComponent implements OnInit {
  serviceType = [
    {name: 'BookOne Support', value: 'BookOne Support '},
    {name: 'BookOne Demo Request', value: 'BookOne Demo Request '},
    {name: 'Integration Service', value: 'Integration Service '},
    {name: 'Product Development', value: 'Product Development '},
    {name: 'Others', value: 'Others '},
  ];
 subscriptionType = [
    {name: 'Hotel Website', value: 'Hotel Website'},
    {name: 'Booking Engine', value: 'Booking Engine'},
    {name: 'Booking Management', value: 'Booking Management'},
    {name: 'Channel Management', value: 'Channel Management'},
    {name: 'Revenue Management', value: 'Resvenue Management'},
    {name: 'Analytics', value: 'Analytics'},
    {name: 'Room Management', value: 'Room Management'},
    {name: 'Bookone Mobile App', value: 'Bookone Mobile App'},
    {name: 'CRM', value: 'CRM'},
    {name: 'Multi User Setup', value: 'Multi User Setup'},
    {name: 'Online Payment Integration', value: 'Online Payment Integration'},
    {name: 'Hotel Mobile App', value: 'Hotel Mobile App'},
  ];

 staticAlertClosed: true;
  error = null;
  success: any = null;
  // HWmarked = false;
  // HWCheckbox = false;

  // BEmarked = false;
  // BECheckbox = false;

  // BMmarked = false;
  // BMCheckbox = false;

  // CMmarked = false;
  // CMCheckbox = false;

  // RMmarked = false;
  // RMCheckbox = false;

  // Amarked = false;
  // ACheckbox = false;

  // RoomMmarked = false;
  // RoomMCheckbox = false;

  // BOMAmarked = false;
  // BOMACheckbox = false;

  // CRMmarked = false;
  // CRMCheckbox = false;

  // HMAmarked = false;
  // HMACheckbox = true;

  // OPImarked = false;
  // OPICheckbox = false;

  // MUmarked = false;
  // MUCheckbox = false;

  constructor(private http: HttpClient) { }
  subject: FormControl = new FormControl();
  // name: FormControl = new FormControl();
  fromEmail: FormControl = new FormControl();
  toEmail: FormControl = new FormControl();
  message: FormControl = new FormControl();
  serviceName: string ;
  subscriptions: string ;
  name: string;
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
      subject: '',
      message: ''
    };

  }

  submitForm(form: NgForm) {
    const TO_EMAIL = 'samaya.muduli@credencesoft.co.nz';
    // const TO_EMAIL = 'abir.sayeed@gmail.com';
    const API_URL = 'https://booking-api-csoft.appspot.com/';
    // const API_URL = 'http://localhost:8080';

    this.email.fromEmail = form.value.email;
    this.email.toEmail = TO_EMAIL;
    this.name = form.value.name;
    // this.email.subject = form.value.subject;
    this.serviceName = '' + this.subscriptions;
    // tslint:disable-next-line: max-line-length
    this.email.message = 'Name: ' + this.name + '\nEmail: ' + form.value.email + ' \nSelected Subscriptions: ' + this.serviceName + ' \nMessage: ' + form.value.message + '. \n*****this message is sent from BookOnePMS Website.******';

    console.log(this.subscriptions + ' ' + this.name);
    this.email.subject = '' + this.subject ;
    console.log('form data ' + JSON.stringify(this.email));
    //  this.success = true;
   this.http.post<Email>(API_URL + 'api/website/sendEmailFromWebSite', this.email ).
   subscribe(response => {
    this.success = response;
    console.log(response);
   });
  }

}
