import { Component, Input, OnInit } from '@angular/core';

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
  showListingDetails: boolean = false;
  website: string;
  logoUrl: string;
  
  
  propertyname: string;
  toggleListingDetails() {
    this.showListingDetails = !this.showListingDetails;
    this.isdone = true;
    this.website = this.businessUser.website;
  
    this.propertyname = this.businessUser.seoFriendlyName;
    this.logoUrl=this.businessUser.logoUrl;
    console.log(this.logoUrl);
    console.log('new link is',this.website);
    console.log('new link is',this.propertyname);
    
   
  }
  toggleListItems() {
    this.showListItems = !this.showListItems;
  

  }

  closeNavbar(): void {
    this.isdone = false; // Hides the vertical navbar
  }

  constructor() { }

  ngOnInit() {
    this.website = this.businessUser.website;
    console.log('new link is',this.website);
  }
  navigate(){
   
  }
}
