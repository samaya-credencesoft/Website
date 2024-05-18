import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TokenStorage } from 'src/token.storage';
import { BusinessUser } from 'src/app/model/user';

@Component({
  selector: 'app-Header-Listingdetailsone',
  templateUrl: './Header-Listingdetailsone.component.html',
  styleUrls: ['./Header-Listingdetailsone.component.css']
})
export class HeaderListingdetailsoneComponent implements OnInit {
  showListItems: boolean = false; // For your existing toggle functionality
  isdone : boolean = false;
  @Input()
  businessUser:any;
  socialmedialist:any;
  showListingDetails: boolean = false;
  website: string;
  logoUrl: string;



  propertyname: string;
  propertydetails:BusinessUser;
  toggleListingDetails() {
    this.showListingDetails = !this.showListingDetails;
    this.isdone = true;
    this.website = this.businessUser.website;
  this.businessUser.socialMediaLinks.forEach(element => {
    this.socialmedialist=element
  });
    this.propertyname = this.businessUser.seoFriendlyName;
    this.logoUrl=this.businessUser.logoUrl;
    console.log(this.logoUrl);
    console.log('new link is',this.website);
    console.log('new link is hello world',this.socialmedialist);
    console.log('new link is',this.propertyname);


  }
  toggleListItems() {
    this.showListItems = !this.showListItems;


  }

  goBack(): void {
    this.location.back();
  }

  closeNavbar(): void {
    this.isdone = false; // Hides the vertical navbar
  }

  constructor(private router: Router,
    private location: Location,
    private token:TokenStorage,
  ) {
    // this.propertydetails = this.token.getProperty();
    // console.log("propertydata="+ JSON.stringify(this.propertydetails))
   }

  ngOnInit() {
    this.website = this.businessUser.website;
    console.log('new link is',this.website);
  }
  navigate(){

  }
}
