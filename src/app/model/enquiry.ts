import { TaxDetails } from "./TaxDetails";



  export class EnquiryDto {


    enquiryId: number;
    fromEmail: string;
    toEmail: string;
    fromName: string;
    toName: string;
    bccEmail: string;
    bccName: string;
    firstName: string;
    totalAmount:number;
    bookingPropertyId:number;
    lastName: string;
    planCode:string;
    accommodationType: string;
    accountManager:string;
    consultantPerson:string;
    noOfPerson: number;
    noOfRooms: number;
    source:string;
    noOfChildren: number;
    noOfPets: number;
    location: string;
    createdDate:Date;
    country: string;
    alternativeLocation: string;
    phone: string;
    email: string;
    checkInDate: string;
    checkOutDate: string;
    foodOptions: string;
    dietaryRequirement: string;
    status: string;
    min: number;
    max: number;
    specialNotes: string;
    organisationId: number;
    propertyId : number;
    propertyName : string;
    bccEmailTo : string;
    noOfExtraPerson:number;
    roomName:string;
    extraPersonCharge:number;
    noOfExtraChild:number;
    roomPrice:number;
    externalSite:string;
    modeOfPayment:string;
    advanceAmount:number;
    mobile:string;
    roomType:string;
    roomRatePlanName:string;
    beforeTaxAmount:number;
    roomId:number;
    payableAmount:number;
    currency:string;
    taxDetails: TaxDetails[];
    address: any;
    fromTime: number;
    toTime: number;
    bookingReservationId: string;
    bookingId: number;
    // counterName:string;
  }
