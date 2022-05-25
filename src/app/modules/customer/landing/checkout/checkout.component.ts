import { PublicServiceService } from 'src/app/services/public-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @Input() vehicle: any;
  customer?: any;
  domain = environment.HOSTNAME;
  checkingAvailability = false;
  error1 = false;
  constructor(private fb: FormBuilder, private service: PublicServiceService, private datePipe: DatePipe, private toastr: ToastrService) {
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let hours: any = new Date().getHours();
    let dayLight = ' AM';
    if (hours == 0) {
      hours = 12;
    }
    if (hours > 12) {
      hours = hours - 12;
      dayLight = ' PM';

    }
    let minutes: any = new Date().getMinutes();
    let timenow = hours + ':' + minutes + dayLight;
    this.bookingRequest = this.fb.group({
      startDate: [this.todayDate, null],
      endDate: [, null],
      startTime: [timenow, null],
      endTime: [, null],
      vehicle: []




    });
    this.service.updatedCustomer.subscribe((c: any) => { this.customer = c });

  }
  todayDate: any;
  hoursOfBooking: any;
  bookingRequest: FormGroup;
  days: any = 0;
  error: any;
  ngOnInit(): void {

    this.service.updatedVehicle.subscribe((d: any) => { this.vehicle = d; console.log(d) })
    this.checkingAvailability = false;
  }
  startDate(event: any) {
    this.error = "";
    this.hoursOfBooking = ""
    if (event == this.todayDate) {
      //.log("today");
      let hours: any = new Date().getHours();
      //.log(hours);
      let minutes: any = new Date().getMinutes();
      //.log(minutes);
      var m = (((minutes + 7.5) / 15) * 15) % 60;
      var h = minutes > 30 ? (hours === 23 ? 0 : ++hours) : hours;
      //.log(h + ':' + m);
    }
    else if (event < this.todayDate) {
      this.toastr.show("Selected start date is not valid.", 'Booking Request')
      this.bookingRequest.value.startDate = this.todayDate;
    }
    else {
      //.log("Not today");
    }

    let data = this.bookingRequest.value;
    if (data.endDate != null) {
      if (data.endDate < data.startDate) {
        this.bookingRequest.patchValue({
          endDate: this.bookingRequest.value.startDate

        });
        this.days = 1;
        return;
      }

    }
    let date1: Date = new Date(data.endDate);
    let date2: Date = new Date(data.startDate);
    if (data.startDate !== null && data.endDate != null) {
      let timeInMilisec: number = date1.getTime() - date2.getTime();
      let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
      if (daysBetweenDates == 0) {
        //.log('One day booking');
        this.days = daysBetweenDates + 1;
      }
      else {

        //.log('No of days for booking' + daysBetweenDates + 1);
        this.days = daysBetweenDates + 1;
      }
    }
  }
  endDate(event: any) {
    this.error = "";
    this.hoursOfBooking = ""
    if (event < this.todayDate || event < this.bookingRequest.value.startDate) {
      this.toastr.show("Selected end date is not valid.", 'Booking Request')

      this.bookingRequest.patchValue({
        endDate: this.bookingRequest.value.startDate

      });
    }
    let data = this.bookingRequest.value;
    let date1: Date = new Date(data.endDate);
    let date2: Date = new Date(data.startDate);

    if (data.startDate !== null && data.endDate != null) {
      let timeInMilisec: number = date1.getTime() - date2.getTime();
      let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
      if (daysBetweenDates == 0) {
        //.log('One day booking');
        this.days = daysBetweenDates + 1;
      }
      else {

        //.log('No of days for booking' + daysBetweenDates + 1);
        this.days = daysBetweenDates + 1;
      }
    }

  }
  elasticSearch() {
    this.error = "";
    this.hoursOfBooking = ""
    if (this.bookingRequest.status == 'INVALID') {
      this.toastr.error("Fill all the required values.", 'Booking Request')
    }
    else {

      this.validateBookingRequest();

      this.bookingRequest.value.vehicle = this.vehicle.vehicle_id;
      console.log(this.bookingRequest.value)
      this.checkingAvailability = true;
      this.service.isVehicleAvailable(this.bookingRequest.value).subscribe(data => {
        this.checkingAvailability = false;
        console.log(data)
      }, err => {
        this.checkingAvailability = false;
        console.log(err)
        this.error1 = true;
      })

    }
  }
  disabled = true;
  validateBookingRequest() {
    this.error = ""
    this.hoursOfBooking = ""
    let timemin = (x: any) => {
      let str: number[] = x.split(":");
      console.log(str[0] + "<->" + str[1]);
      let min: any = 0;
      for (let i = 0; i <= str[0]; i++) {
        min += 60;

      }

      var y: number = +str[1];
      return min + y;
    }

    let data = this.bookingRequest.value;
    let date1: Date = new Date(data.endDate);
    let date2: Date = new Date(data.startDate);
    console.log(data.startTime);
    console.log(data.endTime);
    let timeInMilisec: number = date1.getTime() - date2.getTime();
    let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
    if (daysBetweenDates == 0) {


      if (data.startTime <= data.endTime) {
        let start = timemin(data.startTime);
        let end = timemin(data.endTime);
        console.log(end - start)
        let mindiff = end - start;
        console.log(mindiff)
        if (mindiff <= 60) {
          this.toastr.warning("You can't book vehicle for " + mindiff + " minute", 'Booking failed')
          this.error = "Book vehicle for more than 30 minutes"
          this.disabled = true;

        }
        else {
          let hourDiff = (end - start) / 60;
          var rounded = Math.round((hourDiff + Number.EPSILON) * 100) / 100;
          this.hoursOfBooking = rounded;
          this.disabled = false;
        }


      }

    }
    else {
      let start = timemin(data.startTime);
      let end = timemin(data.endTime);
      let mindiff = end - start;

      let hourDiff = (((daysBetweenDates - 1) * 1440) + mindiff) / 60;
      var rounded = Math.round((hourDiff + Number.EPSILON) * 100) / 100;
      this.hoursOfBooking -= 1;
      if (this.hoursOfBooking == 0) {
        this.hoursOfBooking = rounded;
        return;
      }
      else {
        this.hoursOfBooking = 'and ' + rounded + ' hours';
      }
      this.disabled = false;
    }


  }

}
