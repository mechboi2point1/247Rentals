import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyBookingHistoryComponent } from './my-profile/my-booking-history/my-booking-history.component';
import { MyDocumentsComponent } from './my-profile/my-documents/my-documents.component';
import { MyBillingsComponent } from './my-profile/my-billings/my-billings.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyClaimsComponent } from './my-profile/my-claims/my-claims.component';
import { MyPaymentsComponent } from './my-profile/my-payments/my-payments.component';
import { CustomerLanding } from './landing';
import { CustomerGaurd } from '../customer-routing-gaurd';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    VehicleDetailsComponent,
    MyProfileComponent,
    MyBookingHistoryComponent,
    MyDocumentsComponent,
    MyBillingsComponent,
    AboutusComponent,
    CheckoutComponent,
    MyClaimsComponent,
    MyPaymentsComponent,
    CustomerLanding
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ReactiveFormsModule

  ],
  providers: [CustomerGaurd, DatePipe]
})
export class LandingModule { }
