import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sub-admin-details',
  templateUrl: './sub-admin-details.component.html',
  styleUrls: ['./sub-admin-details.component.scss']
})
export class SubAdminDetailsComponent implements OnInit, OnDestroy {
  idSub: Subscription;
  subadminDetailId: any;
  subAdminDetails: any;
  subAdminPermissionArray: any = [];
  constructor(private activatedRoute: ActivatedRoute,
    private websiteContentService: WebsiteContentService,
    private utilityService: UtilityService, private location: Location) {
    this.idSub = this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.subadminDetailId = params.get('id');
      }
    });
  }

  ngOnInit() {
    this.fetchSubAdminDetails();
  }
  fetchSubAdminDetails() {
    if (this.subadminDetailId) {
      this.utilityService.loaderStart();
      this.websiteContentService.getSubAdminDetail(this.subadminDetailId).subscribe(
        (success: any) => {
          this.subAdminDetails = success.data[0];
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
  ngOnDestroy() {
    this.idSub.unsubscribe();
  }
}
