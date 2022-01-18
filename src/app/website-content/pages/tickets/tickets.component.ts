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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-faq',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditCompanyForm: FormGroup;
  EventListing: any[] = [];
  EventData: any[] = [];
  displayAddEditAbout = false;
  selectedFile: File;
  mode: string;
  success: any;
  itemToEdit: any = {};
  eventId;
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
    private route: ActivatedRoute
  ) {
    this.eventId = route.snapshot.params.id;
  }

  ngOnInit() {
    this.addEditCompanyForm = new FormGroup({
      ticketName: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.getAllEventListing();
  }
  onBasicUpload(e) {
    console.log(e);
  }
  openAddEditCompany(item?) {
    // edit
    if (item) {
      console.log('okay fine' + JSON.stringify(item));

      this.itemToEdit = item;
      // this.itemToEdit = this.eventId;
      //  this.itemToEdit = this.EventListing.find(kubernetes => kubernetes.id === item.id);
      //   this.addEditCompanyForm.controls.ticketName.patchValue(
      //     this.itemToEdit.ticketName
      //   );
      this.displayAddEditAbout = true;
    } else {
      // add
      this.displayAddEditAbout = true;
    }
  }

  closeAddEditCompany() {
    this.addEditCompanyForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditAbout = false;
    this.itemToEdit = null;
  }

  getAllEventListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getAllEventTicket(this.eventId).subscribe(
      (success: any) => {
        this.EventListing = success.data.tickets;
        this.EventData = success.data.event;
        this.utilityService.resetPage();
        console.log('EventData' + JSON.stringify(this.EventData))
        console.log('check value' + JSON.stringify(this.EventListing))
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


  uploadImage(event, key) {
    console.log(event)
    this.selectedFile = <File>event.target.files[0];

    console.log(this.selectedFile);
    this.uploader.fileUploadImage(this.selectedFile)
      .subscribe((success: any) => {
        this.addEditCompanyForm.controls[key].setValue(success.image.url);
        console.log(key + ' : ' + this.addEditCompanyForm.value[key]);
        this.messageService.add({
          severity: 'success',
          summary: 'File added',
          detail: ''
        });
      });
  }

  addUpdateLocation() {
    let aboutBody;
    this.isAddFaqSubmitted = true;
    if (this.addEditCompanyForm.valid) {
      this.utilityService.loaderStart();
      if (this.itemToEdit) {
        console.log('"update"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          company_id: this.eventId,
          location: this.addEditCompanyForm.controls.location.value,
          id: this.itemToEdit.id
        };
      } else {
        // console.log('" create"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          company_id: this.eventId,
          location: this.addEditCompanyForm.controls.location.value,
        };
      }
      this.websiteContentService.addUpdateLocation(aboutBody).subscribe(
        (success: any) => {
          console.log('Create Location' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Location Updated');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Location Added');
          }
          this.closeAddEditCompany();
          this.getAllEventListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.addEditCompanyForm);
    }
  }

  deleteLocation(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteLocation(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('Location Deleted');
            this.getAllEventListing();
          });
      }
    });
  }
}
