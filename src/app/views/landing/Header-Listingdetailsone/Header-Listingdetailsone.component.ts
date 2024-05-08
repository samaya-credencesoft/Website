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
  toggleListingDetails() {
    this.showListingDetails = !this.showListingDetails;
    this.isdone = true;
  }
  toggleListItems() {
    this.showListItems = !this.showListItems;
  }

  closeNavbar(): void {
    this.isdone = false; // Hides the vertical navbar
  }

  constructor() { }

  ngOnInit() {
  }
}
