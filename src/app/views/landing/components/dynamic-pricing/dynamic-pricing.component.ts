import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-pricing',
  templateUrl: './dynamic-pricing.component.html',
  styleUrls: ['./dynamic-pricing.component.scss']
})
export class DynamicPricingComponent implements OnInit {

  basePrice = 39.00;
  monthlyPrice: any;
  halfyearlyPrice: any;
  yearlyPrice: any;
  twoYearlyPrice: any;
  checked = true;
  constructor() { }

  ngOnInit() {
    this.viewPrice();
  }

  viewPrice() {
    this.monthlyPrice = this.basePrice;
    this.halfyearlyPrice = this.monthlyPrice;
    this.yearlyPrice = this.monthlyPrice ;
    this.twoYearlyPrice = this.monthlyPrice ;
  }
}
