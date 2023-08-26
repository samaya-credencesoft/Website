import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {


  backgroundColor = 'landing-gradient-purple-indigo';
  showCustomizer = false;
  constructor( private meta:Meta) {
    this.meta.updateTag({name: 'description', content: "Escape to Bookone PMS, where modern comfort meets traditional hospitality. Experience cozy rooms, local cuisine, and a welcoming atmosphere in the heart of Bhubaneswar."});

    // Twitter metadata
    this.meta.updateTag({name: 'twitter:card', content: 'summary'});
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
