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
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditCompanyForm: FormGroup;
  CompanyListing: any[] = [];
  displayAddEditAbout = false;
  selectedFile: File;
  mode: string;
  success: any;
  itemToEdit: any;
  aboutForm: FormGroup;
  cols: any[];
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

  @ViewChild('myInput')
  myInputVariable: ElementRef;
  totalRecords: any = 0;
  payload: object = {
    page: 1,
    sortBy: '',
    searchValue: ''
  };
  selectedSortBy: any = '';
  sortByArray: any = [{ id: 'asc', name: 'A-Z (Alphabetically)' }, { id: 'desc', name: 'Z-A (Reverse Alphabetically)' }];
  isEditTicketCapacity: any = '';
  editTicketCapacityValue: any = '';
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private router: Router,
    private messageService: MessageService
  ) { }

  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
  }
  ngOnInit() {
    this.addEditCompanyForm = new FormGroup({
      venueName: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      venueAddress: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      name: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      venueImages: new FormControl(''),
    });
    this.getAllCompanyListing();
  }
  onBasicUpload(e) {
    console.log(e);
  }
  goTo(id) {
    localStorage.setItem('venueFrom', '/venue');
    this.router.navigate([`/venue-detail/${id}`])

  }
  openAddEditCompany(item?) {
    // edit
    if (item) {
      // console.log('okay fine' + JSON.stringify(item));
      this.itemToEdit = this.CompanyListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditCompanyForm.controls.venueName.patchValue(
        this.itemToEdit.venueName
      );
      this.addEditCompanyForm.controls.venueAddress.patchValue(
        this.itemToEdit.venueAddress
      );
      this.addEditCompanyForm.controls.name.patchValue(
        this.itemToEdit.users.name
      );
      this.addEditCompanyForm.controls.email.patchValue(
        this.itemToEdit.users.email
      );
      this.addEditCompanyForm.controls.venueImages.patchValue(this.itemToEdit.venueImages[0].venueImages);
      this.displayAddEditAbout = true;
    } else {
      // add
      this.displayAddEditAbout = true;
    }
  }

  closeAddEditCompany() {
    // this.addEditCompanyForm.reset();
    // this.isAddFaqSubmitted = false;
    this.displayAddEditAbout = false;
    this.itemToEdit = null;
  }

  getAllCompanyListing() {
    this.cols = [
      { field: 'venueName', header: 'venueName' },
      { field: 'venueAddress', header: 'venueAddress' }
    ];
    this.utilityService.loaderStart();
    this.websiteContentService.getAllVenues(this.payload).subscribe(
      (success: any) => {
        this.CompanyListing = success.data.venueList;
        this.totalRecords = success.data.totalDataCount;
        this.utilityService.resetPage();
        //  console.log('check value' + JSON.stringify(this.CompanyListing))
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

  statusChange(e, id) {
    const data = {
      'is_active': e,
      'id': id
    }
    console.log('Data value' + JSON.stringify(data));
    this.websiteContentService.venueStatus(data).subscribe((success: any) => {

    }, error => {
      this.utilityService.routingAccordingToError(error);
      this.getAllCompanyListing();
    });

  }
  addUpdateCompany() {
    let aboutBody;
    this.isAddFaqSubmitted = true;
    if (this.addEditCompanyForm.valid) {
      this.utilityService.loaderStart();
      if (this.itemToEdit) {
        console.log('update' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          venueName: this.addEditCompanyForm.controls.venueName.value,
          venueAddress: this.addEditCompanyForm.controls.venueAddress.value,
          name: this.addEditCompanyForm.controls.name.value,
          email: this.addEditCompanyForm.controls.email.value,
          venueImages: this.addEditCompanyForm.controls.venueImages.value,
          id: this.itemToEdit.id
        };
      } else {
        console.log('" create"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          venueName: this.addEditCompanyForm.controls.venueName.value,
          venueAddress: this.addEditCompanyForm.controls.venueAddress.value,
          name: this.addEditCompanyForm.controls.name.value,
          email: this.addEditCompanyForm.controls.email.value,
          venueImages: this.addEditCompanyForm.controls.venueImages.value,
        };
      }
      this.websiteContentService.addUpdateCompany(aboutBody).subscribe(
        (success: any) => {
          console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Company Updated');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Company Added');
            this.reset();
          }
          this.closeAddEditCompany();
          this.getAllCompanyListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.addEditCompanyForm);
    }
  }

  deleteCompany(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Levels and Locations correspondence with this company will be deleted?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteCompany(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('Company Deleted');
            this.getAllCompanyListing();
          });
      }
    });
  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllCompanyListing();
  }
  searchVenueList(event: any) {
    this.payload['searchValue'] = event.target.value;
    this.websiteContentService.getAllVenues(this.payload).subscribe(
      (success: any) => {
        this.CompanyListing = success.data.venueList;
        this.totalRecords = success.data.totalDataCount;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  selectSortValue(event) {
    this.payload['sortBy'] = event.value.id;
    this.getAllCompanyListing();
  }
  editTicketCapacity(item: any) {
    this.isEditTicketCapacity = item.id;
    this.editTicketCapacityValue = item.ticketCapacityPercent;
  }
  cancelEditTicketCapacity() {
    this.isEditTicketCapacity = '';
    this.editTicketCapacityValue = '';
  }
  handleEditTicketCapacity(event: any, item: any, index: any) {
    this.editTicketCapacityValue = event.target.value;
    // console.log(event);
    // if (event.keyCode === 13 && !event.shiftKey) {
    //   this.saveEditTicketCapacity(item, index);
    // }
  }
  saveEditTicketCapacity(item: any, index: any) {
    if (this.editTicketCapacityValue !== '' && Number(this.editTicketCapacityValue) !== 0) {
      const body = {
        id: item.id,
        ticketCapacityPercent: Number(this.editTicketCapacityValue)
      }
      this.websiteContentService.postUpdateTicketCapacity(body).subscribe(
        (success: any) => {
          this.CompanyListing[index].ticketCapacityPercent = Number(this.editTicketCapacityValue);
          this.isEditTicketCapacity = '';
          this.editTicketCapacityValue = '';
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
}
