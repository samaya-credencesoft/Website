import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/model/booking';
import { BusinessUser } from 'src/app/model/user';
import { HotelBookingService } from 'src/services/hotel-booking.service';
import { ListingService } from 'src/services/listing.service';
import { TokenStorage } from 'src/token.storage';

@Component({
  selector: 'app-whatapp-paylater-template',
  templateUrl: './whatapp-paylater-template.component.html',
  styleUrls: ['./whatapp-paylater-template.component.css']
})
export class WhatappPaylaterTemplateComponent implements OnInit {
  bookingId: any;
  bookingdetails: any;
 booking: Booking;
 bookingRoomPrice: any;
 businessUser: BusinessUser;
 accommodationService: any;
 propertyDetails:any;
 savedServices: any;
 promocodeListChip : any[] = [];
 storedPromo: string;
 selectedPromo: any;
 PropertyUrl: string;
 copyTextOne:boolean=false;
 policies = [];
 loader: boolean;
 propertyServiceListData: any[] = [];
  propertyId: any;
  isReadMore: boolean[] = [];


  constructor(
    private acRoute: ActivatedRoute,
    private hotelbooking:HotelBookingService,
     private token: TokenStorage,
       private listingService: ListingService,
        private router: Router,

  ) {
    this.businessUser = new BusinessUser()

  }

  ngOnInit() {
    this.acRoute.queryParams.subscribe((params) => {
      console.log('params data is',params);
      if (params["bookingId"] !== undefined) {
        this.bookingId = params["bookingId"];
        console.log('business data is',this.bookingId);
      }
    });
    this.getBookingByid(this.bookingId);
  }


  async getBookingByid(bookingId:string) {


    try {
      const response = await this.hotelbooking.getBookingDetailsone(this.bookingId).toPromise();


      if (response.body) {
        this.bookingdetails = response.body;
        this.booking = this.bookingdetails.bookingDetails;
        console.log('booking is',this.booking);
        if (this.token.saveBookingRoomPrice(this.booking.roomPrice) !== null) {
          this.bookingRoomPrice = this.token.getBookingRoomPrice();
        }


       this.propertyId = this.bookingdetails.bookingDetails.propertyId;
        await this.getpropertyByid(this.bookingdetails.bookingDetails.propertyId);
      } else {


      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }


  async getpropertyByid(propertyId:number) {
    try {
      const response = await this.listingService.findByPropertyId(this.propertyId).toPromise();
      if (response.body != null) {
        this.businessUser = response.body;
        console.log('business user is',this.businessUser);
        this.calculateServiceHours();
        this.policies = this.businessUser.businessServiceDtoList.filter(
          (ele) => ele.name === 'Accommodation'
        );






        this.businessUser.propertyServicesList.forEach(ele => {


          if (ele.id != null && ele.id != undefined) {
            this.propertyServiceListData.push(ele)
          }
        });


      } else {
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }


  calculateServiceHours (){
    this.accommodationService = this.businessUser?.businessServiceDtoList.filter(service => service.name === "Accommodation");
    console.log(" this.accommodationService" + JSON.stringify( this.accommodationService))
  }


  toggleReadMore(index: number) {
    // Toggle the read more/less flag for the clicked policy
    this.isReadMore[index] = !this.isReadMore[index];
  }

}
