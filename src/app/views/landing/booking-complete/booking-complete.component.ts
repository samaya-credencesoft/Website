import { HttpClient } from '@angular/common/http';
// import { TokenStorage } from './../../token.storage';
import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { Payment } from 'src/app/model/payment';
import { BusinessUser } from 'src/app/model/user';
// import { console } from 'src/app/services/console.service';
// import { HotelBookingService } from 'src/app/services/hotel-booking.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Location, DatePipe, formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
// import { EnquiryForm } from '../Enquiry/Enquiry.component';
import { API_URL_NZ, API_URL_IN } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { TokenStorage } from 'src/token.storage';
import { HotelBookingService } from 'src/services/hotel-booking.service';
import { EnquiryForm } from '../onboarding-roomdetails-form/onboarding-roomdetails-form.component';

@Component({
  selector: 'app-booking-complete',
  templateUrl: './booking-complete.component.html',
  styleUrls: ['./booking-complete.component.scss'],
})
export class BookingCompleteComponent implements OnInit {
  businessUser: BusinessUser;
  booking: Booking;
  payment: Payment;
  paymentLoader: boolean;
  bookingData: any;
  isSuccess: boolean;
  headerTitle: string;
  bodyMessage: string;
  showAlert: boolean = false;
  alertType: string;
  bookingConfirmed = false;
  fromDate: any;
  toDate: any;
  adults: number;
  children: number;
  children3to5: number;
  noOfrooms: number;
  currency: string;
  payment2: Payment;
  totalExtraAmount: number = 0;
  totalTaxAmount: number = 0;
  totalBeforeTaxAmount: number = 0;
  addServiceList: any[];
  enquiryForm: any;
  enquiryResponse: EnquiryForm;
  successMessage: boolean;
  API_URL: string;
  enquirySent: boolean = false;
  submitButtonDisable: boolean;

  constructor(
    private http: HttpClient,
    private token: TokenStorage,
    private acRoute: ActivatedRoute,
    private hotelBookingService: HotelBookingService,
    private ngZone: NgZone,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.businessUser = new BusinessUser();
    this.booking = new Booking();
    this.payment = new Payment();

    if (this.token.getPropertyData() != null && this.token.getPropertyData() != undefined)
    {
      this.businessUser = this.token.getPropertyData();
    }

    if (this.token.getBookingData() != null && this.token.getBookingData() != undefined)
    {
      this.booking = this.token.getBookingData();
    }

    if (this.token.getPaymentData() != null && this.token.getPaymentData() != undefined)
    {
      this.payment = this.token.getPaymentData();
    }

    if (this.token.getPayment2Data() != null && this.token.getPayment2Data() != undefined)
    {
      this.payment2 = this.token.getPayment2Data();
    }


    this.addServiceList = [];
    if (this.token.getServiceData() !== null) {
      this.addServiceList = this.token.getServiceData();
    }
    if (this.token.getBookingData() !== null) {
      this.bookingData = this.token.getBookingData();
      this.booking = this.bookingData;
      this.fromDate = new NgbDate(
        this.mileSecondToNGBDate(this.booking.fromDate).year,
        this.mileSecondToNGBDate(this.booking.fromDate).month,
        this.mileSecondToNGBDate(this.booking.fromDate).day
      );
      this.toDate = new NgbDate(
        this.mileSecondToNGBDate(this.booking.toDate).year,
        this.mileSecondToNGBDate(this.booking.toDate).month,
        this.mileSecondToNGBDate(this.booking.toDate).day
      );
      this.adults = this.booking.noOfPersons;
      this.children = this.booking.noOfChildren;
      // this.children3to5 = this.booking.noOfChildren3To5yrs;
      this.noOfrooms = this.booking.noOfRooms;
    }
  }

