import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService } from 'primeng/api';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  displayEditForm = false;
  termsAndConditonsForm: FormGroup;
  isTermsAndConditionsSubmitted = false;

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
      //  [{ header: 1 }, { header: 2 }], // custom button values
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
    this.termsAndConditonsForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.getTermsAndConditions();
  }

  openEditTermsAndConditions() {
    this.termsAndConditonsForm.controls.description.patchValue(
      this.description.description
    );
    this.displayEditForm = true;
  }

  closeEditTermsAndConditions() {
    this.confirmationService.confirm({
      message:
        'All unsaved changes will be lost. Are you sure you want to exit?',
      accept: () => {
        this.termsAndConditonsForm.reset();
        this.isTermsAndConditionsSubmitted = false;
        this.displayEditForm = false;
      }
    });
  }

  getTermsAndConditions() {
    this.loader.start();
    this.websiteContentService.getTermsAndConditions().subscribe(
      (success: any) => {
        console.log(success);
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

  updateTermsAndConditions() {
    this.loader.start();
    this.isTermsAndConditionsSubmitted = true;
    if (this.termsAndConditonsForm.valid) {
      console.log(this.termsAndConditonsForm.value);
      this.websiteContentService
        .updateTermsAndConditions({
          id: this.description.id,
          description: this.termsAndConditonsForm.controls.description.value
        })
        .subscribe(
          success => {
            console.log(success);
            this.getTermsAndConditions();
          },
          error => {
            this.errorHandler.routeAccordingToError(error);
            this.loader.stop();
            this.utilityService.scrollToTop();
          }
        );
      this.termsAndConditonsForm.reset();
      this.isTermsAndConditionsSubmitted = false;
      this.displayEditForm = false;
    } else {
      validateAllFormFields(this.termsAndConditonsForm);
    }
  }
}
