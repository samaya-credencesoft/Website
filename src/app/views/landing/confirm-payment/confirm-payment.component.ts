import { Component } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { HotelBookingService } from 'src/services/hotel-booking.service';
import { TokenStorage } from 'src/token.storage';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent {
  payment:Payment;
  pvsBookingRefId: string;

constructor( private hotelBookingService: HotelBookingService,
 private token:TokenStorage
)
{
  this.payment = this.token.getPaymentData();
  this.pvsBookingRefId = this.token.getPaymentRef()
}
ngOnInit(){
  this.getPaymentInfoByReffId(this.payment.referenceNumber);
}
getPaymentInfoByReffId(referenceNumber){
  this.hotelBookingService.getPaymentByReffId(referenceNumber).subscribe((res) => {
    this.payment = res.body[0];
  this.updatePayment();

    if (this.payment?.failureCode === null && this.payment.status == 'Paid') {
    //   setTimeout(() => {
    //   this.createBookingPayTM();
    // }, 100);
    }else{
      // //Logger.log('create enquiry')
      // this.createEnquiry();
    }
  });
}
updatePayment(){
  this.payment.referenceNumber = this.pvsBookingRefId.toString();
  this.hotelBookingService
            .savePayment(this.payment)
            .subscribe((res) => {
this.payment= res.body;
})



                // setTimeout(() => {
                //   this.isSuccess = true;
                //   this.headerTitle = "Success!";
                //   this.bodyMessage = "Payment Details Saved.";
                //   this.showSuccess(this.contentDialog);
                //   this.changeDetectorRefs.detectChanges();
                // }, 5000);

}
}
