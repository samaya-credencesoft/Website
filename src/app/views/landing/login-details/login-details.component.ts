import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { API_URL } from 'src/app/app.component';
import { TokenStorage } from 'src/token.storage';
import { LandingService } from '../landing.service';
import { Console } from 'console';
import { BusinessUser } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { MatTable , MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.css']
})
export class LoginDetailsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) itemTable: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  bookings: Booking[] = [];
  bookingFilter: any;
  bookPaginator: MatPaginator;
  isOrgAdmin:boolean = false;
  
  dataSource = new MatTableDataSource();
  propertyId: number;
  @Input()
  businessUser:BusinessUser;
  


  

  constructor(private loginService:LandingService,
    private changeDetectorRefs: ChangeDetectorRef,
    private token: TokenStorage,
    private route: ActivatedRoute,
  ) { }

  externalSites:any[] = [
    {"externalSiteName":"The Hotel Mate","logo":"https://bookonelocal.in/cdn/2023-12-12-111128535-The_Hotel_Mate_Logo (2).png"}
  ]

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
        this.bookings.forEach((booking) => {
        console.log('booking is',this.bookings);
        });
        this.dataSource = new MatTableDataSource(this.bookings);
        this.dataSource.paginator = this.bookPaginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
      });
    }

    
  
}
