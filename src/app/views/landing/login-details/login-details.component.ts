import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { API_URL } from 'src/app/app.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TokenStorage } from 'src/token.storage';
import { LandingService } from '../landing.service';
import { Console } from 'console';
import { BusinessUser } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.css']
})
export class LoginDetailsComponent implements OnInit {
  bookings: Booking[] = [];
  bookingFilter: any;
  bookPaginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource = new MatTableDataSource();
  propertyId: number;
  @Input()
  businessUser:BusinessUser;
  

  constructor(private loginService:LandingService,
    private changeDetectorRefs: ChangeDetectorRef,
    private token: TokenStorage,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.businessUser = history.state.businessUser;
    
    this.propertyId = this.token.getProperty().id;
    this.bookingList();
  }

 
    bookingList(){
      this.bookings = [];
    this.loginService
      .getCurrentAndFutureBookings(this.propertyId)
      .subscribe((data) => {
        this.bookings = data.body;
        console.log('booking is',this.bookings);
        this.dataSource = new MatTableDataSource(this.bookings);
        this.dataSource.paginator = this.bookPaginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
      });
    }
  
}
