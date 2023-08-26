import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {


  pagename = 'Pricing';
  backgroundColor = 'landing-gradient-purple-indigo';
  showCustomizer = false;
  constructor(private meta:Meta) {
    this.meta.updateTag({name: 'description', content: "Indulge in a remarkable stay at BookOne PMS where exceptional comfort meets affordability."});

    // Twitter metadata
    this.meta.updateTag({name: 'twitter:card', content: 'subha'});
    this.meta.updateTag({name: 'twitter:site', content: '@AngularUniv'});
    this.meta.updateTag({name: 'twitter:title', content: "dfghjkl"});
    this.meta.updateTag({name: 'twitter:description', content: "dfghjkl"});
    this.meta.updateTag({name: 'twitter:text:description', content:"dfghjkl"});
    this.meta.updateTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200'});
  }

  ngOnInit() {

  }

  changeBg(colorName) {
    this.backgroundColor = 'landing-' + colorName;
  }
  toggleCustomizer() {
    this.showCustomizer = !this.showCustomizer;

  }

}
