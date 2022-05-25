import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerloginRegisterRoutingModule } from './customerlogin-register-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    CustomerloginRegisterRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ]
})
export class CustomerloginRegisterModule { }
