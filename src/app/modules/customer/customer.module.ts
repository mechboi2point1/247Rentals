
import { CustomerloginRegisterModule } from './customerlogin-register/customerlogin-register.module';
import { LandingModule } from './landing/landing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    LandingModule,
    CustomerloginRegisterModule,

  ]
})
export class CustomerModule { }
