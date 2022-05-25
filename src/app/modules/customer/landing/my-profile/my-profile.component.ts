import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicServiceService } from "src/app/services/public-service.service";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private service: PublicServiceService, private rout: Router, private sanitizer: DomSanitizer) {

  }
  customer!: any;
  view: string = 'profile';
  currentOrder?: any;
  drivingLicence?: any;
  aadhar?: any;
  fetchingDocuments = false;
  booking?: any;
  dp?: any = 'data:image/jpeg;base64,';
  ngOnInit(): void {
    this.service.getUseDetails().subscribe(
      res => {
        this.service.updateCustomer(res.body.data);
        this.service.updatedCustomer.subscribe((c: any) => { this.customer = c });
        this.service.getDP().subscribe(response => {
          console.log(response)
          this.dp += response.body.data;

        })
        this.service.getBookingDetails().subscribe(d => {
          this.booking = d.body.data;
          console.log(d.body)

        },
          e => {

          })
      },
      err => {
        localStorage.clear();
        localStorage.clear();
        this.service.updateCustomer(null);
        this.rout.navigate(['../../../'])
      })
    this.fetchingDocuments = true;
    this.service.getMyDocuments().subscribe(d => {
      console.log("data for doc");
      console.log(d); this.aadhar = d.body.data.aadhar;
      this.fetchingDocuments = false;
    }, e => { console.log(e); this.fetchingDocuments = false; });

  }
  changeView(view: string) {
    this.view = view;
  }

}
