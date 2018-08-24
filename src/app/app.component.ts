import { MailObject } from './mailobject';
import { Component, OnInit  } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import {
  FormControl, FormGroup, NgForm , Validator, Validators, EmailValidator 
} from '@angular/forms';
import { HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Candidate } from './candidate';
//const API_URL = 'http://localhost:8080';
const API_URL = 'https://booking-api-csoft.appspot.com';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  mailObject: MailObject;
  model = new MailObject();
  msgs: Message[] = [];
  resume: File;
  formData: FormData;
  candidate: Candidate;
  candidateName: FormControl = new FormControl();
  candidateEmail: FormControl = new FormControl();
  candidatePhone: FormControl = new FormControl();
  path: FormControl = new FormControl();
  filename: string;
  email: string;
  phone: string;
  name: string;
  position: string;
  resumeUploadConfirmation: boolean ;
  detailsSubmitted : boolean ;
  applyForm: FormGroup ;
  constructor(private http: HttpClient) {
    this.candidate = new Candidate();
  }
  ngOnInit(): void {
    this.applyForm = new FormGroup({
      'candidateName': new FormControl(this.candidateName , [
        Validators.required,
        Validators.minLength(4)
      ]),
      'candidateEmail': new FormControl(this.candidateEmail, [
        Validators.required,
        Validators.email
       ]),
      'candidatePhone': new FormControl(this.candidatePhone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
    console.log(this.applyForm.errors);
  }
  careerApply() {
    console.log('Printing Candidate Before' + this.candidate) ;
        console.log(this.email);
        this.candidate.name = this.name;
        this.candidate.email = this.email;
        this.candidate.mobile = this.phone;
        this.candidate.position = 'Front End Developer';
        console.log(this.candidate);
        this.http
        .post<any>(API_URL + '/api/file/fileUploadCloud', this.formData)
        .subscribe(response => {
          console.log(response);
          if (response == true) {
            this.resumeUploadConfirmation = true;
          }
        });
      this.http
        .post<any>(API_URL + '/api/email/contact', this.candidate)
        .subscribe(response => {
          if (response == true) {
            this.detailsSubmitted = true;
          }
        });
  }
  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.formData = new FormData();
      this.candidate.filename = file.name;
      this.formData.append('file', file, file.name);
      console.log(this.formData);
    }
  }
  onClose(): void {
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }
}
