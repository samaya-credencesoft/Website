import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessUser } from 'src/app/model/user';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {
  @Input()
  businessUser:BusinessUser;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
