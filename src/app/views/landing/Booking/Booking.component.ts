import { CallToActionComponent } from './../../../../views/landing/components/call-to-action/call-to-action.component';
// import { Components } from './../../model/components';
// import { Template } from './../../model/template';


import { Router } from "@angular/router";
// import { Customer } from "./../../model/customer";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  NgZone,
} from "@angular/core";
import { Location, DatePipe, formatDate } from "@angular/common";
import { suburbList } from "src/app/data/cityList.data";
import { Booking } from "src/app/model/booking";
import { BusinessServiceDtoList } from "src/app/model/businessServiceDtoList";

import { MessageDto } from "src/app/model/MessageDto";
import { Msg } from "src/app/model/msg";
import { Payment } from "src/app/model/payment";
import { BusinessUser } from "src/app/model/user";

import { API_URL_IN, API_URL_NZ, EMAIL_Expression, SMS_NUMBER } from "src/app/app.component";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { BankAccount } from "src/app/model/BankAccount";
import { MobileWallet } from "src/app/model/mobileWallet";
import { BusinessOfferDto } from "src/app/model/businessOfferDto";
import { PropertyServiceDTO } from "src/app/model/PropertyServices";
import { environment } from "src/environments/environment";
// import { EnquiryForm } from "../Enquiry/Enquiry.component";
import { EnquiryDto } from "src/app/model/enquiry";
// import { forEach } from "cypress/types/lodash";
import { json } from "express";
import { WhatsappDto } from "src/app/model/whatsappDto";
import { Para } from 'src/app/model/parameters';
import { Images } from 'src/app/model/image';
import { Language } from 'src/app/model/language';
import { Room } from 'src/app/model/room';
import { TokenStorage } from 'src/token.storage';
import { ListingService } from 'src/services/listing.service';
import { HotelBookingService } from 'src/services/hotel-booking.service';
import { Logger } from 'src/services/logger.service';
import { Template } from "src/app/model/template";
import { Components } from "src/app/model/components";
import { Customer } from "src/app/model/customer";
import { EnquiryForm } from "../onboarding-roomdetails-form/onboarding-roomdetails-form.component";
import { PropertyEnquiryDto } from "src/model/propertyEnquiryDto";
import { externalReservationDtoList } from "src/app/model/externalReservation";
import { RoomDetail } from "src/app/model/RoomDetail";

declare var Stripe: any;

