import { environment } from 'src/environments/environment';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PublicServiceService } from 'src/app/services/public-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bikeList?: any[] = [];
  carList?: any[] = [];
  domain = environment.HOSTNAME;
  checkout = false;
  selectedVehicle?: any;
  constructor(private service: PublicServiceService, private toastr: ToastrService, private rout: Router) {

  }
  innerWidth: any;
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.service.getAllTwoWheelersActive().subscribe(d => { this.bikeList = d.body.data; })
    this.service.getAllFourWheelersActive().subscribe(d => { this.carList = d.body.data })
  }
  showDetailsFor = '';
  viewVehicleDetails(data: any) {


    if (this.showDetailsFor == data.vehicle_id) {
      this.showDetailsFor = '';
    }
    else {
      this.showDetailsFor = data.vehicle_id;
    }

  }

  bookMyVehicleTwo(vehicle: any) {
    this.service.updateVehicle(vehicle);
    let x = this.rout.navigate(['app/checkout']);
    //.log(x)
    x.then(z => {
      if (z == false) {

        let x = this.rout.navigate(['app/joinus/login']);
      }
    })

  }

  bookMyVehicleFour(vehicle: any) {
    this.service.updateVehicle(vehicle);
    let x = this.rout.navigate(['app/checkout']);
    //.log(x)
    x.then(z => {
      if (z == false) {

        let x = this.rout.navigate(['app/joinus/login']);
      }
    })

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

  }

}
