
export interface CountryListInterFace {
  value: string;
  viewValue: string;
  countryCode:string;
}

export class CountryList {

  countries: CountryListInterFace[] = [
    { value: 'New Zeland', viewValue: 'New Zeland',countryCode:'+64' },
    { value: 'India', viewValue: 'India' , countryCode :'+91'},
    { value: 'Africa', viewValue: 'Africa',countryCode:'+236' },
    { value: 'Austrilia', viewValue: 'Austrilia', countryCode :'+61' },
    { value: 'Bangladesh', viewValue: 'Bangladesh' ,countryCode:'+88' },
    { value: 'United Kingdom', viewValue: 'United Kingdom' ,countryCode:'+44'},
  ];


  constructor() {
   }
}
