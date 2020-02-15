import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { CurrencyService } from 'src/app/services/currency.service';


@Component({
  selector: 'app-dynamic-pricing',
  templateUrl: './dynamic-pricing.component.html',
  styleUrls: ['./dynamic-pricing.component.scss'],
  animations: [SharedAnimations]
})
export class DynamicPricingComponent implements OnInit {
  currency = '$';
  country = 'USD';
  propertySize = 2;
  noOfRoom = 1;
  rates= [];
 symbol = '$';
  cRate= 1;


  HWChecked = false;
  BEChecked = true;
  BMChecked = false;
  CMChecked = false;
  RevenueMChecked = false;
  AnalyticsChecked = false;
  RoomMChecked = false;
  MAChecked = false;
  CRMChecked = false;
  MUChecked = false;
  OPIChecked = false;
  HMAChecked = false;

  subscriptionCount = 1;
  discountAmount = 0;

  quarterlyDiscount = 2;
  halfYearlyDiscount = 5;
  yearlyDiscount = 10;
  twoYearDiscount = 15;


  HWPrice = 4;
  BEPrice = 4;
  BMPrice = 0;
  CMPrice = 10;
  RevenueMPrice = 4;
  AnalyticsPrice = 4;
  RoomMPrice = 0;
  MAPrice = 0.2;
  CRMPrice = 4;
  MUPrice = 0;
  OPIPrice = 0;
  HMAPrice = 4;

  // tslint:disable-next-line: max-line-length
 basePrice =  4 ;



  monthlyPrice: any;
  halfyearlyPrice: any;
  yearlyPrice: any;
  twoYearlyPrice: any;
  checked = true;
  Currency:  any;
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.viewPrice();
// this.setCurrencyRate();
  }
setCurrencyRate() {
    this.currencyService.getCurrencyRate()
      .subscribe(response => { 
        this.Currency = response.body;
      console.log('currency : ' + JSON.stringify( response.body.quotes ));
      this.rates = this.Currency.quotes;
    });
    console.log('data ' + JSON.stringify(this.rates));
  }

HWcheck() {
  if (this.HWChecked !== false) {
    this.HWChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.HWPrice;
  } else {
    this.HWChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.HWPrice;
  }
  this.viewPrice();
}
BEcheck() {
  if (this.BEChecked !== false) {
    this.BEChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.BEPrice;
  } else {
    this.BEChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.BEPrice;
  }
  this.viewPrice();
}
BMcheck() {
  if (this.BMChecked !== false) {
    this.BMChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.BMPrice;
  } else {
    this.BMChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.BMPrice;
  }
  this.viewPrice();
}
CMcheck() {
  if (this.CMChecked !== false) {
    this.CMChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.CMPrice;
  } else {
    this.CMChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.CMPrice;
  }
  this.viewPrice();
}
RevenueMcheck() {
  if (this.RevenueMChecked !== false) {
    this.RevenueMChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.RevenueMPrice;
  } else {
    this.RevenueMChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.RevenueMPrice;
  }
  this.viewPrice();
}
Analyticscheck() {
  if (this.AnalyticsChecked !== false) {
    this.AnalyticsChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.AnalyticsPrice;
  } else {
    this.AnalyticsChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.AnalyticsPrice;
  }
  this.viewPrice();
}
RoomMcheck() {
  if (this.RoomMChecked !== false) {
    this.RoomMChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.RoomMPrice;
  } else {
    this.RoomMChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.RoomMPrice;
  }
  this.viewPrice();
}
MAcheck() {
  if (this.MAChecked !== false) {
    this.MAChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.MAPrice;
  } else {
    this.MAChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.MAPrice;
  }
  this.viewPrice();
}
CRMcheck() {
  if (this.CRMChecked !== false) {
    this.CRMChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.CRMPrice;
  } else {
    this.CRMChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.CRMPrice;
  }
  this.viewPrice();
}
MUcheck() {
  if (this.MUChecked !== false) {
    this.MUChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.MUPrice;
  } else {
    this.MUChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.MUPrice;
  }
  this.viewPrice();
}
OPIcheck() {
  if (this.OPIChecked !== false) {
    this.OPIChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.OPIPrice;
  } else {
    this.OPIChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.OPIPrice;
  }
  this.viewPrice();
}
HMAcheck() {
  if (this.HMAChecked !== false) {
    this.HMAChecked = false;
    this.subscriptionCount--;
    this.basePrice = this.basePrice - this.HMAPrice;
  } else {
    this.HMAChecked = true;
    this.subscriptionCount++;
    this.basePrice = this.basePrice + this.HMAPrice;
  }
  this.viewPrice();
}
onCountryChange() {
  // this.monthlyPrice =  Number(this.basePrice) *  Number(this.country);
  // this.viewPrice();
   if (this.country== 'BD') { 
     this.symbol ='৳';
     this.cRate = 84.47;
    }else if(this.country== 'IN') {
      this.symbol ='₹';
      this.cRate = 71.44;
    } else if(this.country== 'US'){
      this.symbol = '$';
      this.cRate = 1;
    }else if(this.country== 'AU'){
      this.symbol = '$';
      this.cRate = 1.49;
    }else if(this.country== 'EU'){
      this.symbol = '€'
      this.cRate = 0.92;
    }else if(this.country== 'UK'){
      this.symbol = '£';
      this.cRate = 0.76;
    }else if(this.country== 'NZ'){
      this.symbol = '$';
      this.cRate = 1.55;
    }else if(this.country== 'CA'){
      this.symbol = '$';
      this.cRate = 1.33;
    };
}
onPropertyChange() {
  this.discountAmount = Number(this.propertySize) + Number(this.subscriptionCount);
}
onRoomChange() {
  // this.basePrice = this.basePrice * this.noOfRoom;
}

  viewPrice() {
    this.discountAmount = Number(this.propertySize) + Number(this.subscriptionCount);
    this.monthlyPrice =  this.basePrice ;
    this.halfyearlyPrice = this.monthlyPrice * 6;
    this.yearlyPrice = this.monthlyPrice * 12 ;
    this.twoYearlyPrice = this.monthlyPrice * 24;
    console.log('discount ' + this.discountAmount + ' s ' + this.subscriptionCount + ' room ' + this.noOfRoom + ' p ' + this.propertySize);
  }
}
