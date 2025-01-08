import { Booking } from './../../../model/booking';
import { Component } from '@angular/core';
import { BusinessOfferDto } from 'src/app/model/businessOfferDto';
import { HotelBookingService } from 'src/services/hotel-booking.service';
import { TokenStorage } from 'src/token.storage';

@Component({
  selector: 'app-booking-voucher',
  templateUrl: './booking-voucher.component.html',
  styleUrls: ['./booking-voucher.component.scss']
})
export class BookingVoucherComponent {
propertyDetails: any;
booking:any;
promocodeListChip : any[] = []; // Used for handled to get the promo list and stored in this variable.

savedServices: any;
  currency: any;
  businessOfferDto: BusinessOfferDto;
  showMore:boolean  =false
constructor(private token :TokenStorage,
      private hotelBookingService: HotelBookingService
){
      this.businessOfferDto = new BusinessOfferDto();

  this.propertyDetails = this.token.getProperty();
 this.booking = this.token.getBookingData();
 this.savedServices = this.token.getSelectedServices();
 this.currency = this.propertyDetails.localCurrency.toUpperCase();
 this.getOfferDetails();
}

ngOnInIt(){

}
getOfferDetails() {
  this.hotelBookingService
    .getOfferDetailsBySeoFriendlyName(this.propertyDetails.seoFriendlyName)
    .subscribe((data) => {
      this.businessOfferDto = data.body;
      this.promocodeListChip = this.checkValidCouponOrNot(data.body);

    });
}
// Used For handled to check coupons are valid ot not.
checkValidCouponOrNot(couponList?){
  try{
    const currentDate = new Date();
    const validCoupons = [];
    couponList.forEach((coupon) => {
      if (coupon.startDate && coupon.endDate && coupon.discountPercentage) {
        const startDate = new Date(coupon.startDate);
        const endDate = new Date(coupon.endDate);
        // Check if the current date is within the start and end date
        if (currentDate >= startDate && currentDate <= endDate && coupon.discountPercentage != 100) {
          validCoupons.push(coupon);
        }
      }
    });
    return validCoupons;
  }
  catch(error){
    console.error("Error in checkValidCouponOrNot : ",error);
  }
}
toggleView(): void {
  this.showMore = !this.showMore;
}

}
