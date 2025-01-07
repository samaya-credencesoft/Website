import { Component } from '@angular/core';
import { TokenStorage } from 'src/token.storage';

@Component({
  selector: 'app-booking-voucher',
  templateUrl: './booking-voucher.component.html',
  styleUrls: ['./booking-voucher.component.scss']
})
export class BookingVoucherComponent {
propertyDetails: any;
constructor(private token :TokenStorage){
  this.propertyDetails = this.token.getProperty();
}

ngOnInIt(){

}
}