  ngOnInit() {

    this.acRoute.queryParams.subscribe((params) => {
      if (params["businessUser"] !== undefined) {
        this.businessUser = JSON.parse(params["businessUser"]);
      }

      if (params["payment"] !== undefined) {
        this.payment = JSON.parse(params["payment"]);
      }

      if (params["payment2"] !== undefined) {
        this.payment2 = JSON.parse(params["payment2"]);
      }

      if (params["addServiceList"] !== undefined) {
        this.addServiceList = [];
        this.payment2 = JSON.parse(params["addServiceList"]);
      }

      if (params["booking"] !== undefined) {
        this.booking = JSON.parse(params["booking"]);

        this.bookingData = this.booking;
        this.fromDate = new NgbDate(
          this.mileSecondToNGBDate(this.booking.fromDate).year,
          this.mileSecondToNGBDate(this.booking.fromDate).month,
          this.mileSecondToNGBDate(this.booking.fromDate).day
        );
        this.toDate = new NgbDate(
          this.mileSecondToNGBDate(this.booking.toDate).year,
          this.mileSecondToNGBDate(this.booking.toDate).month,
          this.mileSecondToNGBDate(this.booking.toDate).day
        );
        this.adults = this.booking.noOfPersons;
        this.children = this.booking.noOfChildren;
        // this.children3to5 = this.booking.noOfChildren3To5yrs;
        this.noOfrooms = this.booking.noOfRooms;
      }

    });


    this.totalExtraAmount = 0;
    this.totalBeforeTaxAmount = 0;
    this.totalTaxAmount = 0;
    this.addServiceList.forEach((element) => {
      this.totalExtraAmount = this.totalExtraAmount + element.afterTaxAmount;
      this.totalTaxAmount = this.totalTaxAmount + element.taxAmount;
      this.totalBeforeTaxAmount =
        this.totalBeforeTaxAmount + element.beforeTaxAmount;
    });
    this.getPaymentInfoByReffId(this.payment.referenceNumber);

    if (this.booking.id !== undefined) {
      this.bookingConfirmed = true;
    }
    this.currency = 'INR';
  }
  getPaymentInfoByReffId(referenceNumber){
    this.hotelBookingService.getPaymentByReffId(referenceNumber).subscribe((res) => {
      this.payment = res.body[0];
      if (this.payment.failureCode === null && this.payment.status == 'Paid') {
        this.createBookingPayTM();
      }else{
        console.log('create enquiry')
        this.createEnquiry();
      }
    });
  }
  mileSecondToNGBDate(date: string) {
    const dsd = new Date(date);
    const year = dsd.getFullYear();
    const day = dsd.getDate();
    const month = dsd.getMonth() + 1;
    return { year: year, month: month, day: day };
  }
  addServiceToBooking(booking) {
    if (this.addServiceList.length > 0) {
      this.hotelBookingService
        .addServicesToBooking(this.addServiceList, booking.id)
        .subscribe((serviceRes) => {
          console.log('before Payment: ', JSON.stringify(this.payment));

          console.log('addServiceList ', JSON.stringify(serviceRes.body));
          this.payment2 = this.payment;
          this.payment2.id = undefined;
          this.payment2.paymentMode = 'UPI';
          this.payment2.status = 'NotPaid';
          this.payment2.propertyId = this.bookingData.propertyId;
          this.payment2.email = this.booking.email;
          this.payment2.businessEmail = this.businessUser.email;
          this.payment2.currency = this.businessUser.localCurrency;
          this.payment2.transactionAmount = Number((this.totalExtraAmount ).toFixed(2));
          this.payment2.netReceivableAmount = Number((this.totalBeforeTaxAmount ).toFixed(2));
          this.payment2.transactionAmount = Number((this.totalExtraAmount ).toFixed(2));
          this.payment2.amount = Number((this.totalExtraAmount ).toFixed(2));
          this.payment2.transactionChargeAmount = Number((this.totalExtraAmount ).toFixed(2));
          this.payment2.deliveryChargeAmount = 0;
          this.payment2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.payment2.taxAmount = this.totalTaxAmount ;
          this.payment2.businessServiceName = 'Restaurants';
          this.hotelBookingService
            .processPayment(this.payment2)
            .subscribe((res) => {
              console.log('Extra Payment: ', JSON.stringify(res.body));
            });
        });
    }
  }
  createBookingPayTM() {
    this.booking.modeOfPayment = this.payment.paymentMode;
    this.booking.externalSite = 'The Hotel Mate';
    this.booking.businessName = this.businessUser.name;
    this.booking.businessEmail = this.businessUser.email;
    this.booking.roomBooking = true;
    this.booking.bookingAmount = this.booking.totalAmount;
    this.booking.groupBooking = false;
    this.booking.available = true;
    this.booking.payableAmount = this.booking.totalAmount;
    this.booking.currency = this.businessUser.localCurrency;
    this.booking.paymentId = this.payment.id;

    console.log('createBooking ', JSON.stringify(this.booking));

    this.paymentLoader = true;
    this.hotelBookingService
      .createBooking(this.booking)
      .subscribe((response) => {
        //  console.log('createBooking ', JSON.stringify(response.body));
        if (response.status === 200) {
          this.paymentLoader = false;
          this.booking = response.body;
          this.booking.fromDate = this.bookingData.fromDate;
          this.booking.toDate = this.bookingData.toDate;

          this.payment.referenceNumber = this.booking.propertyReservationNumber;
          this.payment.externalReference = this.booking.externalBookingID;
          this.addServiceToBooking(this.booking);
          this.bookingConfirmed = true;
          this.paymentLoader = true;
          this.changeDetectorRefs.detectChanges();
          this.payment.status = 'Paid';
          console.log('payment ' + JSON.stringify(this.payment));

          this.hotelBookingService
            .savePayment(this.payment)
            .subscribe((res) => {
              if (res.status === 200) {
                // this.openSuccessSnackBar(`Payment Details Saved`);
                this.paymentLoader = false;

                this.payment.id = undefined;
                this.payment.paymentMode = "Cash";
                this.payment.status = "NotPaid";
                this.booking.taxAmount =
                  (this.booking.netAmount * this.booking.taxPercentage) / 100;
                this.payment.taxAmount = (this.booking.taxAmount / 100) * 80;
                this.payment.netReceivableAmount = (this.booking.netAmount /100) * 80;
                this.payment.transactionAmount = (this.booking.totalAmount / 100) * 80 ;
                this.payment.referenceNumber = this.booking.propertyReservationNumber;
                this.payment.amount = (this.booking.totalAmount / 100) * 80;
                this.booking.advanceAmount = (this.booking.totalAmount / 100) * 20;
                this.payment.propertyId = this.bookingData.propertyId;
                this.payment.transactionChargeAmount =
(this.booking.totalAmount / 100)* 80;
                this.hotelBookingService
                  .processPayment(this.payment)
                  .subscribe((response2) => {
                    this.payment = response2.body;
                    this.booking.paymentId = response2.body.id;
                    this.booking.modeOfPayment = this.payment.paymentMode;
                    if (this.booking.id != null) {
                      this.submitButtonDisable = true;
                      this.isSuccess = true;
                      this.headerTitle = "Success!";
                      this.bodyMessage =
                        "Thanks for the booking .Please note the Reservation No: # " +
                        this.booking.propertyReservationNumber +
                        " and an email is sent with the booking details.";

                      this.token.clearHotelBooking();
                      // this.showSuccess(this.contentDialog);

                      this.paymentLoader = true;

                      console.log("payment " + JSON.stringify(this.payment));
                      // this.paymentIntentPayTm(this.payment);
                    } else {
                      this.paymentLoader = false;
                    }
                  });

                // setTimeout(() => {
                //   this.isSuccess = true;
                //   this.headerTitle = "Success!";
                //   this.bodyMessage = "Payment Details Saved.";
                //   this.showSuccess(this.contentDialog);
                //   this.changeDetectorRefs.detectChanges();
                // }, 5000);
              } else {
                this.paymentLoader = false;
                // this.openErrorSnackBar(`Error in updating payment details`);
                // setTimeout(() => {
                //   // this.paymentLoader = false;
                //   this.isSuccess = false;
                //   this.headerTitle = "Error!";
                //   this.bodyMessage = "Error in updating payment details.";
                //   this.showDanger(this.contentDialog);
                //   this.changeDetectorRefs.detectChanges();
                // }, 9000);
              }
            });
        } else {
          this.paymentLoader = false;
        }
      });
    /*setTimeout(() => {
        this.msgs = [];
        createBookingObsr.unsubscribe();
        this.spinner = false;
        this.msgs.push({
          severity: 'error',
          summary: 'The server is taking more than usual time,please try again after sometime.'
        });
      }, 25000); */
  }

