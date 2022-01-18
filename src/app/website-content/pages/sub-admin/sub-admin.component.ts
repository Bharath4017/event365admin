import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'app/shared/utility/utility.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss']
})
export class SubAdminComponent implements OnInit {
  SubAdminListing: any = [];
  totalRecords: any = 0;
  payload: object = {
    page: 1,
    sortBy: '',
    searchValue: ''
  };
  statusArray: any = [{ name: 'Flagged', value: 'flagged' }, { name: 'Active', value: 'active' }, { name: 'Inactive', value: 'inactive' }];
  sortByArray: any = [{ id: 'asc', name: 'A-Z (Alphabetically)' }, { id: 'desc', name: 'Z-A (Reverse Alphabetically)' }];
  constructor(
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService) { }

  ngOnInit() {
    this.fetchSubAdminList();
  }
  fetchSubAdminList() {
    this.utilityService.loaderStart();
    this.websiteContentService.getSubAdminList(this.payload).subscribe(
      (success: any) => {
        this.SubAdminListing = success.data.subadminList;
        this.totalRecords = success.data.totalDataCount;
        this.utilityService.resetPage();
        //  console.log('check value' + JSON.stringify(this.CompanyListing))
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  searchSubAdminList(event: any) {
    this.payload['searchValue'] = event.target.value;
    this.websiteContentService.getSubAdminList(this.payload).subscribe(
      (success: any) => {
        this.SubAdminListing = success.data.subadminList;
        this.totalRecords = success.data.totalDataCount;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.fetchSubAdminList();
  }
  selectSortValue(event) {
    this.payload['sortBy'] = event.value.id;
    this.fetchSubAdminList();
  }
  changeStatus(status: any, id: any, index: any) {
    const body = {
      status: status.value
    }
    this.websiteContentService.putSubAdminStatusChange(id, body).subscribe(
      (success: any) => {
        this.SubAdminListing[index].user_status = status.value;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
}
