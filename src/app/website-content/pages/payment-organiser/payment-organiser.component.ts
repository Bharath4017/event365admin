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
import { data } from 'jquery';

@Component({
  selector: 'app-faq',
  templateUrl: './payment-organiser.component.html',
  styleUrls: ['./payment-organiser.component.scss']
})
export class PaymentOrganiserComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditCompanyForm: FormGroup;
  OrganiserListing: any[] = [];
  displayAddEditAbout = false;
  selectedFile: File;
  mode: string;
  success: any;
  itemToEdit: any;
  itemEventToEdit: any;
  aboutForm: FormGroup;
  totalRecords: any = 0;

  data: any;
  payload: object = {
    page: 1,
    searchValue: '',
  };

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
  minFromDate: Date;
  page: number;
  search: any;
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
    //private carService: CarService
  ) { }

  searchUserForm = new FormGroup({
    search: new FormControl(''),
    filter: new FormControl('')
  });

  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = '';
    console.log(this.myInputVariable.nativeElement.files);
  }
  ngOnInit() {
    // this.addEditCompanyForm = new FormGroup({
    //   ticketName: new FormControl('', [
    //     Validators.required,
    //     noWhitespaceValidator
    //   ])
    // });
    this.getAllOrganiserListing();
  }

  searchByDateForm = new FormGroup({
    toDate: new FormControl(''),
    fromDate: new FormControl('')
  });

  onBasicUpload(e) {
    console.log(e);
  }
  openAddEditCompany(item?) {
    // edit
    if (item) {
      console.log('okay fine' + JSON.stringify(item));

      this.itemToEdit = item;
      this.displayAddEditAbout = true;
    } else {
      // add
      this.displayAddEditAbout = true;
    }
  }
  searchUser() {
    this.page = 1;
    // tslint:disable-next-line: no-shadowed-variable
    const data = this.searchUserForm.value;
    this.search = data.search;
    // tslint:disable-next-line: triple-equals
    if (data.search == '') {
      this.payload['page'] = 1;
      this.payload['search'] = '';
    } else {
      this.payload['page'] = 1;
      this.payload['search'] = this.search;
    }
    this.listing();
  }
  closeAddEditCompany() {
    this.addEditCompanyForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditAbout = false;
    this.itemToEdit = null;
  }


  searchList(event) {
    this.payload['searchValue'] = event.target.value;
    this.websiteContentService.getAllOrgPaymentReq(this.payload).subscribe(
      (success: any) => {
        this.OrganiserListing = success.data;
        this.totalRecords = success.data.totalDataCount;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );

  }

  getAllOrganiserListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getAllOrgPaymentReq(this.payload).subscribe(
      (success: any) => {
        this.OrganiserListing = success.data;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  // arrayOfStringsToArrayOfObjects(arr: string[]) {
  //   const newArray = [];
  //   arr.forEach(element => {
  //     newArray.push({
  //       label: element,
  //       value: element
  //     });
  //   });
  //   return newArray;
  // }

  // onToDateChange(value) {
  //   if (value) {
  //     this.minFromDate = new Date(value);
  //     console.log('minFromDate', this.minFromDate);
  //   }
  // }

  // searchByDate() {
  //   this.page = 1;
  //   const data = this.searchByDateForm.value;
  //   if (data.toDate == '') {
  //     this.payload['page'] = 1;
  //     this.payload['toDate'] = '';
  //   } else {
  //     this.payload['page'] = 1;
  //     this.payload['toDate'] = data.toDate;
  //   }
  //   if (data.fromDate == '') {
  //     this.payload['page'] = 1;
  //     this.payload['fromDate'] = '';
  //   } else {
  //     this.payload['page'] = 1;
  //     this.payload['fromDate'] = data.fromDate;
  //   }
  //   this.getAllOrganiserListing();
  // }

  // resetSearchForm() {
  //   this.payload['page'] = 1;
  //   this.payload['fromDate'] = '';
  //   this.payload['toDate'] = '';
  //   this.searchByDateForm.reset();
  //   this.getAllOrganiserListing();
  // }
  // uploadImage(event, key) {
  //   this.selectedFile = <File>event.target.files[0];
  //   this.uploader.fileUploadImage(this.selectedFile)
  //     .subscribe((success: any) => {
  //       this.addEditCompanyForm.controls[key].setValue(success.image.url);
  //       console.log(key + ' : ' + this.addEditCompanyForm.value[key]);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'File added',
  //         detail: ''
  //       });
  //     });
  // }
  filterByStatus(value) {
    // console.log('transStatus', value)
    // this.payload['page'] = 1;
    //  this.payload['limit'] = 100;
    this.payload['transStatus'] = value;
    this.getAllOrganiserListing();
  }
  listing() {
    throw new Error('Method not implemented');
  }


  isReleasedSatus(e, id) {
    // tslint:disable-next-line: no-shadowed-variable
    const data = {
      'isReleased': e,
      'id': id
    }
    console.log('Data value' + JSON.stringify(data));
    this.websiteContentService.isReleasedStatus(data).subscribe((success: any) => {

    }, error => {
      this.utilityService.routingAccordingToError(error);
      this.getAllOrganiserListing();
    });

  }

  isVerifiedStatus(e, id) {
    console.log(e, id);
    const data = {
      'isVerified': e,
      'id': id
    }
    console.log('Data value' + JSON.stringify(data));
    this.websiteContentService.isVerifiedStatus(data).subscribe((success: any) => {

    }, error => {
      this.utilityService.routingAccordingToError(error);
      this.getAllOrganiserListing();
    });

  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllOrganiserListing();
  }
}
