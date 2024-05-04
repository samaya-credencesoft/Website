import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Header-Listingdetailsone',
  templateUrl: './Header-Listingdetailsone.component.html',
  styleUrls: ['./Header-Listingdetailsone.component.css']
})
export class HeaderListingdetailsoneComponent implements OnInit {
  showListItems: boolean = false;
  toggleListItems() {
    this.showListItems = !this.showListItems;
  }

  constructor() { }

  ngOnInit() {
  }

}