declare var window: any;
@Component({
  selector: "booking",
  templateUrl: "./Booking.component.html",
  styleUrls: ["./Booking.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class BookingComponent implements OnInit {
  PropertyUrl: string;
  currency: string;
  message: MessageDto;
  enquiryForm: EnquiryDto;
  template :Template;
  components:Components[];
  components2:Components[];
  parameterss:Para[];
  parameterss2:Para[];
  parameterss3:Para[];
  socialmedialist:any;
  externalReservationDtoList:externalReservationDtoList[];
  policies = [];
  businessTypeName: string;
  parameterss4:Para[];
  language:Language
  showAlert: boolean = false;
  alertType: string;
  totalExtraAmount: number = 0;
  images:Images
  verifyOption = "email";
  // smsOption: string = '';
  sendBtn = "Send";
  submitButtonDisable: boolean = false;
  loader = false;
  verificationCode: string;
  lookup = false;
  checkCustomerLookup = false;
  customerVerified = false;
  verificationSend = false;
  paymentLoader: boolean = false;
  verified = false;
  customerExist = false;
  verifiedPending: boolean = false;
  verifySuccessMessage: boolean = false;
  isReservationList: boolean = false;
  headerTitle: string;
  bodyMessage: string;
  payment: Payment;
  homeDelivery = false;
  cashPayment = false;
  totalTaxAmount: number = 0;
  isSuccess: boolean;
  localityList: any = suburbList;
  suburbsLists: any;
  businessUser: BusinessUser;
  // totalQuantity: number ;
  // totalPrice: number;
  myDate: any;
  whatsappForm:WhatsappDto;
  whatsappForm2:WhatsappDto;
  // slotReservation: SlotReservation;
  // slotReservations: SlotReservation[];
  businessServiceDto: BusinessServiceDtoList;
  customerDto: Customer;
  // payment: Payment;
  prepareDay: number;
  prepareHour: number;
  prepareMinute: number;
  propertyId: any;
  hotelID: number;

  leadHour: number;
  leadDay: number;
  leadMin: number;

  leadMaxDay: number;
  leadMaxMin: number;
  leadMaxHour: number;
  componentstype:Components
  componentstype2:Components
  componentstype3:Components
  componentstype4:Components
  contentDialog: any;

  ngbDate: any;
  mobileHasError: boolean = true;
  taxPercentage = 0;
  subTotalAmount: number = 0;
  totalAmount: number = 0;
  bookingData: any;
  propertyData: any;
  booking: Booking;
  timeDifferenceInDays: number;
  totalBeforeTaxAmount: number = 0;
  isVerified: boolean = false;
  parametertype:Para;
  parametertype2:Para;
  reservationRoomDetails:RoomDetail[];

  parametertype3:Para;
  parametertype4:Para;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  upiPayment: boolean;
  roomsAndOccupancy: boolean = false;
  bookingCity: string;
  adults: number = 2;
  avedServices: any[] = [];
  children: number = 0;
  noOfrooms: number = 1;
  DiffDate;
  enddate;
  startDate;
  bookingConfirmed = false;

  bankAccount: BankAccount;
  mobileWallet: MobileWallet;
  businessOfferDto: BusinessOfferDto;
  promoCode: string;
  discountPercentage: number;
  promoMessage = "";
  addServiceList: PropertyServiceDTO[];
  accommodationvalue = [];
  private ewaySecureFieldCode: string;
  private ewayErrors: string = null;
  private ewayInitComplete: boolean = false;
  cardPaymentAvailable: boolean;
  API_URL: string;

  isEnquiry: Boolean = false;
  enquiryNo: string;
  accommodationData: any;
  value: any;
  availableRooms: Room[];
  pet: string;
  externalReservationdto: any;

  propertyenquiryone:PropertyEnquiryDto
  equitycreatedData: any;
  success: EnquiryForm;
  bookingengineurl: any;
  savedServices: any;
  calculatedServices: any;
  totalServiceCost: number =0;
  bookingRoomPrice: any;
  enquiriesNo: any;

  constructor(
    private token: TokenStorage,
    private ngZone: NgZone,
    private locationBack: Location,
    private changeDetectorRefs: ChangeDetectorRef,
    private datePipe: DatePipe,
    private listingService: ListingService,
    private router: Router,
    private http: HttpClient,
    private hotelBookingService: HotelBookingService
  ) {

    this.message = new MessageDto();
    this.myDate = new Date();
    this.parametertype = new Para();
    this.parametertype2 = new Para();
    this.parametertype3 = new Para();
    this.parametertype4 = new Para();
    this.componentstype = new Components();
    this.componentstype2 = new Components();
    this.componentstype3 = new Components();
    this.componentstype4 = new Components();
    this.images = new Images()
    this.whatsappForm = new WhatsappDto();
    this.whatsappForm2 = new WhatsappDto();
    this.template =new Template()
    this.businessOfferDto = new BusinessOfferDto();
    // this.slotReservation = new SlotReservation();
    this.businessServiceDto = new BusinessServiceDtoList();
    this.businessUser = new BusinessUser();
    this.booking = new Booking();
    this.components = [];
    this.components2 = []
    this.language = new Language();
    this.propertyenquiryone = new PropertyEnquiryDto();
    this.payment = new Payment();
    this.mobileWallet = new MobileWallet();
    this.bankAccount = new BankAccount();
    this.customerDto = new Customer();
    this.addServiceList = [];
    this.parameterss =[];
    this.parameterss2 =[];
    this.externalReservationDtoList =[]
    this.parameterss3 =[];
    this.parameterss4 =[];
    if (this.token.getServiceData() !== null) {
      this.addServiceList = this.token.getServiceData();
    }
    if (this.token.getProperty() !== null) {
      this.propertyData = this.token.getProperty();


    }


      this.savedServices = this.token.getSelectedServices();

      setTimeout(() => {
        this.businessUser?.socialMediaLinks.forEach(element => {
          this.socialmedialist=element
        });
                  }, 100);


    this.bookingengineurl = this.token.getwebsitebookingURL()
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
      this.noOfrooms = this.booking.noOfRooms;
    }
    if (this.token.getBookingCity() !== null) {
      this.bookingCity = this.token.getBookingCity();
    }
    if (this.token.saveBookingRoomPrice(this.booking.roomPrice) !== null) {
      this.bookingRoomPrice = this.token.getBookingRoomPrice();


    }



  this.calculateserviceprice();


    console.log('Total Service Cost:', this.totalServiceCost);

    this.booking.fromTime =
      new Date(this.booking.fromDate).getTime() + 21600000;
    this.booking.toTime = new Date(this.booking.toDate).getTime() + 21600000;

    // this.bookingData = this.token.getBookingData();
    // this.booking = this.bookingData;
    // this.calculateDateDeference();
    this.getDiffDate(this.toDate, this.fromDate);
    // this.booking.roomId = this.bookingData.roomId;

    // this.booking.roomType = this.bookingData.roomType;
    // this.booking.noOfRooms = this.bookingData.noOfRooms;
    // this.booking.noOfPersons = this.bookingData.noOfPersons;
    if (this.addServiceList.length > 0) {
      this.booking.includeService = true;
    } else {
      this.booking.includeService = false;
    }

    this.booking.discountAmount = 0;
    this.booking.dayTrip = false;
    this.booking.netAmount =
     this.booking.netAmount

    this.booking.gstAmount =
      (this.booking.netAmount * this.booking.taxPercentage) / 100;
    this.booking.taxAmount = this.booking.gstAmount;
    this.booking.beforeTaxAmount =
      this.booking.netAmount - this.booking.discountAmount;
this.booking.roomTariffBeforeDiscount = Number(this.token.getBookingRoomPrice());
    this.getPropertyDetails(this.booking.propertyId);

    this.payment.expYear = "";
    this.payment.expMonth = "";

    if (this.booking.email === undefined) {
      this.booking.email = "";
    }

    if (this.booking.mobile === undefined) {
      this.booking.mobile = "";
    }

    this.PropertyUrl = this.token.getPropertyUrl();
    console.log("property url:" + this.PropertyUrl)
  }

  ngOnInit() {
// this.sendWhatsappMessageToPropertyOwner();
    this.accommodationData = this.propertyData.businessServiceDtoList?.filter(
      (entry) => entry.name === 'Accommodation'
    );
    this.accommodationData.forEach(element => {
      if (this.bookingengineurl === "true") {
        this.value = element.websiteinstantBooking;
      } else if (this.value !== true) {
        this.value = element.instantBooking;
      }
    });
    this.setApi();
    this.totalExtraAmount = 0;
    this.totalBeforeTaxAmount = 0;
    this.totalTaxAmount = 0;
    this.addServiceList.forEach((element) => {
      this.totalExtraAmount = this.totalExtraAmount + element.afterTaxAmount;
      this.totalTaxAmount = this.totalTaxAmount + element.taxAmount;
      this.totalBeforeTaxAmount =
        this.totalBeforeTaxAmount + element.beforeTaxAmount;
    });
    this.booking.totalAmount =
      this.booking.beforeTaxAmount +
      this.totalExtraAmount +
      this.booking.taxAmount+this.totalServiceCost;
    window["angularComponentReference"] = {
      component: this,
      zone: this.ngZone,
      loadAngularFunction: () => this.stripePaymentSuccess(),
    };
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

  ngAfterViewInit() {
    let radios = document.querySelectorAll(".payment-tab-trigger > input");

    for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener("change", expandAccordion);
    }

    function expandAccordion(event) {
      let allTabs = document.querySelectorAll(".payment-tab");
      for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove("payment-tab-active");
      }
      event.target.parentNode.parentNode.classList.add("payment-tab-active");
    }
  }
  calculateserviceprice(){
   this.calculatedServices =[]
 if (this.savedServices != null && this.savedServices != undefined) {

    this.savedServices.forEach(element => {
      let serviceCost = element.afterTaxAmount * element.quantity;
      this.calculatedServices.push(serviceCost);
      this.totalServiceCost += serviceCost; // Accumulating the total cost
    });
  }
}
  externalReservation(booking){
    this.reservationRoomDetails =[];
    let roomdetailss = new RoomDetail();
let externalreservation = new externalReservationDtoList();
externalreservation.checkinDate = this.booking.fromDate;
externalreservation.checkoutDate = this.booking.toDate;
externalreservation.currency = this.booking.currency;
externalreservation.email = this.booking.email;
externalreservation.totalAmount = this.booking.totalAmount;
externalreservation.amountBeforeTax = this.booking.beforeTaxAmount;
externalreservation.channelId = "9";
externalreservation.lastModifiedBy ='hotelmate';
externalreservation.modeOfPayment = "Cash";
externalreservation.otaReservationId = "THM-"+this.booking.id;
externalreservation.propertyId = this.booking.propertyId.toString();
externalreservation.propertyName = this.booking.businessName;
externalreservation.firstName = this.booking.firstName
externalreservation.lastName = this.booking.lastName;
externalreservation.bookoneReservationId = this.booking.propertyReservationNumber;
externalreservation.contactNumber = this.booking.mobile;
externalreservation.propertyBusinessEmail = this.booking.businessEmail;
// externalreservation.externalTransactionId = this.booking.paymentId.toString();
externalreservation.createdBy = 'hotelmate';
roomdetailss.checkinDate = this.booking.fromDate;
roomdetailss.checkoutDate = this.booking.toDate;
roomdetailss.noOfRooms = this.booking.noOfRooms;
roomdetailss.noOfadult = this.booking.noOfPersons;
roomdetailss.noOfchild = this.booking.noOfChildren;
roomdetailss.plan = this.booking.roomRatePlanName;
roomdetailss.roomRate = this.booking.roomTariffBeforeDiscount;
roomdetailss.roomTypeId = this.booking.roomId.toString();
roomdetailss.roomTypeName = this.booking.roomName;
this.reservationRoomDetails.push(roomdetailss);
externalreservation.roomDetails = this.reservationRoomDetails;
externalreservation.taxAmount = this.booking.taxAmount;
// externalreservation.lastModifiedDate = new Date().toString();
externalreservation.noOfPerson = this.booking.noOfPersons.toString();
externalreservation.resType ='';
externalreservation.otaBooking=false
externalreservation.otaName = 'WebSite'
externalreservation.bookingStatus ='Confirmed';
externalreservation.payloadType ='json';
this.externalReservationDtoList.push(externalreservation)
    this.hotelBookingService
    .externalReservation(this.externalReservationDtoList)
    .subscribe((res) => {
     if (res.status === 200) {
this.externalReservationdto =res.body
     }
    });
  }
  getOfferDetails() {
    this.hotelBookingService
      .getOfferDetailsBySeoFriendlyName(this.businessUser.seoFriendlyName)
      .subscribe((data) => {
        this.businessOfferDto = data.body;
        console.log("this.businessOfferDto: ", data.body);
      });
  }
  applyPromoCode(offer) {
    if (offer !== "") {
      const f = new Date(this.booking.fromDate);
      const s = new Date(offer.startDate);

      const t = new Date(this.booking.toDate);
      const e = new Date(offer.endDate);
      if (s.getTime() <= f.getTime() && e.getTime() >= t.getTime()) {
        this.discountPercentage = offer.discountPercentage;
        this.booking.discountPercentage = offer.discountPercentage;
        this.booking.discountAmount =
          this.booking.netAmount * (this.booking.discountPercentage / 100);
        this.booking.totalAmount =
          this.booking.netAmount +
          (this.booking.netAmount * this.taxPercentage) / 100 -
          this.booking.discountAmount +this.totalServiceCost;

        this.promoMessage = offer.couponCode + " applied!";
      } else {
        this.promoMessage = offer.couponCode + " has expired!";
      }
    } else {
      this.discountPercentage = 0;
      this.booking.discountPercentage = 0;
      this.booking.discountAmount =
        this.booking.netAmount * (this.booking.discountPercentage / 100);
      this.booking.totalAmount =
        this.booking.netAmount +
        (this.booking.netAmount * this.taxPercentage) / 100 -
        this.booking.discountAmount;

      this.promoMessage = "Not available!";
    }
  }
  mileSecondToNGBDate(date: string) {
    const dsd = new Date(date);
    const year = dsd.getFullYear();
    const day = dsd.getDate();
    const month = dsd.getMonth() + 1;
    return { year: year, month: month, day: day };
  }
  getDiffDate(toDate, fromDate) {
    this.enddate = new Date(toDate.year, toDate.month - 1, toDate.day);

    this.startDate = new Date(fromDate.year, fromDate.month - 1, fromDate.day);
    // console.log('this.fromDate: ', this.startDate);
    // console.log('this.toDate: ', this.enddate);
    this.DiffDate = Math.floor(
      (Date.UTC(
        this.enddate.getFullYear(),
        this.enddate.getMonth(),
        this.enddate.getDate()
      ) -
        Date.UTC(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          this.startDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }
  toggleRoomsAndOccupancy() {
    if (this.roomsAndOccupancy === false) {
      this.roomsAndOccupancy = true;
    } else if (this.roomsAndOccupancy === true) {
      this.roomsAndOccupancy = false;
    }
  }
  onReload() {
    window.location.reload(true);
  }
  calculateDateDeference() {
    // Here are the two dates to compare
    const date1 = this.booking.fromDate;
    const date2 = this.booking.toDate;

    // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
    const date1a = date1.split("-");
    const date2a = date2.split("-");

    // Now we convert the array to a Date object, which has several helpful methods
    let date1b = new Date(
      Number(date1a[0]),
      Number(date1a[1]) + 1,
      Number(date1a[2])
    );
    let date2b = new Date(
      Number(date2a[0]),
      Number(date2a[1]) + 1,
      Number(date2a[2])
    );

    // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
    const date1_unixtime = Number(date1b.getTime() / 1000);
    const date2_unixtime = Number(date2b.getTime() / 1000);

    // This is the calculated difference in seconds
    const timeDifference = date2_unixtime - date1_unixtime;

    // in Hours
    const timeDifferenceInHours = timeDifference / 60 / 60;

    // and finaly, in days :)
    this.timeDifferenceInDays = timeDifferenceInHours;
  }
  getPropertyDetails(id: number) {
    this.loader = true;
    // this.listingService.findByPropertyId(id).subscribe(
    //   (data) => {
    //     this.businessUser = data.body;
    this.businessUser = this.token.getProperty();
    this.accommodationvalue = this.businessUser.businessServiceDtoList.filter(ele => ele.name === 'Accommodation');
    console.log("dfghvalue" + JSON.stringify(this.accommodationvalue))
    // console.log("accommodation value is :"+JSON.stringify(this.accommodationvalue));
        this.currency = this.businessUser.localCurrency.toUpperCase();
    this.getOfferDetails();



    if (this.bookingData.propertyId != null && this.bookingData.propertyId != undefined) {
      this.getPropertyDetailsById(this.bookingData.propertyId);
    }
    this.mobileWallet = this.businessUser.mobileWallet;
    this.bankAccount = this.businessUser.bankAccount;
    //  Logger.log(' this.businessUser ===='+JSON.stringify( this.businessUser));
    if (this.businessUser.taxDetails.length > 0) {
      this.businessUser.taxDetails.forEach((element) => {
        if (element.name === "GST") {
          this.booking.taxDetails = [];
          this.booking.taxDetails.push(element);
          this.taxPercentage = element.percentage;
          this.booking.taxPercentage = this.taxPercentage;
          // console.log("this.taxPercentage0" +this.taxPercentage)
          // if (this.bookingCity != null && this.bookingCity != undefined) {
          //   this.booking.roomPrice = Number(this.bookingCity)

          // }
          if (this.bookingCity != null && this.bookingCity != undefined) {
            this.booking.roomPrice = Number(this.bookingCity)

          }
          // debugger
          if (element.taxSlabsList.length > 0) {
            element.taxSlabsList.forEach((element2) => {
              if (
                element2.maxAmount > this.booking.roomPrice &&
                element2.minAmount < this.booking.roomPrice
              ) {
                this.taxPercentage = element2.percentage;
                this.booking.taxPercentage = this.taxPercentage;
              } else if (element2.maxAmount < this.booking.roomPrice) {
                this.taxPercentage = element2.percentage;
                this.booking.taxPercentage = this.taxPercentage;
              }
            });
          }
        }
      });
      // console.log("this.taxPercentage1" +this.taxPercentage)

      // this.taxPercentage = this.booking.taxDetails[0].percentage;
    }

    this.booking.taxAmount =
      (this.booking.netAmount * this.booking.taxPercentage) / 100;
    this.booking.totalAmount =
      this.booking.netAmount +
      this.booking.gstAmount -
      this.booking.discountAmount +this.totalServiceCost;
console.log("this.totalServiceCost" + this.totalServiceCost)
    this.businessServiceDto = this.businessUser.businessServiceDtoList.find(
      (data) => data.name === "Accommodation"
    );

    if (this.businessServiceDto.checkInTime !== null) {
      this.booking.fromTime =
        new Date(this.booking.fromDate).getTime() +
        Number(this.businessServiceDto.checkInTime);
      this.booking.toTime =
        new Date(this.booking.toDate).getTime() +
        Number(this.businessServiceDto.checkOutTime);
    } else {
      this.booking.fromTime =
        new Date(this.booking.fromDate).getTime() + 43200000;
      this.booking.toTime = new Date(this.booking.toDate).getTime() + 43200000;
    }

    this.loader = false;
    //   },
    //   (_error) => {
    //     this.loader = false;
    //   }
    // );
  }

  clickPhone() {
    this.booking.email = "";
  }

  clickEmail() {
    this.booking.mobile = "";
  }
  checkCustomer() {
    this.loader = true;

    if (this.verifyOption === "email") {
      this.message.email = this.booking.email;
      this.message.toNumber = null;
    } else if (this.verifyOption === "sms") {
      this.message.toNumber = this.booking.mobile;
      this.message.email = null;
    }

    this.sendBtn = "Resend";
    this.hotelBookingService
      .authorisationToken(this.message)
      .subscribe((response) => {
        this.loader = false;
        Logger.log("authorisationToken data", JSON.stringify(response));
        const data: any = response;
        this.message.verificationStatus = data.verificationStatus;
        this.message.sid = data.sid;
        this.message.notificationStatus = data.notificationStatus;
      }),
      (error) => {
        this.loader = false;
      };
    // Logger.log('authorisationToken data', JSON.stringify(this.message));
    this.lookup = true;
    this.loader = false;
    this.verificationSend = true;
  }
  phoneHasError(obj) {
    Logger.log(JSON.stringify(obj));
    this.mobileHasError = obj;
  }
  removeItem(item) {
    this.addServiceList.splice(this.addServiceList.indexOf(item), 1);
    this.totalTaxAmount = 0;
    this.totalBeforeTaxAmount = 0;
    this.totalExtraAmount = 0;
    this.addServiceList.forEach((element) => {
      this.totalExtraAmount = this.totalExtraAmount + element.afterTaxAmount;
      this.totalTaxAmount = this.totalTaxAmount + element.taxAmount;
      this.totalBeforeTaxAmount =
        this.totalBeforeTaxAmount + element.beforeTaxAmount;
    });
  }
  getNumber(obj) {
    Logger.log(JSON.stringify(obj));
    this.booking.mobile = obj;
  }
  onVerified() {
    this.isVerified = true;
  }
  mobileTextChange() {
    this.mobileHasError = true;
    this.isVerified = false;
  }
  customerLookup() {
    if (this.verifyOption === "email") {
      this.hotelBookingService
        .getCustomerDetailsByEmail(this.booking.email)
        .subscribe(
          (data) => {
            this.bookingData.customerDtoList = [];
            // Logger.log('Get customer ' + JSON.stringify(data.body));
            this.booking.firstName = data.body.firstName;
            this.booking.lastName = data.body.lastName;
            this.booking.mobile = data.body.mobile;
            this.bookingData.customerDtoList.push(data.body);
            this.booking.customerId = this.bookingData.customerDtoList[0].id;
            this.lookup = true;
            this.customerExist = true;
            this.verified = true;
          },
          (_error) => {
            this.loader = false;
            this.lookup = true;
            this.customerExist = false;
          }
        );
    } else if (this.verifyOption === "sms") {
      this.hotelBookingService
        .getCustomerDetailsByMobile(this.booking.mobile)
        .subscribe(
          (data) => {
            this.bookingData.customerDtoList = [];
            //  Logger.log('Get customer ' + JSON.stringify(data.body));
            this.booking.firstName = data.body.firstName;
            this.booking.lastName = data.body.lastName;
            // this.booking.mobile = data.body.mobile;
            this.booking.email = data.body.email;
            this.bookingData.customerDtoList.push(data.body);
            this.booking.customerId = this.bookingData.customerDtoList[0].id;
            this.lookup = true;
            this.customerExist = true;
            this.verified = true;
          },
          (_error) => {
            this.loader = false;
            this.lookup = true;
            this.customerExist = false;
          }
        );
    }
  }
  varificationSend() {
    this.loader = true;

    if (this.verifyOption === "email") {
      this.message.email = this.booking.email;
      this.message.toNumber = null;
    } else if (this.verifyOption === "sms") {
      this.message.toNumber = this.booking.mobile;
      this.message.email = null;
    }
    this.message.verificationCode = this.verificationCode;
    this.hotelBookingService.verifyAuthorisationToken(this.message).subscribe(
      (response) => {
        this.loader = false;

        const data: any = response;
        this.message.verificationStatus = data.verificationStatus;
        this.message.notificationStatus = data.notificationStatus;
        if (data.verificationStatus === "approved") {
          this.verifiedPending = false;
          this.verified = true;
          this.verifySuccessMessage = true;
          setTimeout(function () {
            this.verifySuccessMessage = false;
          }, 5000);
        } else if (data.verificationStatus === "pending") {
          this.isSuccess = false;
          this.verifiedPending = true;
          this.verified = false;
          this.verifySuccessMessage = true;
          setTimeout(function () {
            this.verifySuccessMessage = false;
          }, 5000);
        } else {
          this.verified = false;
        }
      },
      (_error) => {
        this.loader = false;
      }
    );
  }
  onSubmit(orderForm) {}

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
  backClicked() {
    this.locationBack.back();
  }
  getDateFormatDayMonthYear(
    day12: number,
    month12: number,
    year12: number
  ): string {
    const year = year12;
    const date = day12;

    const month = month12;

    let month1;
    let day1;
    if (Number(month) < 10) {
      month1 = `0${month}`;
    } else {
      month1 = `${month}`;
    }
    if (Number(date) < 10) {
      day1 = `0${date}`;
    } else {
      day1 = `${date}`;
    }

    return `${day1}-${month1}-${year}`;
  }

  onCardPaymentSubmit() {
    this.payment.paymentMode = "Card";
    this.payment.status = "Paid";
    this.payment.firstName = this.booking.firstName;
    this.payment.lastName = this.booking.lastName;
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.payment.transactionAmount = this.booking.totalAmount;
    this.payment.amount = this.booking.totalAmount;
    this.payment.propertyId = this.bookingData.propertyId;
    this.payment.transactionChargeAmount = this.booking.totalAmount;
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.businessUser.email;
    this.payment.currency = this.businessUser.localCurrency;
    this.payment.deliveryChargeAmount = 0;
    this.payment.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.payment.taxAmount = this.booking.gstAmount;
    this.chargeCreditCard(this.payment);
  }
  onWalletPaymentSubmit() {
    this.payment.paymentMode = "Wallet";
    this.payment.status = "Paid";
    this.payment.firstName = this.booking.firstName;
    this.payment.lastName = this.booking.lastName;
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.payment.transactionAmount = this.booking.totalAmount;
    this.payment.amount = this.booking.totalAmount;
    this.payment.propertyId = this.booking.propertyId;
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.businessUser.email;
    this.payment.transactionChargeAmount = this.booking.totalAmount;
    this.payment.currency = this.businessUser.localCurrency;
    this.payment.deliveryChargeAmount = 0;
    this.payment.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.payment.taxAmount = this.booking.gstAmount;

    this.processPayment(this.payment);
  }
  onBankPaymentSubmit(content) {
    this.payment.paymentMode = "BankTransfer";
    this.payment.status = "Paid";
    this.payment.firstName = this.booking.firstName;
    this.payment.lastName = this.booking.lastName;
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.payment.transactionAmount = this.booking.totalAmount;
    this.payment.amount = this.booking.totalAmount;
    this.payment.propertyId = this.bookingData.propertyId;
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.businessUser.email;
    this.payment.transactionChargeAmount = this.booking.totalAmount;
    this.payment.currency = this.businessUser.localCurrency;
    this.payment.deliveryChargeAmount = 0;
    this.payment.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.payment.taxAmount = this.booking.gstAmount;

    this.processPayment(this.payment);
  }

  validateFrom()
  {
    if (EMAIL_Expression.test(this.booking.email) === true &&
      this.booking.firstName != null && this.booking.firstName != undefined && this.booking.firstName != '' &&
      this.booking.lastName != null && this.booking.lastName != undefined && this.booking.lastName != '' &&
      this.booking.mobile != null && this.booking.mobile != undefined && this.booking.mobile != '' &&
      this.mobileHasError)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  Upi() {
    this.cashPayment = false;
  }

  submitFormOne() {
    this.enquiryForm = new EnquiryDto();
    console.log("this.token.getProperty().address", this.token.getProperty().address.city)
    if (this.token.getProperty().address != null && this.token.getProperty().address != undefined &&
      this.token.getProperty().address.city != null && this.token.getProperty().address.city != undefined)
    {
      this.enquiryForm.address = this.token.getProperty().address;
      this.enquiryForm.country = this.token.getProperty().address.country;
      this.enquiryForm.location = this.token.getProperty().address.city;
      this.enquiryForm.alternativeLocation = this.token.getProperty().address.city;
    }
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.enquiryForm.min = this.booking.totalAmount;
    this.enquiryForm.max = this.booking.totalAmount;

    this.enquiryForm.firstName = this.booking.firstName;
    this.enquiryForm.lastName = this.booking.lastName;
    this.enquiryForm.email = this.booking.email;
    this.enquiryForm.phone = this.booking.mobile;
    this.enquiryForm.checkOutDate = this.booking.toDate;
    this.enquiryForm.checkInDate = this.booking.fromDate;
    // const toDate = new Date(this.booking.toDate);
    // this.enquiryForm.toTime = toDate.getTime();
    // const fromDate = new Date(this.booking.fromDate);
    // this.enquiryForm.fromTime = fromDate.getTime();
    this.enquiryForm.noOfPerson = this.booking.noOfPersons;
    this.enquiryForm.noOfExtraPerson=this.booking.noOfExtraPerson;
    this.enquiryForm.roomId=this.booking.roomId;
    this.enquiryForm.payableAmount=this.booking.netAmount;
    this.enquiryForm.roomName=this.booking.roomName;
    this.enquiryForm.extraPersonCharge=this.booking.extraPersonCharge;
    this.enquiryForm.noOfExtraChild=this.booking.noOfExtraChild;
    this.enquiryForm.externalSite="Website";
    this.enquiryForm.source = "The Hotel Mate"
    this.enquiryForm.beforeTaxAmount=this.booking.beforeTaxAmount;
    if(this.businessServiceDto.advanceAmountPercentage === 100){
      this.enquiryForm.advanceAmount = Number((Number(((this.booking.totalAmount)).toFixed(2))));
     }else{
      this.enquiryForm.advanceAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2))));
     }
    // this.enquiryForm.counterName=this.booking.counterName;
    // this.enquiryForm.modeOfPayment=this.booking.modeOfPayment;
    // this.enquiryForm.advanceAmount=this.booking.advanceAmount;
    this.enquiryForm.mobile=this.booking.mobile;
    this.enquiryForm.roomType=this.booking.roomType;
    this.enquiryForm.roomRatePlanName=this.booking.roomRatePlanName;
    this.enquiryForm.createdDate = new Date();

    this.enquiryForm.accountManager ='';
    this.enquiryForm.consultantPerson ='';
    this.enquiryForm.noOfRooms = this.booking.noOfRooms;
    this.enquiryForm.noOfChildren = this.booking.noOfChildren;
    this.enquiryForm.accommodationType = this.token.getProperty().businessType;
    this.enquiryForm.status = "Enquiry";
    this.enquiryForm.specialNotes = this.booking.notes
    this.enquiryForm.propertyId = 107;
    this.enquiryForm.currency = this.token.getProperty().localCurrency;
    this.enquiryForm.taxDetails = this.token.getProperty().taxDetails;
    this.enquiryForm.planCode = this.booking.planCode;

    this.enquiryForm.bookingPropertyId = this.token.getProperty().id;
    this.enquiryForm.propertyName = this.token.getProperty().name;

    const TO_EMAIL = 'support@thehotelmate.com';
    const TO_NAME = 'Support - The Hotel Mate';
    const bccEmail = 'samaya.muduli@credencesoft.co.nz';
    const bccEmail2 = 'info@bookonepms.com';
    const bccName = 'Samaya';

    this.enquiryForm.fromName =
    this.enquiryForm.firstName + ' ' + this.enquiryForm.lastName;
    this.enquiryForm.toName = TO_NAME;
    this.enquiryForm.fromEmail = this.enquiryForm.email;
    this.enquiryForm.toEmail = TO_EMAIL;
    this.enquiryForm.bccEmail = bccEmail;
    this.enquiryForm.bccName = bccEmail;
    this.enquiryForm.bccEmailTo = bccEmail2;
    this.enquiryForm.status = 'Enquiry';

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
    this.enquiryForm.organisationId = environment.parentOrganisationId;
    this.paymentLoader = true;
    this.enquiryForm.roomPrice = this.booking.roomPrice;
    this.hotelBookingService.accommodationEnquiry(this.enquiryForm).subscribe((response) => {
      this.equitycreatedData = response.body;
// console.log("dfgvhbjnk"+ JSON.stringify(this.equitycreatedData))
      this.isEnquiry = true;
      this.paymentLoader = false;
      this.paymentLoader = false;
      this.isSuccess = true;
      this.submitButtonDisable = true;
      // this.bookingConfirmed = true;
      this.enquiryNo = "THM-"+response.body.enquiryId;
      this.enquiriesNo = response.body.enquiryId;

      sessionStorage.setItem('enquiryNo', this.enquiriesNo);

    }, error => {
      this.paymentLoader = false;
    });

  }

  payAndCheckout() {
    this.submitFormOne();

    this.payment.callbackUrl = environment.callbackUrl + this.booking.propertyReservationNumber + "&BookingEngine=true";

    if (this.businessUser.paymentGateway === "paytm") {
      this.payment.paymentMode = "UPI";
      this.payment.status = "NotPaid";
      this.payment.businessServiceName = "Accommodation";
      this.payment.firstName = this.booking.firstName;
      this.payment.lastName = this.booking.lastName;
      this.payment.name = this.booking.firstName + " " + this.booking.lastName;

      this.payment.email = this.booking.email;
      this.payment.businessEmail = this.businessUser.email;
      this.payment.currency = this.businessUser.localCurrency;
      this.payment.propertyId = this.businessUser.id;
      this.booking.taxAmount = ((this.booking.netAmount * this.booking.taxPercentage) / 100);
      if(this.businessServiceDto.advanceAmountPercentage === 100){
        this.payment.taxAmount = Number((Number(((this.booking.taxAmount)).toFixed(2)) + Number(((this.totalTaxAmount)).toFixed(2))).toFixed(2));
        this.payment.netReceivableAmount = Number((Number(((this.booking.netAmount).toFixed(2))) + Number(((this.totalBeforeTaxAmount )).toFixed(2))).toFixed(2));
        this.payment.transactionAmount = Number((Number(((this.booking.totalAmount)).toFixed(2))));
        this.payment.amount = Number((Number(((this.booking.totalAmount)).toFixed(2))));
        this.booking.advanceAmount = Number((Number(((this.booking.totalAmount)).toFixed(2))));
        this.payment.transactionChargeAmount = Number((Number(((this.booking.totalAmount)).toFixed(2))));
       }else{
        this.payment.taxAmount = Number((Number(((this.booking.taxAmount / 100) * 20).toFixed(2)) + Number(((this.totalTaxAmount / 100) * 20).toFixed(2))).toFixed(2));
        this.payment.netReceivableAmount = Number((Number(((this.booking.netAmount / 100)* 20).toFixed(2)) + Number(((this.totalBeforeTaxAmount  / 100) * 20).toFixed(2))).toFixed(2));
        this.payment.transactionAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2))));
        this.payment.amount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2))));

        this.booking.advanceAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2))));
        this.payment.transactionChargeAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2))));
       }
      this.payment.referenceNumber = new Date().getTime().toString();
      this.payment.deliveryChargeAmount = 0;
      this.payment.date = this.datePipe.transform( new Date().getTime(), "yyyy-MM-dd" );
      Logger.log("this.payment "+ JSON.stringify(this.payment));
      // this.token.saveBookingData(this.booking);
      // this.token.savePaymentData(this.payment);

      this.payment.callbackUrl = environment.callbackUrl;

      this.processPaymentPayTM(this.payment);
      // this.processPaymentPayTM(this.payment);

      this.cardPaymentAvailable = true;
    }
    else if (this.businessUser.paymentGateway === "atom") {
      this.payment.paymentMode = "UPI";
      this.payment.status = "NotPaid";
      this.payment.businessServiceName = "Accommodation";
      this.payment.firstName = this.booking.firstName;
      this.payment.lastName = this.booking.lastName;
      this.payment.name = this.booking.firstName + " " + this.booking.lastName;

      this.payment.email = this.booking.email;
      this.payment.businessEmail = this.businessUser.email;
      this.payment.currency = this.businessUser.localCurrency;
      this.payment.propertyId = this.businessUser.id;
      this.booking.taxAmount = ((this.booking.netAmount * this.booking.taxPercentage) / 100);
      this.payment.taxAmount = Number((Number(((this.booking.taxAmount / 100) * 20).toFixed(2)) + Number(((this.totalTaxAmount / 100) * 20).toFixed(2))).toFixed(2));
      this.payment.netReceivableAmount = Number((Number(((this.booking.netAmount / 100)* 20).toFixed(2)) + Number(((this.totalBeforeTaxAmount  / 100) * 20).toFixed(2))).toFixed(2));
      this.payment.transactionAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2)) + Number(( (this.totalExtraAmount / 100) * 20).toFixed(2))).toFixed(2));
      this.payment.amount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2)) + Number(( (this.totalExtraAmount  / 100) * 20).toFixed(2))).toFixed(2));
      this.booking.advanceAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2)) + Number(((this.totalExtraAmount / 100) * 20).toFixed(2))).toFixed(2));
      this.payment.transactionChargeAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2)) + Number(((this.totalExtraAmount /100) * 20).toFixed(2))).toFixed(2));
      this.payment.referenceNumber = new Date().getTime().toString();
      this.payment.deliveryChargeAmount = 0;
      this.payment.date = this.datePipe.transform(
        new Date().getTime(),
        "yyyy-MM-dd"
      );
      Logger.log("this.payment " + JSON.stringify(this.payment));
      // this.token.saveBookingData(this.booking);
      // this.token.savePaymentData(this.payment);

      // this.createBookingAtom();
      this.processPaymentAtom(this.payment);

      this.cardPaymentAvailable = true;
    }
    else if (this.businessUser.paymentGateway === "hdfc") {
      this.payment.paymentMode = "UPI";
      this.payment.status = "NotPaid";
      this.payment.businessServiceName = "Accommodation";
      this.payment.firstName = this.booking.firstName;
      this.payment.lastName = this.booking.lastName;
      this.payment.name = this.booking.firstName + " " + this.booking.lastName;

      this.payment.email = this.booking.email;
      this.payment.businessEmail = this.businessUser.email;
      this.payment.currency = this.businessUser.localCurrency;
      this.payment.propertyId = this.businessUser.id;
      this.booking.taxAmount = ((this.booking.netAmount * this.booking.taxPercentage) / 100);
      this.payment.taxAmount = Number((Number(((this.booking.taxAmount / 100) * 20).toFixed(2)) + Number(((this.totalTaxAmount / 100) * 20).toFixed(2))).toFixed(2));
      this.payment.netReceivableAmount = Number((Number(((this.booking.netAmount / 100)* 20).toFixed(2)) + Number(((this.totalBeforeTaxAmount  / 100) * 20).toFixed(2))).toFixed(2));
      this.payment.transactionAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2))));
      this.payment.amount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2))));
      this.booking.advanceAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2)) + Number(((this.totalExtraAmount / 100) * 20).toFixed(2))).toFixed(2));
      this.payment.transactionChargeAmount = Number((Number(((this.booking.totalAmount / 100) * 20).toFixed(2)) + Number(((this.totalExtraAmount /100) * 20).toFixed(2))).toFixed(2));
      this.payment.referenceNumber = new Date().getTime().toString();
      this.payment.deliveryChargeAmount = 0;
      this.payment.date = this.datePipe.transform(
        new Date().getTime(),
        "yyyy-MM-dd"
      );
      Logger.log("this.payment " + JSON.stringify(this.payment));
      // this.token.saveBookingData(this.booking);
      // this.token.savePaymentData(this.payment);

      // this.createBookingAtom();
      this.processPaymentHDFC(this.payment);

      this.cardPaymentAvailable = true;
    }
  }
  processPaymentPayTM(payment: Payment) {
    this.paymentLoader = true;
    this.changeDetectorRefs.detectChanges();

    this.hotelBookingService.processPayment(payment).subscribe(
      (response) => {
        if (response.status === 200) {
          if (response.body.failureMessage !== null) {
            this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage =
              "Unable to process payment" +
              " Code: " +
              response.body.failureMessage;
            this.showDanger(this.contentDialog);

            this.changeDetectorRefs.detectChanges();
          } else {
            this.paymentLoader = false;
            this.payment = response.body;
            //for post booking create

            this.paymentIntentPayTm(this.payment);

            // for pre booking create

            this.addServiceToBooking(this.booking);
          }
        } else {
          this.paymentLoader = false;
          this.isSuccess = false;
          this.headerTitle = "Error!";
          this.bodyMessage = "Payment Failed! Code: " + response.status;
          this.showDanger(this.contentDialog);
          this.changeDetectorRefs.detectChanges();
        }
      },
      (error) => {
        this.paymentLoader = false;
        this.isSuccess = false;
        this.headerTitle = "Error!";
        this.bodyMessage = "Payment Failed! Code: " + error.status;
        this.showDanger(this.contentDialog);
        this.changeDetectorRefs.detectChanges();
      }
    );
  }
  processPaymentAtom(payment: Payment) {
    this.paymentLoader = true;
    this.changeDetectorRefs.detectChanges();

    this.hotelBookingService.processPayment(payment).subscribe(
      (response) => {
        if (response.status === 200) {
          if (response.body.failureMessage !== null) {
            this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage =
              "Unable to process payment" +
              " Code: " +
              response.body.failureMessage;
            this.showDanger(this.contentDialog);

            this.changeDetectorRefs.detectChanges();
          } else {
            this.paymentLoader = false;
            this.payment = response.body;

            //for post booking create

            this.paymentIntentAtom(this.payment);

            // for pre booking create

            this.addServiceToBooking(this.booking);
          }
        } else {
          this.paymentLoader = false;
          this.isSuccess = false;
          this.headerTitle = "Error!";
          this.bodyMessage = "Payment Failed! Code: " + response.status;
          this.showDanger(this.contentDialog);
          this.changeDetectorRefs.detectChanges();
        }
      },
      (error) => {
        this.paymentLoader = false;
        this.isSuccess = false;
        this.headerTitle = "Error!";
        this.bodyMessage = "Payment Failed! Code: " + error.status;
        this.showDanger(this.contentDialog);
        this.changeDetectorRefs.detectChanges();
      }
    );
  }
  processPaymentHDFC(payment: Payment) {
    this.paymentLoader = true;
    this.changeDetectorRefs.detectChanges();

    this.hotelBookingService.processPayment(payment).subscribe(
      (response) => {
        if (response.status === 200) {
          if (response.body.failureMessage !== null) {
            this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage =
              "Unable to process payment" +
              " Code: " +
              response.body.failureMessage;
            this.showDanger(this.contentDialog);

            this.changeDetectorRefs.detectChanges();
          } else {
            this.paymentLoader = false;
            this.payment = response.body;

            //for post booking create

            this.paymentIntentHdfc(this.payment);

            // for pre booking create

            this.addServiceToBooking(this.booking);
          }
        } else {
          this.paymentLoader = false;
          this.isSuccess = false;
          this.headerTitle = "Error!";
          this.bodyMessage = "Payment Failed! Code: " + response.status;
          this.showDanger(this.contentDialog);
          this.changeDetectorRefs.detectChanges();
        }
      },
      (error) => {
        this.paymentLoader = false;
        this.isSuccess = false;
        this.headerTitle = "Error!";
        this.bodyMessage = "Payment Failed! Code: " + error.status;
        this.showDanger(this.contentDialog);
        this.changeDetectorRefs.detectChanges();
      }
    );
  }
  createBookingPayTM() {
    this.booking.modeOfPayment = this.payment.paymentMode;
    this.booking.externalSite = "Website";
    this.booking.businessName = this.businessUser.name;
    this.booking.businessEmail = this.businessUser.email;
    this.booking.roomBooking = true;
    this.booking.bookingAmount = this.booking.totalAmount;
    this.booking.groupBooking = false;
    this.booking.available = true;
    this.booking.payableAmount = this.booking.totalAmount;
    this.booking.currency = this.businessUser.localCurrency;
    this.booking.paymentId = this.payment.id;

    Logger.log("createBooking ", JSON.stringify(this.booking));

    this.paymentLoader = true;
    this.hotelBookingService
      .createBooking(this.booking)
      .subscribe((response) => {
        //  Logger.log('createBooking ', JSON.stringify(response.body));
        if (response.status === 200) {
          this.paymentLoader = false;
          this.booking = response.body;
          this.booking.fromDate = this.bookingData.fromDate;
          this.booking.toDate = this.bookingData.toDate;

          this.payment.referenceNumber = this.booking.propertyReservationNumber;
          this.payment.externalReference = this.booking.externalBookingID;
          this.payment.amount;
          this.paymentLoader = true;

          Logger.log("payment " + JSON.stringify(this.payment));

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
                this.payment.taxAmount = (this.booking.taxAmount / 100) * 20;
                this.payment.netReceivableAmount = (this.booking.netAmount /100) * 20;
                this.payment.transactionAmount = (this.booking.totalAmount / 100) * 20 ;
                this.payment.amount = (this.booking.totalAmount / 100) * 20;
                this.booking.advanceAmount = (this.booking.totalAmount / 100) * 20;
                this.payment.propertyId = this.bookingData.propertyId;
                this.payment.transactionChargeAmount =
(this.booking.totalAmount / 100)* 20;
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

                      Logger.log("payment " + JSON.stringify(this.payment));
                      this.paymentIntentPayTm(this.payment);
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
  paymentIntentPayTm(payment: Payment) {
    this.paymentLoader = true;

    this.hotelBookingService.paymentIntent(payment).subscribe((response) => {
      this.paymentLoader = false;
      if (response.status === 200) {
        this.payment = response.body;
        this.token.saveBookingData(this.booking);
        this.token.savePaymentData(this.payment);
        this.token.savePropertyData(this.businessUser);

        this.router.navigate(["/checkout"]);
      }
    });
  }
  createBookingAtom() {
    this.booking.modeOfPayment = this.payment.paymentMode;
    this.booking.externalSite = "Website";
    this.booking.businessName = this.businessUser.name;
    this.booking.businessEmail = this.businessUser.email;
    this.booking.roomBooking = true;
    this.booking.bookingAmount = this.booking.totalAmount;
    this.booking.groupBooking = false;
    this.booking.available = true;
    this.booking.payableAmount = this.booking.totalAmount;
    this.booking.currency = this.businessUser.localCurrency;
    this.booking.paymentId = this.payment.id;

    Logger.log("createBooking ", JSON.stringify(this.booking));

    this.paymentLoader = true;
    this.hotelBookingService
      .createBooking(this.booking)
      .subscribe((response) => {
        //  Logger.log('createBooking ', JSON.stringify(response.body));
        if (response.status === 200) {
          this.paymentLoader = false;
          this.booking = response.body;
          this.booking.fromDate = this.bookingData.fromDate;
          this.booking.toDate = this.bookingData.toDate;

          this.payment.referenceNumber = this.booking.propertyReservationNumber;
          this.payment.externalReference = this.booking.externalBookingID;
          this.payment.amount;
          this.paymentLoader = true;

          Logger.log("payment " + JSON.stringify(this.payment));

          this.hotelBookingService
            .savePayment(this.payment)
            .subscribe((res) => {
              if (res.status === 200) {
                // this.openSuccessSnackBar(`Payment Details Saved`);
                this.paymentLoader = false;

                this.payment = res.body;
                this.booking.paymentId = res.body.id;
                this.booking.modeOfPayment = this.payment.paymentMode;
                if (this.booking.id !== null) {
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

                  Logger.log("payment " + JSON.stringify(this.payment));
                  this.paymentIntentAtom(this.payment);
                } else {
                  this.paymentLoader = false;
                }

                // setTimeout(() => {
                //   this.isSuccess = true;
                //   this.headerTitle = 'Success!';
                //   this.bodyMessage = 'Payment Details Saved.';
                //   this.showSuccess(this.contentDialog);
                //   this.changeDetectorRefs.detectChanges();
                // }, 5000);
              } else {
                this.paymentLoader = false;
                // this.openErrorSnackBar(`Error in updating payment details`);
                // setTimeout(() => {
                //   // this.paymentLoader = false;
                //   this.isSuccess = false;
                //   this.headerTitle = 'Error!';
                //   this.bodyMessage = 'Error in updating payment details.';
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
  paymentIntentAtom(payment: Payment) {
    this.paymentLoader = true;

    this.hotelBookingService.paymentIntent(payment).subscribe((response) => {
      this.paymentLoader = false;
      if (response.status === 200) {
        this.payment = response.body;

        this.token.saveBookingData(this.booking);
        this.token.savePaymentData(this.payment);
        this.token.savePropertyData(this.businessUser);

        this.router.navigate(["/checkout-atom"]);
      }
    });
  }
  paymentIntentHdfc(payment: Payment) {
    this.paymentLoader = true;

    this.hotelBookingService.paymentIntent(payment).subscribe((response) => {
      this.paymentLoader = false;
      if (response.status === 200) {
        this.payment = response.body;

        this.token.saveBookingData(this.booking);
        this.token.savePaymentData(this.payment);
        this.token.savePropertyData(this.businessUser);

        this.router.navigate(["/checkout-hdfc"]);
      }
    });
  }
  onCashPaymentSubmit() {
    this.payment.paymentMode = "Cash";
    this.payment.status = "NotPaid";
    this.payment.firstName = this.booking.firstName;
    this.payment.lastName = this.booking.lastName;
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.payment.transactionAmount = this.booking.totalAmount;
    this.payment.amount = this.booking.totalAmount;
    this.payment.propertyId = this.bookingData.propertyId;
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.businessUser.email;
    this.payment.transactionChargeAmount = this.booking.totalAmount;
    this.payment.currency = this.businessUser.localCurrency;
    this.payment.deliveryChargeAmount = 0;
    this.payment.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.payment.taxAmount = this.booking.gstAmount;
    this.booking.outstandingAmount = this.booking.payableAmount;
    this.processPayment(this.payment);
  }

  chargeCreditCard(payment: Payment) {
    this.paymentLoader = true;
    if (this.businessUser.paymentGateway === "eway") {
      const eWAY = (window as any).eWAY;

      const comp = this;

      eWAY.saveAllFields(() => {
        comp.paymentLoader = false;

        if (
          comp.ewaySecureFieldCode === null ||
          comp.ewaySecureFieldCode === undefined ||
          comp.ewaySecureFieldCode.trim().length < 5
        ) {
          comp.paymentLoader = false;
          comp.isSuccess = false;
          comp.headerTitle = "Error!";
          comp.bodyMessage = "Missing card information!";
          comp.showDanger(comp.contentDialog);
          comp.changeDetectorRefs.detectChanges();
        } else if (comp.ewayErrors !== null && comp.ewayErrors !== undefined) {
          comp.paymentLoader = false;
          comp.isSuccess = false;
          comp.headerTitle = "Error!";
          comp.bodyMessage =
            "Wrong card information!" + " Codes: " + comp.ewayErrors;
          comp.showDanger(comp.contentDialog);
          comp.changeDetectorRefs.detectChanges();
        } else {
          payment.token = comp.ewaySecureFieldCode;
          comp.processPayment(payment);
        }
      }, 2000);
    } else {
      (window as any).Stripe.card.createToken(
        {
          number: payment.cardNumber,
          exp_month: payment.expMonth,
          exp_year: payment.expYear,
          cvc: payment.cvv,
        },
        (status: number, response: any) => {
          if (status === 200) {
            const token = response.id;
            payment.token = token;

            this.processPayment(payment);
            this.changeDetectorRefs.detectChanges();
          } else if (status === 402) {
            this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage = "Wrong card information!" + " Code: " + status;
            this.showDanger(this.contentDialog);
            this.changeDetectorRefs.detectChanges();
          } else {
            this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage = "Card Payment Faied!" + " Code: " + status;
            this.showDanger(this.contentDialog);
            this.changeDetectorRefs.detectChanges();
          }
        }
      ),
        (error) => {
          this.paymentLoader = false;
        };
    }
    // (window as any).Stripe.card.createToken(
    //   {
    //     number: payment.cardNumber,
    //     exp_month: payment.expMonth,
    //     exp_year: payment.expYear,
    //     cvc: payment.cvv,
    //   },
    //   (status: number, response: any) => {
    //     if (status === 200) {
    //       const token = response.id;
    //       payment.token = token;

    //       // Logger.log('credit card info done' + JSON.stringify(this.payment));
    //       this.createBooking(this.booking);
    //       this.changeDetectorRefs.detectChanges();
    //     } else if (status === 402) {
    //       this.paymentLoader = false;
    //       this.isSuccess = false;
    //       this.headerTitle = 'Error!';
    //       this.bodyMessage = 'Wrong card information!' + ' Code: ' + status;
    //       this.showDanger(this.contentDialog);
    //       this.changeDetectorRefs.detectChanges();
    //     } else {
    //       this.paymentLoader = false;
    //       this.isSuccess = false;
    //       this.headerTitle = 'Error!';
    //       this.bodyMessage = 'Card Payment Faied!' + ' Code: ' + status;
    //       this.showDanger(this.contentDialog);
    //       this.changeDetectorRefs.detectChanges();
    //     }
    //   }
    // ),
    //   (error) => {
    //     this.paymentLoader = false;
    //   };
  }
  // savePaymentProcess() {
  //   this.orderService.savePayment(this.payment).subscribe((res1) => {
  //     if (res1.status === 200) {
  //       this.payment = res1.body;
  //       // Logger.log('res1 save payment : ' + JSON.stringify(res1.body));
  //       // Logger.log('s : ' + JSON.stringify(this.slotReservation));

  //       this.bookingData.paymentId = this.payment.id;
  //       this.booking.modeOfPayment = this.payment.paymentMode;
  //       this.createBooking(this.booking);
  //     } else {
  //       this.paymentLoader = false;
  //     }
  //   });
  // }
  addServiceToBooking(booking) {
    if (this.addServiceList.length > 0) {
      this.hotelBookingService
        .addServicesToBooking(this.addServiceList, booking.id)
        .subscribe((serviceRes) => {
          Logger.log("addServiceList ", JSON.stringify(serviceRes.body));
        });
    }
  }
  processPayment(payment: Payment) {
    this.paymentLoader = true;
    this.changeDetectorRefs.detectChanges();

    this.hotelBookingService.processPayment(payment).subscribe(
      (response) => {
        if (response.status === 200) {
          if (response.body.failureMessage !== null) {
            this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage =
              "Unable to process payment" +
              " Code: " +
              response.body.failureMessage;
            this.showDanger(this.contentDialog);

            this.changeDetectorRefs.detectChanges();
          } else {
            this.paymentLoader = false;
            this.payment = response.body;
            this.booking.paymentId = response.body.id;
            this.booking.modeOfPayment = this.payment.paymentMode;

            this.hotelBookingService.savePayment(this.payment).subscribe(
              (res1) => {
                if (res1.status === 200) {
                  this.paymentLoader = false;
                  this.changeDetectorRefs.detectChanges();

                  this.createBooking();
                } else {
                  this.paymentLoader = false;
                  this.isSuccess = false;
                  this.headerTitle = "Error!";
                  this.bodyMessage =
                    "Unable to save payment" + " Code: " + status;
                  this.showDanger(this.contentDialog);

                  this.paymentLoader = false;
                  this.changeDetectorRefs.detectChanges();
                }
              },
              (error) => {
                this.paymentLoader = false;
                this.isSuccess = false;
                this.headerTitle = "Error!";
                this.bodyMessage =
                  "Saving Payment Failed! Code: " + error.status;
                this.showDanger(this.contentDialog);
                this.changeDetectorRefs.detectChanges();
              }
            );
          }
        } else {
          this.paymentLoader = false;
          this.isSuccess = false;
          this.headerTitle = "Error!";
          this.bodyMessage = "Payment Failed! Code: " + response.status;
          this.showDanger(this.contentDialog);
          this.changeDetectorRefs.detectChanges();
        }
      },
      (error) => {
        this.paymentLoader = false;
        this.isSuccess = false;
        this.headerTitle = "Error!";
        this.bodyMessage = "Payment Failed! Code: " + error.status;
        this.showDanger(this.contentDialog);
        this.changeDetectorRefs.detectChanges();
      }
    );
  }
  cashOnDelivery() {
    this.cashPayment = true;
  }
  cardPayment() {
    this.cashPayment = false;
    if (this.businessUser.paymentGateway === "stripe") {
      this.loadStripe();

      this.payment.paymentMode = "Card";
      this.payment.status = "Paid";
      this.payment.firstName = this.booking.firstName;
      this.payment.lastName = this.booking.lastName;
      this.payment.netReceivableAmount = this.booking.netAmount;
      this.payment.transactionAmount = this.booking.totalAmount;
      this.payment.amount = this.booking.totalAmount;
      this.payment.propertyId = this.bookingData.propertyId;
      this.payment.transactionChargeAmount = this.booking.totalAmount;
      this.payment.email = this.booking.email;
      this.payment.businessEmail = this.businessUser.email;
      this.payment.currency = this.businessUser.localCurrency;

      this.booking.taxAmount =
        (this.booking.netAmount * this.booking.taxPercentage) / 100;
      this.payment.taxAmount = this.booking.taxAmount;
      this.payment.deliveryChargeAmount = 0;
      this.payment.date = this.datePipe.transform(
        new Date().getTime(),
        "yyyy-MM-dd"
      );
      this.booking.outstandingAmount = 0;
      this.paymentIntent(this.payment);
      this.cardPaymentAvailable = true;
    }
  }
  bankPayment() {
    this.cashPayment = false;
  }
  MobileWallet() {
    this.cashPayment = false;
  }

  redirectToBooking() {
     this.locationBack.back();

  }

  sendConfirmationMessage() {
    this.paymentLoader = true;
    let msg = new Msg();
    msg.fromNumber = SMS_NUMBER;
    msg.toNumber = this.booking.mobile;
    msg.message = `Dear ${this.booking.firstName},Rsvn#:${this.booking.id},${this.booking.roomName},Chk-In:${this.booking.fromDate},Chk-Out:${this.booking.toDate},Amt:${this.booking.payableAmount}NZD.Thx.${this.booking.businessName},${this.booking.mobile}`;
    this.hotelBookingService.sendTextMessage(msg).subscribe(
      (response1) => {
        msg = response1.body;
        if (msg.sid !== undefined || msg.sid !== null) {
          this.paymentLoader = false;
          // this.submitButtonDisable = true;
          this.isSuccess = true;
          this.headerTitle = "Success!";
          this.bodyMessage = "Booking Confirmation Sent.";
          this.showSuccess(this.contentDialog);
          setTimeout(() => {
            this.showAlert = false;
            this.changeDetectorRefs.detectChanges();
          }, 10000);
          this.changeDetectorRefs.detectChanges();
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.paymentLoader = false;
          this.isSuccess = false;
          this.headerTitle = "Error!";
          this.bodyMessage = "Error in sending sms.";
          this.showDanger(this.contentDialog);
          this.changeDetectorRefs.detectChanges();
        }
      }
    );
  }
  createBooking() {
    this.booking.modeOfPayment = this.payment.paymentMode;
    this.booking.externalSite = "WebSite";
    this.booking.businessName = this.businessUser.name;
    this.booking.businessEmail = this.businessUser.email;
    this.booking.roomBooking = true;
    this.booking.bookingAmount = this.booking.totalAmount;
    this.booking.groupBooking = false;
    this.booking.available = true;
    this.booking.payableAmount = this.booking.totalAmount;
    this.booking.currency = this.businessUser.localCurrency;

    Logger.log("createBooking ", JSON.stringify(this.booking));

    this.paymentLoader = true;
    this.hotelBookingService
      .createBooking(this.booking)
      .subscribe((response) => {
        //  Logger.log('createBooking ', JSON.stringify(response.body));
        if (response.status === 200) {
          this.paymentLoader = false;
          this.booking = response.body;
          this.booking.fromDate = this.bookingData.fromDate;
          this.booking.toDate = this.bookingData.toDate;
          this.externalReservation(this.booking);
          setTimeout(() => {
            this.accommodationEnquiryBookingData();
        }, 3000);
          this.router.navigate(['/Confirm-Booking']);
          if (this.booking.id !== null) {
            this.submitButtonDisable = true;
            this.isSuccess = true;
            this.headerTitle = "Success!";
            this.bodyMessage =
              "Thanks for the booking .Please note the Reservation No: # " +
              this.booking.propertyReservationNumber +
              " and an email is sent with the booking details.";
            this.bookingConfirmed = true;
            this.addServiceToBooking(this.booking);
            this.token.clearHotelBooking();
            this.showSuccess(this.contentDialog);
            if (
              this.booking.mobile !== null &&
              this.booking.mobile !== undefined
            ) {
              setTimeout(() => {
                // this.backClicked();
                // this.router.navigate(['/']);
                this.sendConfirmationMessage();
                this.changeDetectorRefs.detectChanges();
              }, 1000);
              // this.sendConfirmationMessage();
            }
            this.payment.referenceNumber =
              this.booking.propertyReservationNumber;

            this.payment.externalReference = this.booking.externalBookingID;
            this.paymentLoader = true;

            Logger.log("payment " + JSON.stringify(this.payment));

            this.hotelBookingService
              .savePayment(this.payment)
              .subscribe((res) => {
                if (res.status === 200) {
                  // this.openSuccessSnackBar(`Payment Details Saved`);
                  this.paymentLoader = false;
                  setTimeout(() => {
                    this.isSuccess = true;
                    this.headerTitle = "Success!";
                    this.bodyMessage = "Payment Details Saved.";
                    this.showSuccess(this.contentDialog);
                    this.changeDetectorRefs.detectChanges();
                  }, 5000);
                } else {
                  this.paymentLoader = false;
                  // this.openErrorSnackBar(`Error in updating payment details`);
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
          } else {
            this.paymentLoader = false;
            // this.msgs.push({
            //   severity: 'error',
            //   summary: 'Please check the booking details and try again !'
            // });
          }
        } else {
          this.paymentLoader = false;
          // this.msgs.push({
          //   severity: 'error',
          //   summary: response.statusText + ':' + response.statusText
          // });
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

  onGoHome() {
    this.locationBack.back();
  }

  // Home() {
  //   this.router.navigate(['/']);
  //   this.token.clearHotelBooking();
  // }


  paymentIntent(payment: Payment) {
    this.paymentLoader = true;
    payment.date = this.datePipe.transform(new Date().getTime(), "yyyy-MM-dd");
    this.hotelBookingService.paymentIntent(payment).subscribe((response) => {
      this.paymentLoader = false;
      if (response.status === 200) {
        this.payment = response.body;
        // console.log("payment Intent Response: " + response);
      }
    });
  }
  accommodationEnquiryBookingData(){
    this.enquiryForm = new EnquiryDto();

    if (this.token.getProperty().address != null && this.token.getProperty().address != undefined &&
      this.token.getProperty().address.city != null && this.token.getProperty().address.city != undefined)
    {
      this.enquiryForm.address = this.token.getProperty().address;
      this.enquiryForm.country = this.token.getProperty().address.country;
      this.enquiryForm.location = this.token.getProperty().address.city;
      this.enquiryForm.alternativeLocation = this.token.getProperty().address.city;
    }
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.enquiryForm.min = this.booking.totalAmount;
    this.enquiryForm.max = this.booking.totalAmount;
    // this.enquiryForm.totalAmount = this.booking.totalAmount;

    this.enquiryForm.firstName = this.booking.firstName;
    this.enquiryForm.lastName = this.booking.lastName;
    this.enquiryForm.email = this.booking.email;
    this.enquiryForm.phone = this.booking.mobile;
    this.enquiryForm.checkOutDate = this.booking.toDate;
    this.enquiryForm.checkInDate = this.booking.fromDate;
    this.enquiryForm.noOfPerson = this.booking.noOfPersons;
    this.enquiryForm.noOfExtraPerson=this.booking.noOfExtraPerson;
    this.enquiryForm.roomId=this.booking.roomId;
    this.enquiryForm.payableAmount=this.booking.netAmount;
    this.enquiryForm.roomName=this.booking.roomName;
    this.enquiryForm.extraPersonCharge=this.booking.extraPersonCharge;
    this.enquiryForm.noOfExtraChild=this.booking.noOfExtraChild;
    this.enquiryForm.externalSite="Website";
    this.enquiryForm.source = "Bookone Connect"
    this.enquiryForm.beforeTaxAmount=this.booking.beforeTaxAmount;
    this.enquiryForm.mobile=this.booking.mobile;
    this.enquiryForm.roomType=this.booking.roomType;
    this.enquiryForm.roomRatePlanName=this.booking.roomRatePlanName;
    this.enquiryForm.createdDate = new Date();

    this.enquiryForm.accountManager ='TheHotelMate Team';
    this.enquiryForm.consultantPerson ='';
    this.enquiryForm.noOfRooms = this.booking.noOfRooms;
    this.enquiryForm.noOfChildren = this.booking.noOfChildren;
    this.enquiryForm.accommodationType = this.token.getProperty().businessType;
    this.enquiryForm.status = "Booked";
    this.enquiryForm.specialNotes = this.booking.notes
    this.enquiryForm.propertyId = 107;
    // this.enquiryForm.currency = this.token.getProperty().localCurrency;
    // this.enquiryForm.taxDetails = this.token.getProperty().taxDetails;
    // this.enquiryForm.planCode = this.booking.planCode;
    this.enquiryForm.bookingReservationId = this.booking.propertyReservationNumber;
    this.enquiryForm.bookingId = this.booking.id;

    this.enquiryForm.bookingPropertyId = this.token.getProperty().id;
    this.enquiryForm.propertyName = this.token.getProperty().name;

    const TO_EMAIL = 'support@thehotelmate.com';
    const TO_NAME = 'Support - The Hotel Mate';
    const bccEmail = 'samaya.muduli@credencesoft.co.nz';
    const bccEmail2 = 'info@bookonepms.com';
    const bccName = 'Samaya';

    this.enquiryForm.fromName =
    this.enquiryForm.firstName + ' ' + this.enquiryForm.lastName;
    this.enquiryForm.toName = TO_NAME;
    this.enquiryForm.fromEmail = this.enquiryForm.email;
    this.enquiryForm.toEmail = TO_EMAIL;
    this.enquiryForm.bccEmail = bccEmail;
    this.enquiryForm.bccName = bccEmail;
    this.enquiryForm.bccEmailTo = bccEmail2;

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
    this.enquiryForm.organisationId = environment.parentOrganisationId;
    this.paymentLoader = true;
    this.enquiryForm.roomPrice = this.booking.roomPrice;
    this.hotelBookingService.accommodationEnquiry(this.enquiryForm).subscribe((response) => {
      this.enquiryForm = response.body;
      this.paymentLoader = false;
      this.paymentLoader = false;
      this.isSuccess = true;
      this.submitButtonDisable = true;
      this.bookingConfirmed = true;
    })
  }

  async getPropertyDetailsById(id: number) {
    // debugger
    // //console.log("id isequal to" + id)
    try {
      this.loader = true;
      const data = await this.listingService?.findByPropertyId(id).toPromise();
      if (data.status === 200) {
        this.businessUser = data.body;

        this.policies = this.businessUser.businessServiceDtoList.filter(
          (ele) => ele.name === 'Accommodation'
        );
        this.token.saveProperty(this.businessUser);
        this.currency = this.businessUser.localCurrency.toUpperCase();
        this.businessTypeName = this.businessUser.businessType;
        this.businessServiceDto = this.businessUser.businessServiceDtoList.find(
          (data) => data.name === this.businessUser.businessType
        );

        this.businessUser?.socialMediaLinks.forEach(element => {
          this.socialmedialist=element
        });

        if (this.businessUser.primaryColor !== undefined) {
          this.changeTheme(
            this.businessUser.primaryColor,
            this.businessUser.secondaryColor,
            this.businessUser.tertiaryColor
          );
        }


        this.changeDetectorRefs.detectChanges();
      } else {
        this.router.navigate(["/404"]);
      }
    } catch (error) {
      this.loader = false;
      // Handle the error appropriately, if needed.
    }
  }

  changeTheme(primary: string, secondary: string, tertiary: string) {
    document.documentElement.style.setProperty('--primary', primary);

    document.documentElement.style.setProperty('--secondary', secondary);
    document.documentElement.style.setProperty('--tertiary', tertiary);
    document.documentElement.style.setProperty('--button-primary', tertiary);
    document.documentElement.style.setProperty(
      '--primary-gradient',
      'linear-gradient( 180deg, ' + tertiary + ', ' + secondary + ')'
    );
    document.documentElement.style.setProperty(
      '--secondary-gradient',
      'linear-gradient( 312deg, ' + primary + ', ' + secondary + ')'
    );
    document.documentElement.style.setProperty(
      '--secondary-one-gradient',
      'linear-gradient( 180deg, ' + primary + ', ' + secondary + ')'
    );

    document.documentElement.style.setProperty(
      '--third-gradient',
      'linear-gradient( 180deg, ' + primary + ', ' + secondary + ')'
    );
  }

  loadStripe() {
    // Your Stripe public key
    const stripe = Stripe(this.businessUser.paymentGatewayPublicKey);

    // Create `card` element that will watch for updates
    // and display error messages
    const elements = stripe.elements();
    const card = elements.create("card");
    card.mount("#card-element");
    card.addEventListener("change", (event) => {
      const displayError = document.getElementById("card-error");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });

    // Listen for form submission, process the form with Stripe,
    // and get the
    const paymentForm = document.getElementById("payment-form");
    paymentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      payWithCard(stripe, card, this.payment.clientSecret);
    });

    const payWithCard = function (_stripe, _card, clientSecret) {
      loading(true);
      _stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: _card,
          },
        })
        .then(function (result) {
          if (result.error) {
            // Show error to your customer
            showError(result.error.message);
          } else {
            // The payment succeeded!
            loading(false);

            console.log(JSON.stringify(result));

            orderComplete();
          }
        });
    };

    const loading = function (isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("button").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
      } else {
        document.querySelector("button").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
      }
    };
    const showError = function (errorMsgText) {
      loading(false);
      var errorMsg = document.querySelector("#card-error");
      errorMsg.textContent = errorMsgText;
      setTimeout(function () {
        errorMsg.textContent = "";
      }, 4000);
    };
    let orderComplete = function () {
      window.angularComponentReference.zone.run(() => {
        window.angularComponentReference.loadAngularFunction();
      });
    };
  }
  stripePaymentSuccess() {
    this.hotelBookingService.savePayment(this.payment).subscribe((response) => {
      this.paymentLoader = false;
      if (response.status === 200) {
        this.payment = response.body;
        // console.log("payment Intent Response: " + response);

        this.booking.paymentId = response.body.id;
        this.booking.modeOfPayment = this.payment.paymentMode;
        this.booking.outstandingAmount = 0;
        Logger.log("Card info done" + JSON.stringify(this.payment));
        this.changeDetectorRefs.detectChanges();

        this.createBooking();
      }
    });
  }
  submitForm() {
    this.enquiryForm = new EnquiryDto();

    if (this.token.getProperty().address != null && this.token.getProperty().address != undefined &&
      this.token.getProperty().address.city != null && this.token.getProperty().address.city != undefined)
    {
      this.enquiryForm.address = this.token.getProperty().address;
      this.enquiryForm.country = this.token.getProperty().address.country;
      this.enquiryForm.location = this.token.getProperty().address.city;
      this.enquiryForm.alternativeLocation = this.token.getProperty().address.city;
    }
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.enquiryForm.min = this.booking.totalAmount;
    this.enquiryForm.max = this.booking.totalAmount;

    this.enquiryForm.firstName = this.booking.firstName;
    this.enquiryForm.lastName = this.booking.lastName;
    this.enquiryForm.email = this.booking.email;
    this.enquiryForm.phone = this.booking.mobile;
    this.enquiryForm.checkOutDate = this.booking.toDate;
    this.enquiryForm.checkInDate = this.booking.fromDate;
    this.enquiryForm.noOfPerson = this.booking.noOfPersons;
    this.enquiryForm.noOfExtraPerson=this.booking.noOfExtraPerson;
    this.enquiryForm.roomId=this.booking.roomId;
    this.enquiryForm.payableAmount=this.booking.netAmount;
    this.enquiryForm.roomName=this.booking.roomName;
    this.enquiryForm.extraPersonCharge=this.booking.extraPersonCharge;
    this.enquiryForm.noOfExtraChild=this.booking.noOfExtraChild;
    this.enquiryForm.roomPrice=(this.booking.netAmount / this.DiffDate);
    this.enquiryForm.externalSite="Website";
    this.enquiryForm.source = "Bookone Connect"
    this.enquiryForm.beforeTaxAmount=this.booking.beforeTaxAmount;
    // this.enquiryForm.counterName=this.booking.counterName;
    // this.enquiryForm.modeOfPayment=this.booking.modeOfPayment;
    // this.enquiryForm.advanceAmount=this.booking.advanceAmount;
    this.enquiryForm.mobile=this.booking.mobile;
    this.enquiryForm.roomType=this.booking.roomType;
    this.enquiryForm.roomRatePlanName=this.booking.roomRatePlanName;
    this.enquiryForm.createdDate = new Date();

    this.enquiryForm.accountManager ='';
    this.enquiryForm.consultantPerson ='';
    this.enquiryForm.noOfRooms = this.booking.noOfRooms;
    this.enquiryForm.noOfChildren = this.booking.noOfChildren;
    this.enquiryForm.accommodationType = this.token.getProperty().businessType;
    this.enquiryForm.status = "Enquiry";
    this.enquiryForm.specialNotes = this.booking.notes
    this.enquiryForm.propertyId = 107;
    this.enquiryForm.bookingPropertyId = this.token.getProperty().id;
    this.enquiryForm.propertyName = this.token.getProperty().name;

    const TO_EMAIL = 'support@thehotelmate.com';
    const TO_NAME = 'Support - The Hotel Mate';
    const bccEmail = 'samaya.muduli@credencesoft.co.nz';
    const bccEmail2 = 'info@bookonepms.com';
    const bccName = 'Samaya';

    this.enquiryForm.fromName =
    this.enquiryForm.firstName + ' ' + this.enquiryForm.lastName;
    this.enquiryForm.toName = TO_NAME;
    this.enquiryForm.fromEmail = this.enquiryForm.email;
    this.enquiryForm.toEmail = TO_EMAIL;
    this.enquiryForm.bccEmail = bccEmail;
    this.enquiryForm.bccName = bccEmail;
    this.enquiryForm.bccEmailTo = bccEmail2;
    this.enquiryForm.status = 'Enquiry';

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
    this.enquiryForm.organisationId = environment.parentOrganisationId;
    this.paymentLoader = true;

    this.hotelBookingService.accommodationEnquiry(this.enquiryForm).subscribe((response) => {
      this.equitycreatedData = response.body;
// console.log("dfgvhbjnk"+ JSON.stringify(this.equitycreatedData))
      this.isEnquiry = true;
      this.paymentLoader = false;
      this.paymentLoader = false;
      this.isSuccess = true;
      this.submitButtonDisable = true;
      this.bookingConfirmed = true;
      this.enquiryNo = "THM-"+response.body.enquiryId;
      this.propertyenquiryemails()
      this.hotelBookingService.emailEnquire(this.enquiryForm).subscribe((response) => {
        this.paymentLoader = false;

      }, error => {
        this.paymentLoader = false;
      });


    }, error => {
      this.paymentLoader = false;
    });
    this.sendenquirytoproperty(this.enquiryForm)
    this.sendWhatsappMessageToCustomer();
    this.sendWhatsappMessageToPropertyOwner();
  }
  propertyenquiryemails(){
    // console.log(this.equitycreatedData.enquiryId)
        this.propertyenquiryone.customerName = this.enquiryForm.fromName;
          this.propertyenquiryone.propertyEnquiryId =this.equitycreatedData.enquiryId;
          this.propertyenquiryone.propertyId = this.businessUser.id ;
          this.propertyenquiryone.propertyName = this.businessUser.name;
          this.propertyenquiryone.propertyLandPhone =this.businessUser.mobile;
          this.propertyenquiryone.propertyMobile = this.businessUser.mobile;



           this.http
           .post<EnquiryForm>('https://api.bookonelocal.in/api-lms/api/v1/propertyEnquiry', this.propertyenquiryone)
           .subscribe((response) => {
             this.success = response;
             Logger.log('sent ' + response);

             // this.name = '';
             // this.fromEmail = '';
             // this.phone = '';
             // this.subject = '';

             // this.accommodationType = '';
             // this.noOfPerson = 0;
             // this.noOfRooms = 0;
             // this.noOfChildren = 0;
             // this.noOfPets = 0;
             // this.location = '';
             // this.alternativeLocation = '';
             // this.phone = '';
             // this.email = '';
             // this.checkInDate = '';
             // this.checkOutDate = '';
             // this.foodOptions = '';
             // this.dietaryRequirement = '';
             // this.min = 0;
             // this.max = 0;
             // this.specialNotes = '';

            //  this.enquiryForm = new EnquiryForm();
            //  this.successMessage = true;
           });


       }
  sendenquirytoproperty(enquiryForm){
    this.enquiryForm.fromEmail = "support@thehotelmate.com";
this.enquiryForm.phone = '';
this.enquiryForm.email = '',
this.enquiryForm.roomPrice = this.booking.totalAmount
   this.enquiryForm.toEmail = this.businessUser.email
    this.http.post<EnquiryForm>(environment.apiUrlBookone + '/api/email/enquire', this.enquiryForm)
    .subscribe((response) => {
      this.success = response;
      Logger.log('sent ' + response);

      // this.name = '';
      // this.fromEmail = '';
      // this.phone = '';
      // this.subject = '';

      // this.accommodationType = '';
      // this.noOfPerson = 0;
      // this.noOfRooms = 0;
      // this.noOfChildren = 0;
      // this.noOfPets = 0;
      // this.location = '';
      // this.alternativeLocation = '';
      // this.phone = '';
      // this.email = '';
      // this.checkInDate = '';
      // this.checkOutDate = '';
      // this.foodOptions = '';
      // this.dietaryRequirement = '';
      // this.min = 0;
      // this.max = 0;
      // this.specialNotes = '';

      // this.enquiryForm = new EnquiryForm();
      // this.successMessage = true;
    });

  //  this.propertyenquiryemails(enquiryForm);

  }
  sendWhatsappMessageToCustomer(){
  this.whatsappForm.messaging_product = 'whatsapp';
  this.whatsappForm.recipient_type ='individual';
  this.template.name = "";
  this.template.name = "sample_reservation_inquiry";
  this.language.code = 'en',
  this.template.language = this.language;
  this.componentstype.type= 'header',
  this.parametertype.type = 'image',
this.images.link ='https://bookonelocal.in/cdn/BookOne.jpeg',
  this.parametertype.image = this.images;
  this.parameterss.push(this.parametertype);
  this.componentstype.parameters =this.parameterss;
  this.components.push(this.componentstype);
  this.componentstype2.type= 'body',
  this.parametertype2 = new Para()
  this.parametertype2.type = 'text',
  this.parametertype2.text = this.booking.firstName ;
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para()
  this.parametertype2.type = 'text',
  this.parametertype2.text = this.businessUser.name;
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text',
  this.parametertype2.text = this.booking.fromDate;
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text',
  this.parametertype2.text = this.booking.toDate;
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text',
  this.parametertype2.text = this.booking.noOfRooms.toString();
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text',
  this.parametertype2.text = (this.booking.noOfPersons).toString();
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text',
  this.parametertype2.text = (this.booking.noOfChildren).toString();
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text';
  if(this.booking.noOfExtraPerson != null && this.booking.noOfExtraPerson != undefined  && this.booking.noOfExtraPerson != 0){
    this.parametertype2.text = (this.booking.noOfExtraPerson).toString();
  }else{
    this.parametertype2.text = '0'
  }

  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text';
  if(this.booking.noOfExtraChild != null && this.booking.noOfExtraChild != undefined  && this.booking.noOfExtraChild != 0){
    this.parametertype2.text = ( this.booking.noOfExtraChild).toString();
  }else{
    this.parametertype2.text = '0'
  }
  this.parameterss2.push(this.parametertype2);

  this.parametertype2 = new Para();
  this.parametertype2.type = 'text';
  if (this.booking.notes != null && this.booking.notes != undefined) {
    this.parametertype2.text = this.booking.notes;
  } else {
    this.parametertype2.text = "  ";
  }
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text',
  this.parametertype2.text = this.booking.totalAmount.toString();
  this.parameterss2.push(this.parametertype2);
  this.parametertype2 = new Para();
  this.parametertype2.type = 'text',
  this.parametertype2.text = this.booking.totalAmount.toString();
  this.parameterss2.push(this.parametertype2);
  this.componentstype2.parameters =this.parameterss2;
  this.components.push(this.componentstype2);
  this.template.components = this.components;
  this.whatsappForm.template =this.template;
  this.whatsappForm.to = this.booking.mobile,
  this.whatsappForm.type = 'template',
    this.hotelBookingService.whatsAppMsg(this.whatsappForm).subscribe((response) => {
      this.paymentLoader = false;

    }, error => {
      this.paymentLoader = false;
    });
  }
  sendWhatsappMessageToPropertyOwner(){
    this.whatsappForm2.messaging_product = 'whatsapp';
    this.whatsappForm2.recipient_type ='individual';
    this.template.name = "";
    this.template.name = "sample_reservation_enquiry_hotel";
    this.language.code = 'en',
    this.template.language = this.language;
    this.componentstype3.type= 'header',
    this.parametertype3.type = 'image',
    this.images.link ='https://bookonelocal.in/cdn/BookOne.jpeg',
      this.parametertype3.image = this.images;
      this.parameterss3.push(this.parametertype3);
      this.componentstype3.parameters =this.parameterss3;
      this.components2.push(this.componentstype3);
      this.componentstype4.type= 'body',
      this.parametertype4 = new Para()
      this.parametertype4.type = 'text',
      this.parametertype4.text = this.businessUser.name ;
      this.parameterss4.push(this.parametertype4);
      this.parametertype4 = new Para();
      this.parametertype4.type = 'text',
      this.parametertype4.text = this.booking.fromDate;
      this.parameterss4.push(this.parametertype4);
      this.parametertype4 = new Para();
      this.parametertype4.type = 'text',
      this.parametertype4.text = this.booking.toDate;
      this.parameterss4.push(this.parametertype4);
      this.parametertype4 = new Para();
      this.parametertype4.type = 'text',
      this.parametertype4.text = this.booking.noOfRooms.toString();
      this.parameterss4.push(this.parametertype4);
      this.parametertype4 = new Para();
      this.parametertype4.type = 'text',
      this.parametertype4.text =  (this.booking.noOfPersons + this.booking.noOfExtraPerson).toString();
      this.parameterss4.push(this.parametertype4);
      this.parametertype4 = new Para();
      this.parametertype4.type = 'text',
      this.parametertype4.text = (this.booking.noOfChildren + this.booking.noOfExtraChild).toString();
      this.parameterss4.push(this.parametertype4);
      this.parametertype4 = new Para();
      this.parametertype4.type = 'text';
      if (this.booking.notes != null && this.booking.notes != undefined) {
        this.parametertype4.text = this.booking.notes;
      } else {
        this.parametertype4.text = "  ";
      }
      this.parameterss4.push(this.parametertype4);
      this.parametertype4 = new Para();
      this.parametertype4.type = 'text',
      this.parametertype4.text = this.booking.totalAmount.toString();
      this.parameterss4.push(this.parametertype4);
      this.parametertype4 = new Para();
      this.parametertype4.type = 'text',
      this.parametertype4.text = this.booking.totalAmount.toString();
      this.parameterss4.push(this.parametertype4);
      this.componentstype4.parameters =this.parameterss4;
      this.components2.push(this.componentstype4);
      this.template.components = this.components2;
      this.whatsappForm2.template =this.template;
      this.whatsappForm2.to =this.businessUser.mobile;
      this.whatsappForm2.type = 'template';
      this.hotelBookingService.whatsAppMsg(this.whatsappForm2).subscribe((response) => {
        this.paymentLoader = false;

      }, error => {
        this.paymentLoader = false;
      });
    }
   checkingAvailability() {
    this.hotelBookingService
      .checkAvailabilityByProperty(
        this.booking.fromDate,
        this.booking.toDate,
        this.booking.noOfRooms,
        this.booking.noOfPersons,
        this.booking.propertyId
      )
      .subscribe(
        (response) => {
          this.availableRooms = response.body.roomList;
          let facilities = this.businessUser.propertyServicesList;
          if (
            this.availableRooms !== null &&
            this.availableRooms !== undefined
          ) {
            this.availableRooms.forEach((room) => {
              room?.roomFacilities?.forEach((element) => {
                if (element.name == 'Pet Friendly') {
                  this.pet = element;
                }
              });
            });
          }
      }
      );
  }
}
