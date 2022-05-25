import { PublicServiceService } from 'src/app/services/public-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private service: PublicServiceService, private rout: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      id: [, null],
      password: [, null]


    });
  }
  customer?: any;
  ngOnInit(): void {

    this.service.getUseDetails().subscribe(
      res => {
        this.service.updateCustomer(res.body.data);
        this.rout.navigate(['../../../'])
      }, err => {
        localStorage.clear();
        localStorage.clear();
        this.service.updateCustomer(null);

      })

  }
  loginNow() {
    this.service.login(this.loginForm.value).subscribe(res => {
      console.log(res)
      localStorage.setItem("USERTOKEN", res?.body?.accessToken)

      this.service.getUseDetails().subscribe(
        res => {

          this.service.updateCustomer(res.body.data);
          localStorage.setItem("customerdata", JSON.stringify(res?.body?.data));
          this.loginForm.reset();
          this.rout.navigate(['../../../'])

        },
        err => {
          console.log(err)
          this.toastr.error("Session expiered, login again.");
          localStorage.clear();
        })


    }, err => {
      if (err?.error?.data) {
        this.toastr.error(err?.error?.data);
      }
      else {
        this.toastr.error('Something went wrong. Please try again.');
      }
    })
  }

}
