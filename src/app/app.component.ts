import { MailObject } from './mailobject';
import { Component } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MailService } from './mail.service';

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

  constructor() {
    // this.mailObject = new MailObject();
    
}

  careerApply() {
    
    // this.mailService.sentMail(this.model)
  //   .subscribe(response => 
  //     {
  //     // if (response.status === 201) {
  //     //   this.msgs.push({
  //     //     severity: "success",
  //     //     detail: "ok"
  //     //   });
  //     //   // this.refresh();
  //     // } else {
        
  //     //   this.msgs.push({
  //     //     severity: "error",
  //     //     summary: "failed"
  //     //   });
  //     // }
  //   }
  // );
  }

}




export const API_URL = 'http://localhost:8080';
