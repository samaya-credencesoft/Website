import { Injectable } from '@angular/core';
// import { Booking } from './model/booking';
// import { BusinessServiceTypes } from './model/businessServiceTypes';
// import { Customer } from './model/customer';
// import { DeliveryOption } from './model/deliveryOption';
// import { Payment } from './model/payment';
// import { PropertyServiceDTO } from './model/PropertyServices';
// import { Room } from './model/room';
// import { BusinessUser } from './model/user';
import { BusinessLineDTO } from './model/businessLeadsDto';
import { Address } from './model/address';
// import { PropertyServiceDTO } from './app/model/PropertyServices';
// import { Room } from './app/model/room';
import { Booking } from './app/model/booking';
// import { BusinessUser } from './app/model/user';
import { Payment } from './app/model/payment';
import { PropertyServiceDTO } from './app/model/PropertyServices';
import { BusinessUser } from './app/model/user';
import { Room } from './app/model/room';
import { Router } from "@angular/router";
import { BusinessService } from './app/model/businessService';
import { Property } from './app/model/property';
// import { String } from 'cypress/types/lodash';

const SELECTED_COUNTRY = 'selectedCountry';
const TOKEN_KEY = 'AuthToken';
const BOOKSLOTDATA = 'slotbookdata';
const CUSTOMER = 'Customer';
const SLOTDATA = 'slotdata';
const BOOKINGDATA = 'booking';
const BOOKINGCITY = 'bookingCity';
const BOOKINGREFID = 'bookingRefId';
const GETTIME = 'getTime';
const GETTOTIME = 'getToTime';
const WEBSITE_BOOKING_URL ='websitebookingURL';
const CHECK_BOOKING_ENGINE ='checkbookingengine';
const CITY = 'city';
const ORGANIZATION_ID = "OrganizationId";
const BUSINESS_SERVICE = 'businessservice';
const businessTypeGroupListDATA = 'businessTypeGroupList';
const businessTypeListDATA = 'businessTypeList';
const PROPERTY_SERVICE_DATA = 'PROPERTY_SERVICE_DATA';
const SELECTED_SERVICE_DATA = 'SELECTED_SERVICE_DATA';
const PAYMENT = 'payment';
const PAYMENT2 = 'payment2';
const ROLES = "Roles";


const ROOM_TYPES = "RoomDetails";
const PROPERTY_ID = "PropertyId";
const PROPERTY = 'property';
const ROOMSDATA = 'roomsData';
const COUNTRY = 'country';
const PROPERTY_DETAILS = 'PROPERTY_DETAILS';
const LEAD_DETAILS = 'LEAD_DETAILS';
const ADDRESS_DETAILS = 'ADDRESS_DETAILS';
const BUSINESS_PROPERTY = 'businessProperty';
const PRODUCT_CART = 'productCart';
const BUSINESSLEAD_ID ='businessLeadId'
const CURRENT_CITY = 'currentCity';
const DELIVERY_OPTION = 'delivery_option';
const LOGIN_EMAIL = 'loginemail';
const LOGIN_PASSWORD = 'loginpassword';
const USER_ID = 'UserId';
const USER_NAME = 'UserName';
const PROPERTY_URL = 'PropertyUrl';
const REQUEST_HANDLE = "requestvalue";
const BOOKINGROOMPRICE = 'bookingPrice';

@Injectable()
export class TokenStorage {
  constructor(private router: Router) {}
  public setItem(key, value) {
    value = JSON.stringify(value);
    window.sessionStorage.setItem(key, value);
    return true;
  }

