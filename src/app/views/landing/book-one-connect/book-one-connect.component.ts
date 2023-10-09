import { Component } from '@angular/core';

@Component({
  selector: 'app-book-one-connect',
  templateUrl: './book-one-connect.component.html',
  styleUrls: ['./book-one-connect.component.scss']
})
export class BookOneConnectComponent {
  backgroundColor: string;
  showCustomizer: boolean;
  ngOnInit() {
  }

  changeBg(colorName) {
    this.backgroundColor = 'landing-' + colorName;
  }
  toggleCustomizer() {
    this.showCustomizer = !this.showCustomizer;

  }

}
