import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'app/shared/services/file-upload.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-support-queries',
  templateUrl: './support-queries.component.html',
  styleUrls: ['./support-queries.component.scss']
})
export class SupportQueriesComponent implements OnInit {
  QueryListing: any[] = [];
  idSub: Subscription
  issueId: any;
  cols: any[];
  payload: object = {
    page: 1,
    search: '',
    type: '',
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
    private location : Location,
    private router: Router) {
      this.idSub = this.activatedRoute.paramMap.subscribe((params) => {
        if (params.get('id')) {
          this.issueId = params.get('id');
        }
      });
    }

  ngOnInit() {
    this.getAllSupportListing();
    this.cols = [
      { field: 'email', header: 'eamil' },
      { field: 'message', header: 'message' }

    ];
  }

  goBack(): any {
    this.location.back();
  }

  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllSupportListing();
  }

  getAllSupportListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getIssueQueries(this.issueId).subscribe(
      (success: any) => {
        this.QueryListing = success.data;
        console.log("QueryListing", this.QueryListing);
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }

  deleteQuery(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteQuery(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('Query deleted successfully!');
            this.getAllSupportListing();
          });
      }
    });
  }

}