  public getItem(key) {
    const value = window.sessionStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
  public getPayment2Data(): Payment {
    return JSON.parse(localStorage.getItem(PAYMENT2) as string);
  }
  public saveUserName(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(USER_NAME, token);
  }

  public savePropertyUrl(PropertyUrl: string) {
    window.sessionStorage.removeItem(PROPERTY_URL);
    window.sessionStorage.setItem(PROPERTY_URL, PropertyUrl);
  }

  public saveBusinessService(services: BusinessService[]) {
    window.sessionStorage.removeItem(BUSINESS_SERVICE);
    if (services !== null || services !== undefined) {
      window.sessionStorage.setItem(BUSINESS_SERVICE, JSON.stringify(services));
    } else {
      window.sessionStorage.setItem(BUSINESS_SERVICE, null);
    }
  }

  public saveRole(roles: string[]) {
    window.sessionStorage.removeItem(ROLES);
    window.sessionStorage.setItem(ROLES, JSON.stringify(roles));
  }
  clearAll() {
  localStorage.clear();
  }
   // PROPERTY_SERVICE_DATA
   public saveServiceData(propertyServiceDTO: PropertyServiceDTO[]) {
    localStorage.removeItem(PROPERTY_SERVICE_DATA);
      if (propertyServiceDTO !== null || propertyServiceDTO !== undefined) {
      localStorage.setItem(
          PROPERTY_SERVICE_DATA,
          JSON.stringify(propertyServiceDTO)
        );
      } else {
      localStorage.setItem(PROPERTY_SERVICE_DATA, '{}');
      }
    }

    saveSelectedServices(propertyServiceDTO: PropertyServiceDTO[]) {
      sessionStorage.setItem(SELECTED_SERVICE_DATA, JSON.stringify(propertyServiceDTO));
    }

    getSelectedServices() {
      // return JSON.parse(sessionStorage.getItem('selectedServices') );
    return JSON.parse(sessionStorage.getItem(SELECTED_SERVICE_DATA) as string);

    }

    public saveBookingRoomPrice(roomPrice: number) {
      localStorage.removeItem(BOOKINGROOMPRICE);
      if (roomPrice !== null && roomPrice !== undefined) {
        localStorage.setItem(BOOKINGROOMPRICE, roomPrice.toString());
      } else {
        localStorage.setItem(BOOKINGROOMPRICE, '{}');
      }
    }
    public getBookingRoomPrice() {
      return localStorage.getItem(BOOKINGROOMPRICE);
    }

    public getPropertyData(): BusinessUser {
      return JSON.parse(localStorage.getItem(PROPERTY) as string);
    }
    public getPaymentData(): Payment {
      return JSON.parse(localStorage.getItem(PAYMENT) as string);
    }

    public checkRequestDialog(): string {
      return JSON.parse(sessionStorage.getItem(REQUEST_HANDLE));
    }
    public getPropertyId(): string {
      return sessionStorage.getItem(PROPERTY_ID);
    }



    public getPropertyUrl(): string {
      return sessionStorage.getItem(PROPERTY_URL);
    }

  clearBusiness() {
  localStorage.removeItem(BUSINESS_SERVICE);
    // window.localStorage.removeItem(BOOKSLOTDATA);
  localStorage.removeItem(BOOKINGDATA);
  }

  clearCountry() {
  localStorage.removeItem(COUNTRY);
  }
  public getBookingData(): Booking {
    return JSON.parse(sessionStorage.getItem(BOOKINGDATA) as string);
  }
  public clearBookingData() {
    return sessionStorage.removeItem(BOOKINGDATA);
  }
  public saveProperty(property: BusinessUser) {
    localStorage.removeItem(PROPERTY_DETAILS);
      if (property !== null) {
      localStorage.setItem(PROPERTY_DETAILS, JSON.stringify(property));
      } else {
      localStorage.setItem(PROPERTY_DETAILS,  '{}');
      }
    }
  public saveCountry(Country:any) {
  localStorage.removeItem(COUNTRY);
    if (Country !== null || Country !== undefined) {
    localStorage.setItem(COUNTRY, Country);
    } else {
    localStorage.setItem(COUNTRY,  '{}');
    }
  }
  public getProperty(): BusinessUser {
    return JSON.parse(localStorage.getItem(PROPERTY_DETAILS) as string);
  }
    // Booking
    public saveBookingData(booking: Booking) {
      sessionStorage.removeItem(BOOKINGDATA);
        if (booking !== null || booking !== undefined) {
        sessionStorage.setItem(BOOKINGDATA, JSON.stringify(booking));
        } else {
        sessionStorage.setItem(BOOKINGDATA,  '{}');
        }
      }
  public saveCity(city:any) {
  localStorage.removeItem(CITY);
    if (city !== null || city !== undefined) {
    localStorage.setItem(CITY, city);
    } else {
    localStorage.setItem(CITY,  '{}');
    }
  }
  public getServiceData(): PropertyServiceDTO[] {
    return JSON.parse(localStorage.getItem(PROPERTY_SERVICE_DATA) as string);
  }
  public getCity() {
    return localStorage.getItem(CITY);
  }
  public getRoomsData(): Room[] {
    return JSON.parse(localStorage.getItem(ROOMSDATA) as string);
  }
  public getCountry() {
    return localStorage.getItem(COUNTRY);
  }

  // public getPropertyData(): BusinessUser {
  //   return JSON.parse(localStorage.getItem(PROPERTY) as string);
  // }

  // Auth
  signOut() {
  localStorage.removeItem(BOOKSLOTDATA);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(CUSTOMER);
  window.sessionStorage.removeItem(REQUEST_HANDLE);
    //window.localStorage.clear();
  }


  public saveToken(token: string) {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(){
    return localStorage.getItem(TOKEN_KEY);
  }
  public saveUserId(userId: number) {
  localStorage.removeItem(USER_ID);
  localStorage.setItem(USER_ID, userId.toString());
  }
  public getUserId() {
    return localStorage.getItem(USER_ID);
  }
  public saveLoginInfo(username: string, password: string) {
  localStorage.removeItem(LOGIN_EMAIL);
  localStorage.setItem(LOGIN_EMAIL, username);

  localStorage.removeItem(LOGIN_PASSWORD);
  localStorage.setItem(LOGIN_PASSWORD, password);
  }

  public saveLoginEmail(username: string) {
  localStorage.removeItem(LOGIN_EMAIL);
  localStorage.setItem(LOGIN_EMAIL, username);
  }

  public saveLoginPassword(password: string) {
  localStorage.removeItem(LOGIN_PASSWORD);
  localStorage.setItem(LOGIN_PASSWORD, password);
  }

  // public saveCustomer(customer: Customer) {
  // localStorage.removeItem(CUSTOMER);
  // localStorage.setItem(CUSTOMER, JSON.stringify(customer));
  // }
  // public getCustomer(): Customer {
  //   return JSON.parse(localStorage.getItem(CUSTOMER) as string);
  // }
  public clearCUSTOMER() {
    return window.localStorage.removeItem(CUSTOMER);
  }
  clearRememberMe() {
  localStorage.removeItem(LOGIN_PASSWORD);
  localStorage.removeItem(LOGIN_EMAIL);
  }

  public getLoginUserEmail() {
    return localStorage.getItem(LOGIN_EMAIL);
  }
  public getLoginPassword(){
    return localStorage.getItem(LOGIN_PASSWORD);
  }
  public getSelectedCountry() {
    return window.localStorage.getItem(SELECTED_COUNTRY);
  }

  public getUserName() {
    return localStorage.getItem(USER_NAME);
  }


  // BusinessTypeGroupList
  public saveBusinessTypeGroupListData(businessTypeGroupList:any) {
  localStorage.removeItem(businessTypeGroupListDATA);
    if (businessTypeGroupList !== null || businessTypeGroupList !== undefined) {
    localStorage.setItem(
        businessTypeGroupListDATA,
        JSON.stringify(businessTypeGroupList)
      );
    } else {
    localStorage.setItem(businessTypeGroupListDATA,  '{}');
    }
  }

  public getBusinessTypeListGroupData(): any[] {
    return JSON.parse(localStorage.getItem(businessTypeGroupListDATA)as string);
  }

  // public getProperty(): BusinessUser {
  //   return JSON.parse(localStorage.getItem(PROPERTY_DETAILS) as string);
  // }
  public getBusinessLeadId(): string {
    return JSON.parse(localStorage.getItem(BUSINESSLEAD_ID) as string);
  }
  public getLeads(): BusinessLineDTO {
    return JSON.parse(localStorage.getItem(LEAD_DETAILS) as string);
  }
  public getAdress(): Address {
    return JSON.parse(localStorage.getItem(ADDRESS_DETAILS) as string);
  }
  public saveOrganizationId(organizationId: number) {
    window.sessionStorage.removeItem(ORGANIZATION_ID);
    window.sessionStorage.setItem(ORGANIZATION_ID, organizationId.toString());
  }

  public saveRoomTypes(roomTypes: Room[]) {
    // Logger.log(roomTypes);
    window.sessionStorage.removeItem(ROOM_TYPES);
    if (roomTypes !== null || roomTypes !== undefined) {
      window.sessionStorage.setItem(ROOM_TYPES, JSON.stringify(roomTypes));
    } else {
      window.sessionStorage.setItem(ROOM_TYPES, null);
    }
  }
  public getRole(): string {
    return sessionStorage.getItem(ROLES);
  }
  public getRoomTypes(): Room[] {
    return JSON.parse(sessionStorage.getItem(ROOM_TYPES));
  }
  public savePropertyId(propertyId: number) {
    // Logger.log(`User ID Inside Token Stoarge` + propertyId);
    window.sessionStorage.removeItem(PROPERTY_ID);
    if (propertyId != null) {
      window.sessionStorage.setItem(PROPERTY_ID, propertyId.toString());
    } else {
      window.sessionStorage.setItem(PROPERTY_ID, null);
    }
  }

  // public saveProperty(property: BusinessUser) {
  // localStorage.removeItem(PROPERTY_DETAILS);
  //   if (property !== null) {
  //   localStorage.setItem(PROPERTY_DETAILS, JSON.stringify(property));
  //   } else {
  //   localStorage.setItem(PROPERTY_DETAILS,  '{}');
  //   }
  // }
  public saveLeads(businessLineDTO: BusinessLineDTO) {
    localStorage.removeItem(LEAD_DETAILS);
      if (businessLineDTO !== null) {
      localStorage.setItem(LEAD_DETAILS, JSON.stringify(businessLineDTO));
      } else {
      localStorage.setItem(LEAD_DETAILS,  '{}');
      }
    }
    public saveBusinessLeadId(BusinessLeadId: string) {
      localStorage.removeItem(BUSINESSLEAD_ID);
        if (BusinessLeadId !== null) {
        localStorage.setItem(BUSINESSLEAD_ID, JSON.stringify(BusinessLeadId));
        } else {
        localStorage.setItem(BUSINESSLEAD_ID ,  '{}');
        }
      }
    public saveAddress(address: Address) {
      localStorage.removeItem(ADDRESS_DETAILS);
        if (address !== null) {
        localStorage.setItem(ADDRESS_DETAILS, JSON.stringify(address));
        } else {
        localStorage.setItem(ADDRESS_DETAILS,  '{}');
        }
      }
  clearProperty() {
  localStorage.removeItem(PROPERTY_DETAILS);
  }
  clearAdress() {
    localStorage.removeItem(ADDRESS_DETAILS);
    }
  // BusinessTypeList
  public saveBusinessTypeListData(businessTypeList:any) {
  localStorage.removeItem(businessTypeListDATA);
    if (businessTypeList !== null || businessTypeList !== undefined) {
    localStorage.setItem(
        businessTypeListDATA,
        JSON.stringify(businessTypeList)
      );
    } else {
    localStorage.setItem(businessTypeListDATA,'{}');
    }
  }

  public getBusinessTypeListData(): any[] {
    return JSON.parse(localStorage.getItem(businessTypeListDATA) as string);
  }

  // public saveSlotData(businessServiceTypes: BusinessServiceTypes[]) {
  // localStorage.removeItem(SLOTDATA);
  //   if (businessServiceTypes !== null || businessServiceTypes !== undefined) {
  //   localStorage.setItem(
  //       SLOTDATA,
  //       JSON.stringify(businessServiceTypes)
  //     );
  //   } else {
  //   localStorage.setItem(SLOTDATA, '{}');
  //   }
  // }

  // public getSlotData(): BusinessServiceTypes[] {
  //   return JSON.parse(localStorage.getItem(SLOTDATA) as string);
  // }
  // public getServiceData(): PropertyServiceDTO[] {
  //   return JSON.parse(localStorage.getItem(PROPERTY_SERVICE_DATA) as string);
  // }

  // PROPERTY_SERVICE_DATA
  // public saveServiceData(propertyServiceDTO: PropertyServiceDTO[]) {
  // localStorage.removeItem(PROPERTY_SERVICE_DATA);
  //   if (propertyServiceDTO !== null || propertyServiceDTO !== undefined) {
  //   localStorage.setItem(
  //       PROPERTY_SERVICE_DATA,
  //       JSON.stringify(propertyServiceDTO)
  //     );
  //   } else {
  //   localStorage.setItem(PROPERTY_SERVICE_DATA, '{}');
  //   }
  // }
  // Booking
  // public saveBookingData(booking: Booking) {
  // localStorage.removeItem(BOOKINGDATA);
  //   if (booking !== null || booking !== undefined) {
  //   localStorage.setItem(BOOKINGDATA, JSON.stringify(booking));
  //   } else {
  //   localStorage.setItem(BOOKINGDATA,  '{}');
  //   }
  // }

  // public getBookingData(): Booking {
  //   return JSON.parse(localStorage.getItem(BOOKINGDATA) as string);
  // }

  clearHotelBooking() {
  localStorage.removeItem(BOOKINGDATA);
  }
  // Booking City
  public saveBookingCity(bookingCity: string) {
  localStorage.removeItem(BOOKINGCITY);
    if (bookingCity !== null || bookingCity !== undefined) {
    localStorage.setItem(BOOKINGCITY, bookingCity);
    } else {
    localStorage.setItem(BOOKINGCITY, '{}');
    }
  }

  public savePaymentRef(bookingRefId: string) {
    sessionStorage.removeItem(BOOKINGREFID);
      if (bookingRefId !== null || bookingRefId !== undefined) {
        sessionStorage.setItem(BOOKINGREFID, bookingRefId);
      } else {
        sessionStorage.setItem(BOOKINGREFID, '{}');
      }
    }
  public getBookingCity() {
    return localStorage.getItem(BOOKINGCITY);
  }
  public getPaymentRef() {
    return sessionStorage.getItem(BOOKINGREFID);
  }
  clearBookingCity() {
  localStorage.removeItem(BOOKINGCITY);
  }



       clearFromTime() {
        localStorage.removeItem(GETTIME);
        }

        clearToTime() {
          localStorage.removeItem(GETTOTIME);
          }

  public savewebsitebookingURL(websitebookingURL: string){
    localStorage.removeItem(WEBSITE_BOOKING_URL);
    if (websitebookingURL !== null || websitebookingURL !== undefined) {
    localStorage.setItem(WEBSITE_BOOKING_URL, websitebookingURL);
    } else {
    localStorage.setItem(WEBSITE_BOOKING_URL, '{}');
    }
  }
  public saveTime(getTime: string) {
    localStorage.removeItem(GETTIME);
      if (getTime !== null || getTime !== undefined) {
      localStorage.setItem(GETTIME, getTime);
      } else {
      localStorage.setItem(GETTIME, '{}');
      }
    }

    public getFromTime() {
        return localStorage.getItem(GETTIME);
       }

    public saveToTime(getToTime: string) {
      localStorage.removeItem(GETTOTIME);
        if (getToTime !== null || getToTime !== undefined) {
        localStorage.setItem(GETTOTIME, getToTime);
        } else {
        localStorage.setItem(GETTOTIME, '{}');
        }
      }

      public getToTime() {
        return localStorage.getItem(GETTOTIME);
       }



  public getwebsitebookingURL() {
    return localStorage.getItem(WEBSITE_BOOKING_URL);
  }
  public saveBookingEngineBoolean(checkbookingengine: string){
    sessionStorage.removeItem(CHECK_BOOKING_ENGINE);
    if (checkbookingengine !== null || checkbookingengine !== undefined) {
      sessionStorage.setItem(CHECK_BOOKING_ENGINE, checkbookingengine);
    } else {
      sessionStorage.setItem(CHECK_BOOKING_ENGINE, '{}');
    }
  }
  public getBookingEngineBoolean() {
    return sessionStorage.getItem(CHECK_BOOKING_ENGINE);
  }
  clearwebsitebookingURL() {
  localStorage.removeItem(WEBSITE_BOOKING_URL);
  }
  // public getRoomsData(): Room[] {
  //   return JSON.parse(localStorage.getItem(ROOMSDATA) as string);
  // }

  clearRoomsData() {
  localStorage.removeItem(ROOMSDATA);
  }
  public savePaymentData(payment:any) {
  localStorage.removeItem(PAYMENT);
    if (payment !== null || payment !== undefined) {
    localStorage.setItem(PAYMENT, JSON.stringify(payment));
    } else {
    localStorage.setItem(PAYMENT, '{}');
    }
  }

  // public getPaymentData(): Payment {
  //   return JSON.parse(localStorage.getItem(PAYMENT) as string);
  // }
  // Payment2
  public savePayment2Data(payment2:any) {
  localStorage.removeItem(PAYMENT2);
    if (payment2 !== null || payment2 !== undefined) {
    localStorage.setItem(PAYMENT2, JSON.stringify(payment2));
    } else {
    localStorage.setItem(PAYMENT2,  '{}');
    }
  }

  // public getPayment2Data(): Payment {
  //   return JSON.parse(localStorage.getItem(PAYMENT2) as string);
  // }
  // Property
  public savePropertyData(property:any) {
  localStorage.removeItem(PROPERTY);
    if (property !== null || property !== undefined) {
    localStorage.setItem(PROPERTY, JSON.stringify(property));
    } else {
    localStorage.setItem(PROPERTY,  '{}');
    }
  }

  // BusinessService
  // public saveBusinessService(businessUser: BusinessUser[]) {
  // localStorage.removeItem(BUSINESS_SERVICE);
  //   if (businessUser !== null || businessUser !== undefined) {
  //   localStorage.setItem(
  //       BUSINESS_SERVICE,
  //       JSON.stringify(businessUser)
  //     );
  //   } else {
  //   localStorage.setItem(BUSINESS_SERVICE,  '{}');
  //   }
  // }

  // public getBusinessService(): BusinessUser[] {
  //   return JSON.parse(localStorage.getItem(BUSINESS_SERVICE) as string);
  // }

   // Current City
public saveCurrentCity(currentCity: string){

localStorage.removeItem(CURRENT_CITY);
  if (currentCity !== null || currentCity !== undefined) {
  localStorage.setItem(
      CURRENT_CITY,currentCity
    )
  } else {
  localStorage.setItem(CURRENT_CITY,  '{}');
  }
}

public getCurrentCity(){
  return localStorage.getItem(CURRENT_CITY);
}

// delivery option

// public saveDeliveryOption(deliveryOption: DeliveryOption){

// localStorage.removeItem(DELIVERY_OPTION);
//   if (deliveryOption !== null || deliveryOption !== undefined) {
//   localStorage.setItem(DELIVERY_OPTION, JSON.stringify(deliveryOption));
//   } else {
//   localStorage.setItem(DELIVERY_OPTION,  '{}');
//   }
// }
public saveSelectedCountry(countryCode: string) {
  window.localStorage.setItem(SELECTED_COUNTRY, countryCode);
}

// public getDeliveryOption(): DeliveryOption {
//   return JSON.parse(localStorage.getItem(DELIVERY_OPTION) as string);
// }
}
