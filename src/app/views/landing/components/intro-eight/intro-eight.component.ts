import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-eight',
  templateUrl: './intro-eight.component.html',
  styleUrls: ['./intro-eight.component.scss']
})
export class IntroEightComponent implements OnInit {
  pageName: string;
  pageSubTitle: string;
  constructor() { }

  ngOnInit() {
    this.pageName = 'Page Name';
    this.pageSubTitle = 'This is SubTitle';
  }

}
