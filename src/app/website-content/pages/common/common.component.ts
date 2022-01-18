import { Component, OnInit } from '@angular/core';
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
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditAccurateForm: FormGroup;
  addEditBlogForm: FormGroup;
  addEditTeamForm: FormGroup;
  addEditSocailForm: FormGroup;
  addEditOfferForm: FormGroup;
  addEditSelfForm: FormGroup;
  addEditFreeForm: FormGroup;
  addEditInviteForm: FormGroup;
  addEditForm: FormGroup;
  AccurateListing: any[] = [];
  displayAddEditExp = false;
  displayAddEditEmail = false;
  displayAddEditBlog = false;
  displayAddEditSocial = false;
  displayAddEditTeam = false;
  displayAddEditOffer = false;
  displayAddEditInvite = false;
  displayAddEditSelf = false;
  displayAddEditFree = false;

  selectedFile: File;
  mode: string;
  success: any;
  itemToEdit: any;
  aboutForm: FormGroup;
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    toolbarPosition: 'top'
  };

  toolbar = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      [{ align: [] }],
      ['clean'] // remove formatting button
    ]
  };

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.addEditAccurateForm = new FormGroup({
      minExp: new FormControl([
        Validators.required,
        noWhitespaceValidator,
        Validators.min(0)
      ]),
      maxExp: new FormControl([Validators.required, noWhitespaceValidator, Validators.min(0)]),
    });
    this.addEditForm = new FormGroup({
      heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      description: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.addEditBlogForm = new FormGroup({
      heading: new FormControl([
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.addEditTeamForm = new FormGroup({
      heading: new FormControl([
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.addEditOfferForm = new FormGroup({
      heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      sub_heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      description: new FormControl([
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.addEditSocailForm = new FormGroup({
      heading: new FormControl([
        Validators.required,
        noWhitespaceValidator
      ]),
      sub_heading: new FormControl([
        Validators.required,
        noWhitespaceValidator
      ]),
      description: new FormControl([
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.addEditInviteForm = new FormGroup({
      heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      sub_heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      description: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });

    this.addEditSelfForm = new FormGroup({
      heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      description: new FormControl('', [Validators.required, noWhitespaceValidator]),
      sub_heading: new FormControl('', [Validators.required, noWhitespaceValidator]),
      sub_description: new FormControl('', [Validators.required, noWhitespaceValidator]),
      description2: new FormControl('', [Validators.required, noWhitespaceValidator]),
      description3: new FormControl('', [Validators.required, noWhitespaceValidator]),
      description4: new FormControl('', [Validators.required, noWhitespaceValidator])
    });

    this.addEditFreeForm = new FormGroup({
      heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      description: new FormControl([Validators.required, noWhitespaceValidator]),
      description2: new FormControl('', [Validators.required, noWhitespaceValidator]),
      description3: new FormControl('', [Validators.required, noWhitespaceValidator])
    });
    this.getAllPagesListing();
  }
  onBasicUpload(e) {
    console.log(e);
  }
  openAddEditExp(item?) {
    // edit
    if (item) {
      console.log('okay fine' + JSON.stringify(item));
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditAccurateForm.controls.minExp.patchValue(
        this.itemToEdit.experience.minExp
      );
      this.addEditAccurateForm.controls.maxExp.patchValue(this.itemToEdit.experience.maxExp);
      this.displayAddEditExp = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditExp = true;
      //  this.displayAddEditEmail = true;
    }
  }

  openAddEditEmail(item?) {
    // edit
    if (item) {
      console.log('okay fine' + JSON.stringify(item));
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditForm.controls.heading.patchValue(
        this.itemToEdit.emailData.heading
      );
      this.addEditForm.controls.description.patchValue(
        this.itemToEdit.emailData.description
      );
      this.displayAddEditEmail = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditEmail = true;
      //  this.displayAddEditEmail = true;
    }
  }

  openAddEditBlog(item?) {
    // edit
    if (item) {
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditBlogForm.controls.heading.patchValue(
        this.itemToEdit.blogData.heading
      );
      this.displayAddEditBlog = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditBlog = true;
      //  this.displayAddEditEmail = true;
    }
  }

  openAddEditTeam(item?) {
    // edit
    if (item) {
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditTeamForm.controls.heading.patchValue(
        this.itemToEdit.teamData.heading
      );
      this.displayAddEditTeam = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditTeam = true;
      //  this.displayAddEditEmail = true;
    }
  }

  openAddEditSocial(item?) {
    // edit
    if (item) {
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditSocailForm.controls.heading.patchValue(
        this.itemToEdit.socialData.heading
      );
      this.addEditSocailForm.controls.sub_heading.patchValue(
        this.itemToEdit.socialData.sub_heading
      );
      this.addEditSocailForm.controls.description.patchValue(
        this.itemToEdit.socialData.description
      );
      this.displayAddEditSocial = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditSocial = true;
      //  this.displayAddEditEmail = true;
    }
  }

  openAddEditSelf(item?) {
    // edit
    if (item) {
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditSelfForm.controls.heading.patchValue(
        this.itemToEdit.personalDetails.heading
      );
      this.addEditSelfForm.controls.description.patchValue(
        this.itemToEdit.personalDetails.description
      );
      this.addEditSelfForm.controls.sub_heading.patchValue(
        this.itemToEdit.personalDetails.sub_heading
      );
      this.addEditSelfForm.controls.sub_description.patchValue(
        this.itemToEdit.personalDetails.sub_description
      );
      this.addEditSelfForm.controls.description2.patchValue(
        this.itemToEdit.personalDetails.description2
      );
      this.addEditSelfForm.controls.description3.patchValue(
        this.itemToEdit.personalDetails.description3
      );
      this.addEditSelfForm.controls.description4.patchValue(
        this.itemToEdit.personalDetails.description4
      );
      this.displayAddEditSelf = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditSelf = true;
      //  this.displayAddEditEmail = true;
    }
  }

  openAddEditOffer(item?) {
    // edit
    if (item) {
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditOfferForm.controls.heading.patchValue(
        this.itemToEdit.offerData.heading
      );
      this.addEditOfferForm.controls.sub_heading.patchValue(
        this.itemToEdit.offerData.sub_heading
      );
      this.addEditOfferForm.controls.description.patchValue(
        this.itemToEdit.offerData.description
      );
      this.displayAddEditOffer = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditOffer = true;
      //  this.displayAddEditEmail = true;
    }
  }

  openAddEditInvite(item?) {
    // edit
    if (item) {
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditInviteForm.controls.heading.patchValue(
        this.itemToEdit.inviteData.heading
      );
      this.addEditInviteForm.controls.sub_heading.patchValue(
        this.itemToEdit.inviteData.sub_heading
      );
      this.addEditInviteForm.controls.description.patchValue(
        this.itemToEdit.inviteData.description
      );
      this.displayAddEditInvite = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditInvite = true;
      //  this.displayAddEditEmail = true;
    }
  }
  openAddEditFree(item?) {
    // edit
    if (item) {
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditFreeForm.controls.heading.patchValue(
        this.itemToEdit.freePageData.heading
      );
      this.addEditFreeForm.controls.description.patchValue(
        this.itemToEdit.freePageData.description
      );
      this.addEditFreeForm.controls.description2.patchValue(
        this.itemToEdit.freePageData.description2
      );
      this.addEditFreeForm.controls.description3.patchValue(
        this.itemToEdit.freePageData.description3
      );
      this.displayAddEditFree = true;
      //  this.displayAddEditEmail = true;
    } else {
      // add
      this.displayAddEditFree = true;
      //  this.displayAddEditEmail = true;
    }
  }
  closeAddEditExp() {
    this.addEditAccurateForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditExp = false;
    this.displayAddEditEmail = false;
  }

  closeAddEditSelf() {
    this.addEditAccurateForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditExp = false;
    this.displayAddEditSelf = false;
  }

  closeAddEditFree() {
    this.addEditAccurateForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditExp = false;
    this.displayAddEditFree = false;
  }

  closeAddEditEmail() {
    this.addEditForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditEmail = false;
    this.displayAddEditExp = false;

  }

  closeAddEditBlog() {
    this.addEditBlogForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditBlog = false;
    this.displayAddEditEmail = false;
    this.displayAddEditExp = false;
  }
  closeAddEditSocial() {
    this.addEditAccurateForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditSocial = false;
  }
  closeAddEditTeam() {
    this.addEditAccurateForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditTeam = false;
  }
  closeAddEditOffer() {
    this.addEditAccurateForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditOffer = false;
  }
  closeAddEditInvite() {
    this.addEditAccurateForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditInvite = false;
  }


  getAllPagesListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getAllCommonPages().subscribe(
      (success: any) => {
        this.AccurateListing = success.data;
        this.utilityService.resetPage();
        console.log('check value' + JSON.stringify(this.AccurateListing))
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  arrayOfStringsToArrayOfObjects(arr: string[]) {
    const newArray = [];
    arr.forEach(element => {
      newArray.push({
        label: element,
        value: element
      });
    });
    return newArray;
  }

  addUpdateCommonPages() {
    let aboutBody;
    this.isAddFaqSubmitted = true;
    console.log('dirty form', this.addEditAccurateForm)
    if (this.addEditAccurateForm.valid && this.displayAddEditExp == true) {
      console.log("ok exp")
      this.utilityService.loaderStart();
      //  console.log(this.itemToEdit.experience, "shubha");
      if (this.itemToEdit.experience) {
        console.log('"update"' + JSON.stringify(this.itemToEdit.experience));
        aboutBody = {
          minExp: this.addEditAccurateForm.controls.minExp.value,
          maxExp: this.addEditAccurateForm.controls.maxExp.value,
          id: this.itemToEdit.experience.id
        };
      } else {
        console.log('" create"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          minExp: this.addEditAccurateForm.controls.minExp.value,
          maxExp: this.addEditAccurateForm.controls.maxExp.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditExp();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else if (this.addEditForm.valid && this.displayAddEditEmail == true) {
      console.log("ok email")
      this.utilityService.loaderStart();
      //  console.log(this.itemToEdit.experience, "shubha");
      if (this.itemToEdit.emailData) {
        console.log('"update email"' + JSON.stringify(this.itemToEdit.emailData));
        aboutBody = {
          heading: this.addEditForm.controls.heading.value,
          description: this.addEditForm.controls.description.value,
          id: this.itemToEdit.emailData.id
        };
      } else {
        console.log('" create"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          description: this.addEditForm.controls.description.value,
          heading: this.addEditForm.controls.heading.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          //  console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditExp();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else if (this.addEditBlogForm.valid && this.displayAddEditBlog == true) {
      console.log('Blog')
      this.utilityService.loaderStart();
      if (this.itemToEdit.blogData) {
        aboutBody = {
          heading: this.addEditBlogForm.controls.heading.value,
          id: this.itemToEdit.blogData.id
        };
      } else {
        console.log('" create"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          heading: this.addEditBlogForm.controls.heading.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          //  console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditBlog();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else if (this.addEditTeamForm.valid && this.displayAddEditTeam == true) {
      console.log('Team')
      this.utilityService.loaderStart();
      if (this.itemToEdit.teamData) {
        aboutBody = {
          heading: this.addEditTeamForm.controls.heading.value,
          id: this.itemToEdit.teamData.id
        };
      } else {
        aboutBody = {
          heading: this.addEditTeamForm.controls.heading.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          //  console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditTeam();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else if (this.addEditSocailForm.valid && this.displayAddEditSocial == true) {
      console.log('Socail')
      this.utilityService.loaderStart();
      if (this.itemToEdit.socialData) {
        aboutBody = {
          heading: this.addEditSocailForm.controls.heading.value,
          sub_heading: this.addEditSocailForm.controls.sub_heading.value,
          description: this.addEditSocailForm.controls.description.value,
          id: this.itemToEdit.socialData.id
        };
      } else {
        aboutBody = {
          heading: this.addEditSocailForm.controls.heading.value,
          sub_heading: this.addEditSocailForm.controls.sub_heading.value,
          description: this.addEditSocailForm.controls.description.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          //  console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditSocial();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else if (this.addEditInviteForm.valid && this.displayAddEditInvite == true) {
      console.log('Socail')
      this.utilityService.loaderStart();
      if (this.itemToEdit.inviteData) {
        aboutBody = {
          heading: this.addEditInviteForm.controls.heading.value,
          sub_heading: this.addEditInviteForm.controls.sub_heading.value,
          description: this.addEditInviteForm.controls.description.value,
          id: this.itemToEdit.inviteData.id
        };
      } else {
        aboutBody = {
          heading: this.addEditInviteForm.controls.heading.value,
          sub_heading: this.addEditInviteForm.controls.sub_heading.value,
          description: this.addEditInviteForm.controls.description.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          //  console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditInvite();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else if (this.addEditOfferForm.valid && this.displayAddEditOffer == true) {
      console.log('Offer')
      this.utilityService.loaderStart();
      if (this.itemToEdit.offerData) {
        aboutBody = {
          heading: this.addEditOfferForm.controls.heading.value,
          sub_heading: this.addEditOfferForm.controls.sub_heading.value,
          description: this.addEditOfferForm.controls.description.value,
          id: this.itemToEdit.offerData.id
        };
      } else {
        aboutBody = {
          heading: this.addEditOfferForm.controls.heading.value,
          sub_heading: this.addEditOfferForm.controls.sub_heading.value,
          description: this.addEditOfferForm.controls.description.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          //  console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditOffer();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else if (this.addEditSelfForm.valid && this.displayAddEditSelf == true) {
      console.log('Offer')
      this.utilityService.loaderStart();
      if (this.itemToEdit.personalDetails) {
        aboutBody = {
          heading: this.addEditSelfForm.controls.heading.value,
          description: this.addEditSelfForm.controls.description.value,
          sub_heading: this.addEditSelfForm.controls.sub_heading.value,
          sub_description: this.addEditSelfForm.controls.sub_description.value,
          description2: this.addEditSelfForm.controls.description2.value,
          description3: this.addEditSelfForm.controls.description3.value,
          description4: this.addEditSelfForm.controls.description4.value,
          id: this.itemToEdit.personalDetails.id
        };
      } else {
        aboutBody = {
          heading: this.addEditSelfForm.controls.heading.value,
          sub_heading: this.addEditSelfForm.controls.sub_heading.value,
          sub_description: this.addEditSelfForm.controls.sub_description.value,
          description2: this.addEditSelfForm.controls.description2.value,
          description3: this.addEditSelfForm.controls.description3.value,
          description4: this.addEditSelfForm.controls.description4.value,
          description: this.addEditSelfForm.controls.description.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          //  console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditSelf();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else if (this.addEditFreeForm.valid && this.displayAddEditFree == true) {
      console.log('Free', this.itemToEdit.freePageData)
      this.utilityService.loaderStart();
      if (this.itemToEdit.freePageData) {
        aboutBody = {
          heading: this.addEditFreeForm.controls.heading.value,
          description: this.addEditFreeForm.controls.description.value,
          description2: this.addEditFreeForm.controls.description2.value,
          description3: this.addEditFreeForm.controls.description3.value,
          id: this.itemToEdit.freePageData.id
        };
      } else {
        aboutBody = {
          heading: this.addEditFreeForm.controls.heading.value,
          description2: this.addEditFreeForm.controls.description2.value,
          description3: this.addEditFreeForm.controls.description3.value,
          description: this.addEditFreeForm.controls.description.value,
        };
      }
      this.websiteContentService.addUpdateCommonPages(aboutBody).subscribe(
        (success: any) => {
          //  console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Updated Successfully');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Added Successfully');
          }
          this.closeAddEditFree();
          this.getAllPagesListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.addEditAccurateForm);
    }
  }
}
