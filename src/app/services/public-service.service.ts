import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {
  isUserAurthorised() {
    let uri = environment.operationverification;
    return this.httpClient.get<any>(uri, { headers: this.getHeader() });
  }


  constructor(private httpClient: HttpClient) { }
  getHeader() {
    const headers = new HttpHeaders()

      .set('apptoken', environment.apptoken)
      .set('USERTOKEN', localStorage.getItem("USERTOKEN") || 'userinvalidtoken')
    return headers;
  }

  getAllTwoWheelersActive(): Observable<HttpResponse<any>> {
    let uri = environment.twowheelers;
    return this.httpClient.get<any>(uri, { headers: this.getHeader(), observe: 'response' });

  }
  getAllFourWheelersActive(): Observable<HttpResponse<any>> {
    let uri = environment.fourwheelers;
    return this.httpClient.get<any>(uri, { headers: this.getHeader(), observe: 'response' });
  }
  registerNewUser(form: any): Observable<HttpResponse<any>> {
    let uri = environment.register;
    return this.httpClient.post<any>(uri, form, { headers: this.getHeader(), observe: 'response' });

  }
  private customer: any = new BehaviorSubject<any[]>(localStorage.getItem("customerdata") == null ? [] : JSON.parse(localStorage.getItem("customerdata") || '{}'));
  updatedCustomer = this.customer.asObservable();
  updateCustomer(customer: any) {
    this.customer.next(customer)
  }
  getUseDetails(): Observable<HttpResponse<any>> {
    let uri = environment.user;
    return this.httpClient.get<any>(uri, { headers: this.getHeader(), observe: 'response' });
  }
  login(form: any): Observable<HttpResponse<any>> {
    let uri = environment.login;
    return this.httpClient.post<any>(uri, form, { headers: this.getHeader(), observe: 'response' });

  }
  getMyDocuments(): Observable<HttpResponse<any>> {
    let uri = environment.document;
    return this.httpClient.get<any>(uri, { headers: this.getHeader(), observe: 'response' });

  }
  private selectedVehicle: any = new BehaviorSubject<any[]>(localStorage.getItem("selectedvehicle") == null ? [] : JSON.parse(localStorage.getItem("selectedvehicle") || '{}'));
  updatedVehicle = this.selectedVehicle.asObservable();
  updateVehicle(data: any) {
    localStorage.setItem("selectedvehicle", JSON.stringify(data));
    this.selectedVehicle.next(data)
  }
  getBookingDetails(): Observable<HttpResponse<any>> {
    let uri = environment.booking;
    return this.httpClient.get<any>(uri, { headers: this.getHeader(), observe: 'response' });
  }
  isVehicleAvailable(data: any): Observable<any> {
    let uri = environment.isVehicleAvailable;
    return this.httpClient.post<any>(uri, data, { headers: this.getHeader(), observe: 'response' });
  }
  logoutall(): Observable<HttpResponse<any>> {
    let uri = environment.logoutall;
    return this.httpClient.get<any>(uri, { headers: this.getHeader(), observe: 'response' });

  }
  logoutthis(): Observable<HttpResponse<any>> {
    let uri = environment.logoutthis;
    return this.httpClient.get<any>(uri, { headers: this.getHeader(), observe: 'response' });

  }
  getDP(): Observable<any> {
    let uri = environment.dp;
    return this.httpClient.get<any>(uri, {
      headers: this.getHeader(),
      observe: 'response'
    });

  }
  updateImage(form: any): Observable<any> {
    let uri = environment.dpUpdate;
    return this.httpClient.post<any>(uri, form, {
      headers: this.getHeader(),
      observe: 'response'
    });
  }
}
