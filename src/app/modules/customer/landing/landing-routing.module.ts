import { CheckoutComponent } from './checkout/checkout.component';
import { MyPaymentsComponent } from './my-profile/my-payments/my-payments.component';
import { MyClaimsComponent } from './my-profile/my-claims/my-claims.component';
import { MyDocumentsComponent } from './my-profile/my-documents/my-documents.component';
import { MyBookingHistoryComponent } from './my-profile/my-booking-history/my-booking-history.component';
import { MyBillingsComponent } from './my-profile/my-billings/my-billings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CustomerLanding } from './landing';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGaurd } from '../customer-routing-gaurd';

const routes: Routes = [

  {
    path: "app", component: CustomerLanding, children: [
      {
        path: "fleet", component: HomeComponent
      },
      {
        path: "me", component: MyProfileComponent, canActivate: [CustomerGaurd]
      },
      {
        path: "checkout", component: CheckoutComponent, canActivate: [CustomerGaurd]
      },
      {
        path: "joinus", loadChildren: () => import('../customerlogin-register/customerlogin-register.module').then(m => m.CustomerloginRegisterModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
