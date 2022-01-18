

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FileUploadService } from 'app/shared/services/file-upload.service';

@Component({
  selector: 'app-faq',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  CompanyListing: any;
  mode: string;
  success: any;
  itemToEdit: any;
 public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    toolbarPosition: 'top'
  };
  userPermissionsArray: any = ['Customers', 'Organisers', 'Events', 'Categories', 'Venues', 'Payments'];
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
  ) {}


  ngOnInit() {
    if (JSON.parse(localStorage.getItem('userPermission'))) {
      this.userPermissionsArray = JSON.parse(localStorage.getItem('userPermission'));
    }
    this.getDashboardData();
  }
  onBasicUpload(e) {
    console.log(e);
  }
   getDashboardData() {
    this.utilityService.loaderStart();
    this.websiteContentService.dashboardData().subscribe(
      (success: any) => {
        this.CompanyListing = success.data;
        this.utilityService.resetPage();
        console.log('check value' + JSON.stringify(this.CompanyListing))
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }

}

