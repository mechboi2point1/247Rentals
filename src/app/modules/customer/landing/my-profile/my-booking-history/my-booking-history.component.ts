import { PublicServiceService } from 'src/app/services/public-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-booking-history',
  templateUrl: './my-booking-history.component.html',
  styleUrls: ['./my-booking-history.component.css']
})
export class MyBookingHistoryComponent implements OnInit {
  domain = environment.HOSTNAME;
  constructor(private service: PublicServiceService) { }
  @Input() booking?: any;
  error?: any;
  fetching = false;
  showDetailsFor?: any;
  ngOnInit(): void {

  }
  refresh() {
    this.fetching = true;
    this.error = '';
    this.service.getBookingDetails().subscribe(d => {
      this.booking = d.body.data;
      this.fetching = false;
    },
      e => {
        this.error = "Failed to fetch booking details"
        this.fetching = false;
      })
  }
  viewBookingDetails(data: any) {


    if (this.showDetailsFor == data.vehicle_id) {
      this.showDetailsFor = '';
    }
    else {
      this.showDetailsFor = data.vehicle_id;
    }

  }

}
