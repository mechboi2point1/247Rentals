import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicServiceService } from 'src/app/services/public-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUp: FormGroup;
  constructor(private fb: FormBuilder, private service: PublicServiceService, private toastr: ToastrService, private rout: Router) {
    this.signUp = this.fb.group({
      name: [, null],
      email: [, null],
      password: [, null],
      cpassword: [, null],
      gender: ['O', null],
      phone: [, null]


    });
  }

  ngOnInit(): void {
    this.service.getUseDetails().subscribe(
      res => {
        this.service.updateCustomer(res.body.data);
        this.rout.navigate(['../../app'])
      })
  }
  register() {

    if (this.signUp.invalid) {
      this.toastr.error("* Marked field are required")
    }
    else {
      this.service.registerNewUser(this.signUp.value).subscribe(

        data => {
          this.toastr.success("Thank you for Joining us.")

          localStorage.setItem("USERTOKEN", data?.body?.accessToken)
          this.service.getUseDetails().subscribe(
            res => {
              this.service.updateCustomer(res?.body?.data);
              localStorage.setItem("customerdata", JSON.stringify(res?.body?.data));
              this.signUp.reset();
              this.rout.navigate(['../../app'])

            },
            err => {
              this.toastr.error("Session lost, login again.");
              localStorage.clear();
            })


        },
        err => {

          this.toastr.error(err?.error?.data);
        }
      );
    }
  }

}
