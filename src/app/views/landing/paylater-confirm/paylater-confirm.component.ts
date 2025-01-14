import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/model/booking';
import { BusinessOfferDto } from 'src/app/model/businessOfferDto';
import { Components } from 'src/app/model/components';
import { externalReservationDtoList } from 'src/app/model/externalReservation';
import { Images } from 'src/app/model/image';
import { Language } from 'src/app/model/language';
import { Para } from 'src/app/model/parameters';
import { Template } from 'src/app/model/template';
import { BusinessUser } from 'src/app/model/user';
import { WhatsappDto } from 'src/app/model/whatsappDto';
import { HotelBookingService } from 'src/services/hotel-booking.service';
import { ListingService } from 'src/services/listing.service';
import { TokenStorage } from 'src/token.storage';

@Component({
  selector: 'app-paylater-confirm',
  templateUrl: './paylater-confirm.component.html',
  styleUrls: ['./paylater-confirm.component.scss']
})
export class PaylaterConfirmComponent {
propertyDetails: any;
booking:any;
promocodeListChip : any[] = []; // Used for handled to get the promo list and stored in this variable.
textToCopy: string = 'This is some text to copy';
textToCopyOne: string = 'This is some text to copy';


savedServices: any;
  currency: any;
  businessOfferDto: BusinessOfferDto;
  showMore:boolean  =false
  storedPromo: string;
  selectedPromo: any;
  accommodationCheckInTime: any;
  accommodationService: any;
  bookingone:Booking;
  copyTextOne:boolean=false;
   businessUser: BusinessUser;
  isReadMore: boolean[] = [];
  policies = [];
  loader: boolean;
  PropertyUrl: string;
  propertyServiceListData: any[] = [];
  whatsappForm:WhatsappDto;
    template :Template;
    language:Language;
    componentstype:Components;
    parametertype:Para;
    images:Images;
    parameterss:Para[];
    parameterss1:Para[];
    components:Components[];
    componentstype2:Components;
    componentstype9:Components;
    componentstype10:Components;
    parametertype2:Para;
    parametertype20:Para;
    parametertype8:Para;
    parametertype3:Para;
    parameterss2:Para[];
    parameterss3:Para[];
    parameterss5:Para[];
    parameterss15:Para[];
    bookingId: number;
    referenceNumber: number;
     externalReservationDtoList:externalReservationDtoList[];
     paymentLoader: boolean;

constructor(private token :TokenStorage,
      private hotelBookingService: HotelBookingService,
      private listingService: ListingService,
      private router: Router,
){
      this.businessOfferDto = new BusinessOfferDto();
this.businessUser = new BusinessUser();
this.whatsappForm = new WhatsappDto();
    this.template =new Template();
    this.language = new Language();
    this.componentstype = new Components();
    this.parametertype = new Para();
    this.images = new Images();
    this.componentstype2 = new Components();
    this.componentstype9 = new Components();
    this.parametertype2 = new Para();
    this.parametertype20 = new Para();
    this.parametertype3 = new Para()
    this.componentstype9 = new Components();
    this.componentstype10 = new Components();
    this.parameterss2 =[];
    this.parameterss3 = [];
    this.parameterss15 = [];
    this.externalReservationDtoList =[];
    this.components = [];
    this.parameterss =[];
    this.parameterss1 = [];

this.PropertyUrl = this.token.getPropertyUrl();
  this.propertyDetails = this.token.getProperty();
 this.bookingone = this.token.getBookingData();
 this.booking = this.token.getBookingDataObj();
 this.savedServices = this.token.getSelectedServices();
 this.currency = this.propertyDetails.localCurrency.toUpperCase();
 this.storedPromo = localStorage.getItem('selectPromo');
 if(this.storedPromo == 'true'){
  const selectedPromoData = JSON.parse( localStorage.getItem('selectedPromoData'));
  this.selectedPromo = selectedPromoData
  // this.businessOfferDto = selectedPromoData
console.log(selectedPromoData)
}else{
  this.getOfferDetails();
}

this.calculateServiceHours();
this.isReadMore = this.policies.map(() => false);
if (this.booking?.propertyId != null && this.booking?.propertyId != undefined) {
  this.getPropertyDetailsById(this.booking.propertyId);
console.log("this.booking.proprtyId", this.booking.propertyId)
}
}

ngOnInIt(){


}
calculateServiceHours (){
  this.accommodationService = this.propertyDetails.businessServiceDtoList.filter(service => service.name === "Accommodation");
  console.log(" this.accommodationService" + JSON.stringify( this.accommodationService))
}

async getPropertyDetailsById(id: number) {
  // debugger
  // this.token.saveBookingEngineBoolean('googlehotelcenter')

  // //console.log("id isequal to" + id)
  try {
    const data = await this.listingService?.findByPropertyId(id).toPromise();
    if (data.status === 200) {
      this.businessUser = data.body;
      this.policies = this.businessUser.businessServiceDtoList.filter(
        (ele) => ele.name === 'Accommodation'
      );



      this.businessUser.propertyServicesList.forEach(ele => {

        if (ele.id != null && ele.id != undefined) {
          this.propertyServiceListData.push(ele)
        }
      });

    } else {
      this.router.navigate(["/404"]);
    }
  } catch (error) {
    this.loader = false;
    // Handle the error appropriately, if needed.
  }
}
toggleReadMore(index: number) {
  // Toggle the read more/less flag for the clicked policy
  this.isReadMore[index] = !this.isReadMore[index];
}

copyText() {

  // Find the element
  const textToCopy = document.getElementById('textToCopy')?.innerText.trim();

  if (textToCopy) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    // Add to the document body
    document.body.appendChild(textarea);

    // Select and copy the content
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea element
    document.body.removeChild(textarea);

    // Notify the user
    // alert('Enquiry ID copied to clipboard!');
    this.copyTextOne = true;
    setTimeout(() => {
      this.copyTextOne = false;
    }, 1000);
  } else {
    // alert('Failed to copy text.');
    this.copyTextOne = false;
  }
}
copyTextone() {

  // Find the element
  const textToCopyOne = document.getElementById('textToCopyOne')?.innerText.trim();

  if (textToCopyOne) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = textToCopyOne;

    // Add to the document body
    document.body.appendChild(textarea);

    // Select and copy the content
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea element
    document.body.removeChild(textarea);

    // Notify the user
    // alert('Enquiry ID copied to clipboard!');
    this.copyTextOne = true;
    setTimeout(() => {
      this.copyTextOne = false;
    }, 1000);
  } else {
    // alert('Failed to copy text.');
    this.copyTextOne = false;
  }
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

           sendWhatsappMessageToTHM(){
              this.whatsappForm.messaging_product = 'whatsapp';
              this.whatsappForm.recipient_type ='individual';
              this.template.name = "";
              this.template.name = "uat_bookone_booking_confirm";
              this.language.code = 'en',
              this.template.language = this.language;
              this.componentstype.type= 'header',
              this.parametertype.type = 'text',
              this.parametertype.text = this.booking.businessName;
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
              this.parametertype2.text = String(this.bookingId);
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = this.booking.fromDate;
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = " ";
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = this.booking.toDate;
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = " ";
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text';
              this.parametertype2.text = " ";
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text';
              this.parametertype2.text = this.booking.roomName;
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text';
              this.parametertype2.text = String(this.booking.noOfPersons);
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text';
              this.parametertype2.text = String(this.booking.noOfChildren);
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = this.booking.totalAmount.toString();
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = String(this.booking.advanceAmount);
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = "support@thehotelmate.com";
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = " ";
              this.parameterss2.push(this.parametertype2);


              this.componentstype2.parameters =this.parameterss2;
              this.components.push(this.componentstype2);

              this.componentstype9.index = '0';
              this.componentstype9.sub_type = "url";
              this.componentstype9.type = "button";

              this.parametertype20 = new Para();
              this.parametertype20.type = 'text',
              this.parametertype20.text = "https://uat.bookone.io/booking-confirmation-page?ReferenceNumber" + this.referenceNumber;
              this.parameterss15.push(this.parametertype20);
              this.componentstype9.parameters = this.parameterss15;
              this.components.push(this.componentstype9);


              this.template.components = this.components;
              this.whatsappForm.template =this.template;
              this.whatsappForm.to = "9337930186",
              this.whatsappForm.type = 'template',
                this.hotelBookingService.whatsAppMsg(this.whatsappForm).subscribe((response) => {
                  this.paymentLoader = false;

                }, error => {
                  this.paymentLoader = false;
                });
              }

              sendWhatsappMessageToTHM1(){
                this.whatsappForm = new WhatsappDto();
                this.template =new Template();
                this.language = new Language();
                this.componentstype = new Components();
                this.parametertype = new Para();
                this.images = new Images();
                this.componentstype2 = new Components();
                this.componentstype9 = new Components();
                this.parametertype2 = new Para();
                this.parametertype20 = new Para();
                this.parametertype3 = new Para()
                this.componentstype9 = new Components();
                this.componentstype10 = new Components();
                this.parameterss2 =[];
                this.parameterss3 = [];
                this.parameterss15 = [];
                this.components = [];
                this.parameterss =[];
                this.parameterss1 = [];

                this.whatsappForm.messaging_product = 'whatsapp';
                this.whatsappForm.recipient_type ='individual';
                this.template.name = "";
                this.template.name = "uat_bookone_booking_confirm";
                this.language.code = 'en',
                this.template.language = this.language;
                this.componentstype.type= 'header',
                this.parametertype.type = 'text',
                this.parametertype.text = this.booking.businessName;
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
                this.parametertype2.text = String(this.bookingId);
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text',
                this.parametertype2.text = this.booking.fromDate;
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text',
                this.parametertype2.text = " ";
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text',
                this.parametertype2.text = this.booking.toDate;
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text',
                this.parametertype2.text = " ";
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text';
                this.parametertype2.text = " ";
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text';
                this.parametertype2.text = this.booking.roomName;
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text';
                this.parametertype2.text = String(this.booking.noOfPersons);
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text';
                this.parametertype2.text = String(this.booking.noOfChildren);
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text',
                this.parametertype2.text = this.booking.totalAmount.toString();
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
                this.parametertype2.type = 'text',

                this.parametertype2.text = (this.booking.advanceAmount.toString());
                this.parameterss2.push(this.parametertype2);

                this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = "support@thehotelmate.com";
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = " ";
              this.parameterss2.push(this.parametertype2);


                this.componentstype2.parameters =this.parameterss2;
                this.components.push(this.componentstype2);

                this.componentstype9.index = '0';
                this.componentstype9.sub_type = "url";
                this.componentstype9.type = "button";

                this.parametertype20 = new Para();
                this.parametertype20.type = 'text',
                this.parametertype20.text = "https://uat.bookone.io/booking-confirmation-page?ReferenceNumber"+ this.referenceNumber;
                this.parameterss15.push(this.parametertype20);
                this.componentstype9.parameters = this.parameterss15;
                this.components.push(this.componentstype9);


                this.template.components = this.components;
                this.whatsappForm.template =this.template;
                this.whatsappForm.to = "6372198255",
                this.whatsappForm.type = 'template',
                  this.hotelBookingService.whatsAppMsg(this.whatsappForm).subscribe((response) => {
                    this.paymentLoader = false;

                  }, error => {
                    this.paymentLoader = false;
                  });
                }

                sendWhatsappMessageToTHM2(){
                  this.whatsappForm = new WhatsappDto();
                this.template =new Template();
                this.language = new Language();
                this.componentstype = new Components();
                this.parametertype = new Para();
                this.images = new Images();
                this.componentstype2 = new Components();
                this.componentstype9 = new Components();
                this.parametertype2 = new Para();
                this.parametertype20 = new Para();
                this.parametertype3 = new Para()
                this.componentstype9 = new Components();
                this.componentstype10 = new Components();
                this.parameterss2 =[];
                this.parameterss3 = [];
                this.parameterss15 = [];
                this.components = [];
                this.parameterss =[];
                this.parameterss1 = [];

                  this.whatsappForm.messaging_product = 'whatsapp';
                  this.whatsappForm.recipient_type ='individual';
                  this.template.name = "";
                  this.template.name = "uat_bookone_booking_confirm";
                  this.language.code = 'en',
                  this.template.language = this.language;
                  this.componentstype.type= 'header',
                  this.parametertype.type = 'text',
                  this.parametertype.text = this.booking.businessName;
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
                  this.parametertype2.text = String(this.bookingId);
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text',
                  this.parametertype2.text = this.booking.fromDate;
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text',
                  this.parametertype2.text = " ";
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text',
                  this.parametertype2.text = this.booking.toDate;
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text',
                  this.parametertype2.text = " ";
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text';
                  this.parametertype2.text = " ";
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text';
                  this.parametertype2.text = this.booking.roomName;
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text';
                  this.parametertype2.text = String(this.booking.noOfPersons);
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text';
                  this.parametertype2.text = String(this.booking.noOfChildren);
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text',
                  this.parametertype2.text = this.booking.totalAmount.toString();
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
                  this.parametertype2.type = 'text',

                  this.parametertype2.text = (this.booking.advanceAmount.toString());
                  this.parameterss2.push(this.parametertype2);

                  this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = "support@thehotelmate.com";
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = " ";
              this.parameterss2.push(this.parametertype2);


                  this.componentstype2.parameters =this.parameterss2;
                  this.components.push(this.componentstype2);

                  this.componentstype9.index = '0';
                  this.componentstype9.sub_type = "url";
                  this.componentstype9.type = "button";

                  this.parametertype20 = new Para();
                  this.parametertype20.type = 'text',
                  this.parametertype20.text = "https://uat.bookone.io/booking-confirmation-page?ReferenceNumber"+ this.referenceNumber;
                  this.parameterss15.push(this.parametertype20);
                  this.componentstype9.parameters = this.parameterss15;
                  this.components.push(this.componentstype9);


                  this.template.components = this.components;
                  this.whatsappForm.template =this.template;
                  this.whatsappForm.to = "9777141738",
                  this.whatsappForm.type = 'template',
                    this.hotelBookingService.whatsAppMsg(this.whatsappForm).subscribe((response) => {
                      this.paymentLoader = false;

                    }, error => {
                      this.paymentLoader = false;
                    });
                  }

                  sendWhatsappMessageToTHM3(){
                    this.whatsappForm = new WhatsappDto();
                this.template =new Template();
                this.language = new Language();
                this.componentstype = new Components();
                this.parametertype = new Para();
                this.images = new Images();
                this.componentstype2 = new Components();
                this.componentstype9 = new Components();
                this.parametertype2 = new Para();
                this.parametertype20 = new Para();
                this.parametertype3 = new Para()
                this.componentstype9 = new Components();
                this.componentstype10 = new Components();
                this.parameterss2 =[];
                this.parameterss3 = [];
                this.parameterss15 = [];
                this.components = [];
                this.parameterss =[];
                this.parameterss1 = [];

                    this.whatsappForm.messaging_product = 'whatsapp';
                    this.whatsappForm.recipient_type ='individual';
                    this.template.name = "";
                    this.template.name = "uat_bookone_booking_confirm";
                    this.language.code = 'en',
                    this.template.language = this.language;
                    this.componentstype.type= 'header',
                    this.parametertype.type = 'text',
                    this.parametertype.text = this.booking.businessName;
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
                    this.parametertype2.text = String(this.bookingId);
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text',
                    this.parametertype2.text = this.booking.fromDate;
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text',
                    this.parametertype2.text = " ";
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text',
                    this.parametertype2.text = this.booking.toDate;
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text',
                    this.parametertype2.text = " ";
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text';
                    this.parametertype2.text = " ";
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text';
                    this.parametertype2.text = this.booking.roomName;
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text';
                    this.parametertype2.text = String(this.booking.noOfPersons);
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text';
                    this.parametertype2.text = String(this.booking.noOfChildren);
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text',
                    this.parametertype2.text = this.booking.totalAmount.toString();
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
                    this.parametertype2.type = 'text',

                    this.parametertype2.text = (this.booking.advanceAmount.toString());
                    this.parameterss2.push(this.parametertype2);

                    this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = "support@thehotelmate.com";
              this.parameterss2.push(this.parametertype2);

              this.parametertype2 = new Para();
              this.parametertype2.type = 'text',
              this.parametertype2.text = " ";
              this.parameterss2.push(this.parametertype2);


                    this.componentstype2.parameters =this.parameterss2;
                    this.components.push(this.componentstype2);

                    this.componentstype9.index = '0';
                    this.componentstype9.sub_type = "url";
                    this.componentstype9.type = "button";

                    this.parametertype20 = new Para();
                    this.parametertype20.type = 'text',
                    this.parametertype20.text = "https://uat.bookone.io/booking-confirmation-page?ReferenceNumber"+ this.referenceNumber;
                    this.parameterss15.push(this.parametertype20);
                    this.componentstype9.parameters = this.parameterss15;
                    this.components.push(this.componentstype9);


                    this.template.components = this.components;
                    this.whatsappForm.template =this.template;
                    this.whatsappForm.to = "9040785705",
                    this.whatsappForm.type = 'template',
                      this.hotelBookingService.whatsAppMsg(this.whatsappForm).subscribe((response) => {
                        this.paymentLoader = false;

                      }, error => {
                        this.paymentLoader = false;
                      });
                    }

}
