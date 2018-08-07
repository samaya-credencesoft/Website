import { MailObject } from './mailobject';
import { Component } from '@angular/core';
import { Message } from 'primeng/components/common/api';
// import { MailService } from './mail.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  mailObject: MailObject;
  model= new MailObject();
  msgs: Message[] = [];

  constructor(private http: Http) { }

  sendEmail() {

    let url = `https://us-central1-csoft-notification-service.cloudfunctions.net/httpEmail`
    let params: URLSearchParams = new URLSearchParams();
    let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    params.set('to', 'samaya.muduli@gmail.com');
    params.set('from', 'you@yoursupercoolapp.com');
    params.set('subject', 'test-email');
    params.set('content', 'Hello World');

    return this.http.post(url, params, headers)
                    .toPromise()
                    .then( res => {
                      console.log(res)
                    })
                    .catch(err => {
                      console.log(err)
                    })

  }

filedata:any;
    fileEvent(event){
        this.filedata=event.target.files[0];
        console.log(event);
    }

  careerApply() {
    
  //   this.mailService.sentMail(this.model)
  //   .subscribe(response => 
  //     {
  //     if (response.status === 201) {
  //       this.msgs.push({
  //         severity: "success",
  //         detail: "ok"
  //       });
  //       // this.refresh();
  //     } else {
        
  //       this.msgs.push({
  //         severity: "error",
  //         summary: "failed"
  //       });
  //     }
  //   }
  // );

  // this.mailService.sentMail(this.model)
  // console.log(this.model);
  }

  // apply() {

  // }

}




export const API_URL = 'http://localhost:8080/mail/send';
