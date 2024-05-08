import { Component, Input, OnInit, Output } from '@angular/core';
import { BusinessUser } from 'src/app/model/user';

@Component({
  selector: 'app-Login-cancel-page',
  templateUrl: './Login-cancel-page.component.html',
  styleUrls: ['./Login-cancel-page.component.css']
})
export class LoginCancelPageComponent implements OnInit {
  // @Output()


  // businessUser : BusinessUser;
  showListingDetails: boolean = false;
  isdone: boolean=false;
  propertyname:string;
  businessUser: any;
 
  toggleListingDetails() {
    this.showListingDetails = !this.showListingDetails;
    this.isdone = true;
    this.propertyname= this.businessUser.propertyname;
    console.log(this.businessUser.propertyname);
    
    
  }
  constructor() { }

  ngOnInit() {
  }

}
