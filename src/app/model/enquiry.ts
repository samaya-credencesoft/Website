import { TaxDetails } from "./TaxDetails";

export class EnquiryDto {


  enquiryId: number;
  fromEmail: string;
  toEmail: string;
  fromName: string;
  toName: string;
  source:string;
  bccEmail: string;
  bccName: string;
  firstName: string;
  bookingPropertyId:number;
  lastName: string;
  accommodationType: string;
  accountManager:string;
  consultantPerson:string;
  noOfPerson: number;
  noOfRooms: number;
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
  currency:string;
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
  taxDetails:TaxDetails[];
  // counterName:string;
}
