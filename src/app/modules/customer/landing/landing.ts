import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { PublicServiceService } from "src/app/services/public-service.service";

@Component({
  selector: 'customer-home',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']


})
export class CustomerLanding implements OnInit {
  constructor(private service: PublicServiceService, private rout: Router) {

  }
  isloggedin = false;
  customer: any = this.getCustomer();
  ngOnInit(): void {

    this.getCustomer();
    this.service.getUseDetails().subscribe(
      res => {
        this.service.updateCustomer(res.body.data);
        this.service.updatedCustomer.subscribe((c: any) => { this.customer = c });


      },
      err => {

      })

  }
  sideNavWidth = "width:0px";
  openNav() {
    this.sideNavWidth = "width:350px";
  }
  inverse() {
    console.log('c')
    if (this.sideNavWidth == "width:0px") {
      this.openNav();
    }
    else {
      this.closeNav();
    }
  }
  closeNav() {
    this.sideNavWidth = "width:0px";
  }
  isLoggedIn(): Boolean {
    let name = this.customer?.name

    if (name == undefined) {
      return false;
    }
    if (name.length > 0) {
      return true;
    }
    return false;

  }
  logout() {

    localStorage.clear();
    localStorage.clear();
    this.service.updateCustomer(null);
    this.rout.navigate(['../../../'])


  }
  getCustomer() {
    this.service.updatedCustomer.subscribe((c: any) => {
      this.customer = c;

    });

  }

}
