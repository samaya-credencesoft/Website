import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Header-Listingdetailsone',
  templateUrl: './Header-Listingdetailsone.component.html',
  styleUrls: ['./Header-Listingdetailsone.component.css']
})
export class HeaderListingdetailsoneComponent implements OnInit {
  showListItems: boolean = false; // For your existing toggle functionality
  isOpened = true; // Initially open (for the vertical navbar)

  toggleListItems() {
    this.showListItems = !this.showListItems;
  }

  closeNavbar(): void {
    this.isOpened = false; // Hides the vertical navbar
  }

  constructor() { }

  ngOnInit() {
  }
}
