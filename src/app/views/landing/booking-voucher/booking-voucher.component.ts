import { Booking } from './../../../model/booking';
import { Component } from '@angular/core';
import { TokenStorage } from 'src/token.storage';

@Component({
  selector: 'app-booking-voucher',
  templateUrl: './booking-voucher.component.html',
  styleUrls: ['./booking-voucher.component.scss']
})
export class BookingVoucherComponent {
propertyDetails: any;
booking:any;
savedServices: any;
  currency: any;

constructor(private token :TokenStorage){
  this.propertyDetails = this.token.getProperty();
 this.booking = this.token.getBookingData();
 this.savedServices = this.token.getSelectedServices();
 this.currency = this.propertyDetails.localCurrency.toUpperCase();
}

ngOnInIt(){

}

}
