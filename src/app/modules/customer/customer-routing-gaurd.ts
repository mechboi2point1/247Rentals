

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";

import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PublicServiceService } from "src/app/services/public-service.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerGaurd implements CanActivate {

  constructor(private route: Router, private service: PublicServiceService, private router: Router, private toastr: ToastrService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.service.isUserAurthorised().pipe(map((response: any) => {

      if (response) {

        return true;
      }


      localStorage.clear();
      this.service.updateCustomer(null);
      this.router.navigate(['../../../'])
      this.toastr.warning("Login Required")
      return false;
    }), catchError((error) => {
      this.toastr.warning("Login Required")
      this.service.updateCustomer(null);
      localStorage.clear();
      this.router.navigate(['../../../']);
      return of(false);
    }));
  }
}
