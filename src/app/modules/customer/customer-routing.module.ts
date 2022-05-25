import { CustomerLanding } from './landing/landing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: 'app/fleet', pathMatch: 'full' },
  { path: "app", redirectTo: 'app/fleet', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
