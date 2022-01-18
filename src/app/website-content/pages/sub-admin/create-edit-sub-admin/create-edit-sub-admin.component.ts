import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {
  ConfigurationOptions,
  CustomCountryModel,
  SortOrderEnum,
  OutputOptionsEnum
} from 'intl-input-phone';
@Component({
  selector: 'app-create-edit-sub-admin',
  templateUrl: './create-edit-sub-admin.component.html',
  styleUrls: ['./create-edit-sub-admin.component.scss']
})
export class CreateEditSubAdminComponent implements OnInit, OnDestroy {
  subAdminPermissionArray: any = [];
  configOption1: ConfigurationOptions;
  idSub: Subscription;
  subadminDetailId: any;
  subAdminDetails: any;
  form: FormGroup;
  isSubmitdetails: any = false;
  NumberModel: any = '';
  phoneReq: any = true;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private websiteContentService: WebsiteContentService,
    private utilityService: UtilityService, private location: Location) {
    this.configOption1 = new ConfigurationOptions();
    this.configOption1.SelectorClass = 'WithBasic';
    this.configOption1.SelectorClass = 'India';
    this.configOption1.SortBy = SortOrderEnum.CountryName;
    // this.configOption1.OutputFormat = OutputOptionsEnum.Number;
    this.idSub = this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.subadminDetailId = params.get('id');
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // phonenumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    this.fetchSubAdminDetails();
  }
  fetchSubAdminDetails() {
    if (this.subadminDetailId) {
      this.utilityService.loaderStart();
      this.websiteContentService.getSubAdminDetail(this.subadminDetailId).subscribe(
        (success: any) => {
          this.subAdminDetails = success.data[0];
          this.form.controls.name.setValue(this.subAdminDetails.first_name + ' ' + this.subAdminDetails.last_name);
          this.form.controls.email.setValue(this.subAdminDetails.email_id);
          this.NumberModel = this.subAdminDetails.mobile_number;
          // this.form.controls.phonenumber.setValue(this.subAdminDetails.mobile_number);
          // console.log(' this.form.controls.phonenumber', this.form.controls.phonenumber);
          if (this.subAdminDetails.subAdminPermission) {
            this.subAdminPermissionArray = this.subAdminDetails.subAdminPermission;
          }
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  goBack() {
    this.location.back();
  }
  requiredFlagChange(event) {
    this.phoneReq = event;
  }
  onNumberChange(outputResult)
  {
    this.NumberModel = outputResult.Number;
  }
  saveDetails() {
    if (this.form.controls.name.invalid || this.form.controls.email.invalid || this.NumberModel === '' || !this.phoneReq) {
      this.isSubmitdetails = true;
      return;
    }
    if (!this.subadminDetailId) {
      if (this.form.controls.password.invalid) {
        this.isSubmitdetails = true;
        return;
      }
    }
    // console.log('rere', this.NumberModel);
    let body = {};
    const name = this.form.value.name.split(' ');
    body = {
      first_name: name[0],
      last_name: name[1] ? name[1] : '',
      email_id: this.form.value.email,
      // mobile_number: this.form.value.phonenumber.Number,
      mobile_number:  this.NumberModel,
      subAdminPermission: this.subAdminPermissionArray
    };
    if (this.form.value.password !== '') {
      body = {
        ...body,
        password: this.form.value.password
      }
    }
    if (this.subadminDetailId) {
      body = {
        ...body,
        id: this.subadminDetailId
      };
    }
    this.utilityService.loaderStart();
    this.websiteContentService.postCreateUpdateSubAdmin(body).subscribe(
      (success: any) => {
        this.goBack();
        //  this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  selectAllPermission(event: any) {
    if (event) {
      // tslint:disable-next-line:max-line-length
      this.subAdminPermissionArray = ['Dashboard', 'Customers', 'Organisers', 'Events', 'Archived-Events', 'Paid Events', 'Home Page Design', 'Categories', 'Venues', 'Payments', 'Support', 'Event Status'];
    } else {
      this.subAdminPermissionArray = [];
    }
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
  }
}
