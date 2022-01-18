import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService } from 'primeng/api';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  displayEditForm = false;
  privacyPolicyForm: FormGroup;
  isPrivacyPolicySubmitted = false;
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    toolbarPosition: 'top'
  };
  description: any;

  toolbar = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      // [{ header: 1 }, { header: 2 }], // custom button values
      // [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      // [{ align: [] }],
      // ['clean'] // remove formatting button
    ]
  };
  constructor(
    public utilityService: UtilityService,
    private confirmationService: ConfirmationService,
    private websiteContentService: WebsiteContentService,
    private loader: NgxUiLoaderService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.description = '';
    this.privacyPolicyForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });

    this.getPrivacyPolicy();
  }

  openEditPrivacyPolicy() {
    this.privacyPolicyForm.controls.description.patchValue(
      this.description.description
    );
    this.displayEditForm = true;
  }

  closeEditPrivacyPolicy() {
    this.confirmationService.confirm({
      message:
        'All unsaved changes will be lost. Are you sure you want to exit?',
      accept: () => {
        this.privacyPolicyForm.reset();
        this.isPrivacyPolicySubmitted = false;
        this.displayEditForm = false;
      }
    });
  }

  getPrivacyPolicy() {
    this.loader.start();
    this.websiteContentService.getPrivacyPolicy().subscribe(
      (success: any) => {
        this.description = success.data;
        this.loader.stop();
        this.utilityService.scrollToTop();
      },
      error => {
        this.errorHandler.routeAccordingToError(error);
        this.loader.stop();
        this.utilityService.scrollToTop();
      }
    );
  }

  updatePrivacyPolicy() {
    this.loader.start();
    this.isPrivacyPolicySubmitted = true;
    if (this.privacyPolicyForm.valid) {
      this.websiteContentService
        .updatePrivacyPolicy({
          id: 2,
          description: this.privacyPolicyForm.controls.description.value
        })
        .subscribe(
          success => {
            this.getPrivacyPolicy();
          },
          error => {
            this.errorHandler.routeAccordingToError(error);
            this.loader.stop();
            this.utilityService.scrollToTop();
          }
        );
      this.privacyPolicyForm.reset();
      this.isPrivacyPolicySubmitted = false;
      this.displayEditForm = false;
    } else {
      validateAllFormFields(this.privacyPolicyForm);
    }
  }
}