  createEnquiry() {
    this.booking.modeOfPayment = this.payment.paymentMode;
    this.booking.externalSite = 'The Hotel Mate';
    this.booking.businessName = this.businessUser.name;
    this.booking.businessEmail = this.businessUser.email;
    this.booking.roomBooking = true;
    this.booking.bookingAmount = this.booking.totalAmount;
    this.booking.groupBooking = false;
    this.booking.available = true;
    this.booking.payableAmount = this.booking.totalAmount;
    this.booking.currency = this.businessUser.localCurrency;
    this.booking.paymentId = this.payment.id;

    console.log('createBooking ', JSON.stringify(this.booking));

    this.paymentLoader = true;


    // console.log(JSON.stringify(this.subscriptions));
      const TO_EMAIL = 'subhasmitatripathy37@gmail.com';
      // const TO_EMAIL = 'abir.sayeed@gmail.com';
      const TO_NAME = 'Support - The Hotel Mate';
      const bccEmail = 'rajeshbiswal591@gmail.com';
      // const bccEmail= 'abir.sayeed@credencesoft.co.nz';

      const bccName = 'Samaya';
      this.enquiryForm = new EnquiryForm();
      this.enquiryForm.businessEmail = this.businessUser.email;
      this.enquiryForm.businessName = this.businessUser.name;
      this.enquiryForm.roomBooking = this.booking.roomBooking;
      this.enquiryForm.groupBooking = this.booking.groupBooking;
      this.enquiryForm.roomId = this.booking.roomId;
      this.enquiryForm.roomPrice = this.booking.roomPrice;
      this.enquiryForm.roomName = this.booking.roomName;
      this.enquiryForm.firstName = this.booking.firstName;
      this.enquiryForm.lastName =  this.booking.lastName;
      this.enquiryForm.fromDate =  this.booking.fromDate;
      this.enquiryForm.toDate =  this.booking.toDate;
      // this.enquiryForm.fromTime =  this.booking.fromTime;
      // this.enquiryForm.toTime =  this.booking.toTime;
      this.enquiryForm.checkInDate =  this.booking.fromDate;
      this.enquiryForm.checkOutDate =  this.booking.toDate;
      this.enquiryForm.email =  this.booking.email;
      this.enquiryForm.hsnCode = this.booking.hsnCode;
      this.enquiryForm.phone =  this.booking.mobile;
      this.enquiryForm.mobile =  this.booking.mobile;
      this.enquiryForm.noOfRooms =  this.booking.noOfRooms;
      this.enquiryForm.noOfPerson =  this.booking.noOfPersons;
      this.enquiryForm.noOfChildren =  this.booking.noOfChildren;
      this.enquiryForm.noOfPets = this.booking.noOfPets;
      this.enquiryForm.externalSite = this.booking.externalSite;
      this.enquiryForm.location = '';
      this.enquiryForm.min = 0;
      this.enquiryForm.max = 0;
      this.enquiryForm.roomRatePlanName = this.booking.roomRatePlanName;
      this.enquiryForm.noOfExtraPerson = this.booking.noOfExtraPerson;
      this.enquiryForm.extraPersonCharge = this.booking.extraPersonCharge;
      this.enquiryForm.noOfExtraChild = this.booking.noOfExtraChild;
      this.enquiryForm.extraChildCharge = this.booking.extraChildCharge;
      this.enquiryForm.roomTariffBeforeDiscount = this.booking.roomTariffBeforeDiscount;
      this.enquiryForm.totalBookingAmount = this.booking.totalBookingAmount;
      this.enquiryForm.paymentStatus = this.payment.status;
      this.enquiryForm.totalRoomTariffBeforeDiscount = this.booking.totalRoomTariffBeforeDiscount;
      this.enquiryForm.discountAmount = this.booking.discountAmount;
      this.enquiryForm.discountPercentage = this.booking.discountPercentage;
      this.enquiryForm.taxAmount = this.booking.taxAmount;
      this.enquiryForm.taxDetails = this.booking.taxDetails;
      this.enquiryForm.payableAmount = this.booking.payableAmount;
      this.enquiryForm.totalAmount = this.booking.totalAmount;
      this.enquiryForm.beforeTaxAmount = this.booking.beforeTaxAmount;
      this.enquiryForm.propertyId = this.booking.propertyId;
      this.enquiryForm.currency = this.booking.currency;
      this.enquiryForm.available = this.booking.available;
      this.enquiryForm.modeOfPayment = this.booking.modeOfPayment;
      this.enquiryForm.includeService = this.booking.includeService;
      this.enquiryForm.customerId = this.booking.customerId;
      this.enquiryForm.businessEmail = this.businessUser.email;
      this.enquiryForm.planCode = this.booking.planCode;

      this.enquiryForm.organisationId = this.businessUser.organisationId;

      this.enquiryForm.counterNumber = '1';
      this.enquiryForm.operatorName = '';

      this.enquirySent = true;

      this.enquiryForm.fromName = this.enquiryForm.firstName + ' ' + this.enquiryForm.lastName;
      this.enquiryForm.toName = TO_NAME;
      this.enquiryForm.fromEmail = this.enquiryForm.email;
      this.enquiryForm.toEmail = TO_EMAIL;
      this.enquiryForm.bccEmail = bccEmail;
      this.enquiryForm.bccName = bccEmail;

      this.enquiryForm.accommodationType = '';
      // this.enquiryForm.dietaryRequirement = form.controls.dietaryRequirement.value;

      this.enquiryForm.accommodationType = this.businessUser.businessSubtype;
      this.enquiryForm.status = "Enquiry";

      if (
        this.enquiryForm.dietaryRequirement === null ||
        this.enquiryForm.dietaryRequirement === undefined
      ) {
        this.enquiryForm.dietaryRequirement = '';
      }
      if (
        this.enquiryForm.accommodationType === null ||
        this.enquiryForm.accommodationType === undefined
      ) {
        this.enquiryForm.accommodationType = '';
      }
      if (
        this.enquiryForm.specialNotes === null ||
        this.enquiryForm.specialNotes === undefined
      ) {
        this.enquiryForm.specialNotes = '';
      }
      if (
        this.enquiryForm.alternativeLocation === null ||
        this.enquiryForm.alternativeLocation === undefined
      ) {
        this.enquiryForm.alternativeLocation = '';
      }

      this.enquiryForm.foodOptions = '';



      this.enquiryForm.subject = '';
      this.setApi();
      console.log('form data ' + JSON.stringify(this.enquiryForm));
      //  this.success = true;
      this.http
        .post<EnquiryForm>(
          this.API_URL + '/api/website/enquire',
          this.enquiryForm
        )
        .subscribe((response) => {
          this.enquiryResponse = response;
          this.successMessage = true;
          console.log('save ' + response);
        });
      this.http
        .post<EnquiryForm>(environment.apiUrlBookone + '/api/email/enquire', this.enquiryForm)
        .subscribe((response) => {
          // this.success = response;
          console.log('sent ' + response);


          // this.enquiryForm = new EnquiryForm();
          this.successMessage = true;
        });

    this.paymentLoader = false;

  }
  setApi() {
    if (this.token.getCountry() === 'New Zealand') {
      this.API_URL = API_URL_NZ;
    } else if (this.token.getCountry() === 'Fiji') {
      this.API_URL = API_URL_NZ;
    } else if (this.token.getCountry() === 'Australia') {
      this.API_URL = API_URL_NZ;
    } else if (this.token.getCountry() === 'Samoa') {
      this.API_URL = API_URL_NZ;
    } else if (this.token.getCountry() === 'India') {
      this.API_URL = API_URL_IN;
    } else {
      this.API_URL = API_URL_IN;
    }
  }
  showSuccess(content) {
    this.alertType = 'success';
    this.showAlert = true;
  }
  showWarning(content) {
    this.alertType = 'warning';
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.changeDetectorRefs.detectChanges();
    }, 3000);
  }
  showDanger(content) {
    this.alertType = 'danger';
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.changeDetectorRefs.detectChanges();
    }, 3000);
  }
  backClicked() {
    // this.locationBack.back();
    this.token.clearHotelBooking();
  }
}
