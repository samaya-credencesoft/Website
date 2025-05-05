import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CheckoutService } from "paytm-blink-checkout-angular";
// import { CheckoutService } from "paytm-blink-checkout-angular";
import { Subscription } from "rxjs";
import { Booking } from "src/app/model/booking";
import { Payment } from "src/app/model/payment";
import { BusinessUser } from "src/app/model/user";
import { HotelBookingService } from "src/services/hotel-booking.service";
import { TokenStorage } from "src/token.storage";


@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  businessUser: BusinessUser;
  payment: Payment;
  booking: Booking;
  private subs: Subscription;
  paymentLoader: boolean;
  headerTitle: string;
  isSuccess: boolean;
  bodyMessage: string;
  bookingConfirmed: boolean;
  showAlert: boolean;
  alertType: string;
  contentDialog: any;
  DiffDate;
  currency: string;

  constructor(
    private readonly checkoutService: CheckoutService,
    private token: TokenStorage,
    private hotelBookingService: HotelBookingService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) {
    this.businessUser = new BusinessUser();
    this.booking = new Booking();
    this.payment = new Payment();

    this.booking = this.token.getBookingData();
    this.businessUser = this.token.getPropertyData();
    this.payment = this.token.getPaymentData();

    this.currency = this.businessUser.localCurrency;
  }

  ngOnInit(): void {
    if (this.payment.failureMessage !== null) {
    } else {
      this.checkoutService.init(
        //config
        {
          data: {
            orderId: this.payment.referenceNumber,
            amount: this.payment.transactionAmount,
            token: this.payment.token,
            tokenType: "TXN_TOKEN",
          },
          merchant: {
            mid: "sVBwUY63148880604192",
            name: this.businessUser.name,
            logo: this.businessUser.logoUrl,
            redirect: true,
          },

          flow: "DEFAULT",
          handler: {
            notifyMerchant: this.notifyMerchantHandler,
          },

        },
        // {
        //   env: "PROD",
        //   openInPopup: true
        // },
      );

      this.subs = this.checkoutService.checkoutJsInstance$.subscribe(
        (instance) => console.log(instance)
      );
    }
  }
  notifyMerchantHandler = (eventType, data): void => {
    console.log("MERCHANT NOTIFY LOG", eventType, data);
    if (data.body !== undefined) {
      this.payment.failureCode = data?.body?.resultInfo?.resultCode;
      this.payment.failureMessage = data?.body?.resultInfo?.resultMsg;
    }
  };

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();

      this.hotelBookingService.savePayment(this.payment).subscribe((res) => {
        if (res.status === 200) {
          this.paymentLoader = false;
          this.headerTitle = "Success!";
          this.bodyMessage =
            "Thanks for the booking .Please note the Reservation No: # " +
            this.booking.propertyReservationNumber +
            " and an email is sent with the booking details.";
          this.bookingConfirmed = true;

          // this.token.clearHotelBooking();
          this.showSuccess(this.contentDialog);
          if (
            this.booking.mobile !== null &&
            this.booking.mobile !== undefined
          ) {
            setTimeout(() => {
              // this.backClicked();
              // this.router.navigate(['/']);
              // this.sendConfirmationMessage();
              this.changeDetectorRefs.detectChanges();
            }, 1000);
            // this.sendConfirmationMessage();
          }
          setTimeout(() => {
            this.isSuccess = true;
            this.headerTitle = "Success!";
            this.bodyMessage = "Payment Details Saved.";
            this.showSuccess(this.contentDialog);
            this.changeDetectorRefs.detectChanges();
          }, 5000);
        } else {
          this.paymentLoader = false;
          setTimeout(() => {
            // this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage = "Error in updating payment details.";
            this.showDanger(this.contentDialog);
            this.changeDetectorRefs.detectChanges();
          }, 9000);
        }
      });
      setTimeout(() => {
        this.showAlert = false;
        this.changeDetectorRefs.detectChanges();
      }, 9000);
      setTimeout(() => {
        // this.backClicked();
        // this.router.navigate(['/']);
        this.changeDetectorRefs.detectChanges();
      }, 10000);
      this.paymentLoader = false;
    }
  }

  showSuccess(content) {
    this.alertType = "success";
    this.showAlert = true;
  }
  showWarning(content) {
    this.alertType = "warning";
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.changeDetectorRefs.detectChanges();
    }, 3000);
  }
  showDanger(content) {
    this.alertType = "danger";
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.changeDetectorRefs.detectChanges();
    }, 3000);
  }
  onGoHome() {
    this.router.navigate(["/"]);
    // this.locationBack.back();
  }
}
