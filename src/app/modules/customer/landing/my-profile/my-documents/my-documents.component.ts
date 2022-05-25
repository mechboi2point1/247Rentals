import { PublicServiceService } from 'src/app/services/public-service.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent implements OnInit {
  @Input() customer: any;
  constructor(private service: PublicServiceService, private rout: Router, private toastr: ToastrService) { }
  @Input() currentOrder?: any;
  @Input() drivingLicence?: any;
  @Input() aadhar?: any;
  @Input() fetchingDocuments = false;
  @Input() dp: any;
  style = "display:none";
  ngOnInit(): void {

  }
  openForm() {
    this.style = "display:block";
  }
  closeForm() {
    this.style = "display: none;";
  }
  public frontDlimagePath?: any;
  frontDlimgURL: any;
  public backDlimagePath?: any;
  backDlimgURL: any;
  public message?: string;

  previewFronDL(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.frontDlimagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.frontDlimgURL = reader.result;
    }
  }
  previewBackDL(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.backDlimagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.backDlimgURL = reader.result;
    }
  }

  frontAadharimagePath?: any;
  frontAadharimgURL?: any;
  backAadharimagePath?: any;
  backAadharimgURL?: any;
  previewFronAadhar(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.frontAadharimagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.frontAadharimgURL = reader.result;
    }
  }
  previewBackAadhar(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.backAadharimagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.backAadharimgURL = reader.result;
    }
  }
  updateAdhaar() {

  }
  logoutthisdevice() {
    this.service.logoutthis().subscribe(d => {
      console.log(d);
      localStorage.clear();
      localStorage.clear();
      this.service.updateCustomer(null);
      this.rout.navigate(['../../../'])
    }, err => {
      console.log(err);
    });


  }
  logoutalldevice() {
    this.service.logoutall().subscribe(d => {
      console.log(d);
      localStorage.clear();
      localStorage.clear();
      this.service.updateCustomer(null);
      this.rout.navigate(['../../../'])
    }, err => {
      console.log(err);
    });;

  }
  dpPath?: any;
  previewDP(event: any) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.handleInputChange(file);

  }
  dpImageBase64?: any;
  handleInputChange(files: any) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();

    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);

    this.dpImageBase64 = base64result;
    this.dp = this.dpImageBase64;
    let form = {
      'blob': this.dpImageBase64
    }
    this.service.updateImage(form).subscribe(res => { this.toastr.success(res?.body?.data); this.dp = 'data:image/jpeg;base64,' + this.dpImageBase64 }, err => { this.toastr.show('Could not upload you profile pic') });
  }
  submitFronDL(files: any) {

  }
  submitBackDL(files: any) {

  }


  submitFronAadhar(files: any) {

  }
  submitBackAadhar(files: any) {

  }
  handleInputChangeDoc(files: any) {
    var file = files;

    var reader = new FileReader();

    reader.onloadend = this._handleReaderLoadedDoc.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoadedDoc(e: any) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);

  }


}
