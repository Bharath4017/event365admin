import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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
import { ExcelService } from 'app/shared/services/excel.service';
declare let google: any;
@Component({
  selector: 'app-faq',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ExcelService]
})

export class UsersComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditCompanyForm: FormGroup;
  UserListing: any[] = [];
  displayAddEditAbout = false;
  selectedFile: File;
  mode: string;
  success: any;
  cols: any[];
  itemToEdit: any;
  aboutForm: FormGroup;
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
  };
  payload: object = {
    page: 1,
    sortBy: '',
    searchValue: '',
    searchLocation: ''
  };
  totalRecords: any = 0;
  sortByArray: any = [{ id: '1', name: 'Profile Status: Active' }, { id: '2', name: 'Profile Status: Inactive' }, { id: '3', name: 'Profile Status: Flagged' }, { id: '4', name: 'A-Z (Alphabetically)' }, { id: '5', name: 'Z-A (Reverse Alphabetically)' }];
  statusArray: any = [{ name: 'Flagged', value: 'flagged' }, { name: 'Active', value: 'active' }, { name: 'Inactive', value: 'inactive' }];
  countryList: any = [];
  @ViewChild('searchText') searchText: ElementRef;
  selectedCountryList: any = [];
  searchValue: any = '';
  selectedSortValue: any = '';
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.addEditCompanyForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      address: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      phoneNo: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      loginType: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      city: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      state: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      shortInfo: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      profilePic: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });

    this.getAllUserListing();
    this.cols = [
      { field: 'email', header: 'Email' },
      { field: 'name', header: 'Name' },
      { field: 'phoneNo', header: 'PhoneNo' },
      { field: 'address', header: 'Address' },
      { field: 'loginType', header: 'Login Type' }
    ];
  }
  onBasicUpload(e) {
    console.log(e);
  }
  openAddEditCompany(item?) {
    // edit
    if (item) {
      console.log('okay fine' + JSON.stringify(item));
      this.itemToEdit = this.UserListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditCompanyForm.controls.name.patchValue(
        this.itemToEdit.name
      );
      this.addEditCompanyForm.controls.email.patchValue(
        this.itemToEdit.email
      );
      this.addEditCompanyForm.controls.phoneNo.patchValue(
        this.itemToEdit.phoneNo
      );
      this.addEditCompanyForm.controls.address.patchValue(
        this.itemToEdit.address
      );
      this.addEditCompanyForm.controls.loginType.patchValue(
        this.itemToEdit.loginType
      );
      this.addEditCompanyForm.controls.state.patchValue(
        this.itemToEdit.state
      );
      this.addEditCompanyForm.controls.city.patchValue(
        this.itemToEdit.city
      );
      this.addEditCompanyForm.controls.shortInfo.patchValue(
        this.itemToEdit.shortInfo
      );
      this.addEditCompanyForm.controls.profilePic.patchValue(
        this.itemToEdit.profilePic
      );
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
  }

  // User list show
  getAllUserListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getAllCustomers(this.payload).subscribe(
      (success: any) => {
        this.UserListing = success.data.user_list;
        this.totalRecords = success.data.totalDataCount;
        this.utilityService.resetPage();
        console.log('Check value User' + JSON.stringify(this.UserListing));
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
    this.selectedFile = <File>event.target.files[0];    this.uploader.fileUploadImage(this.selectedFile)
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


  exportData() {
    this.utilityService.loaderStart();
    const data = this.payload;
    delete data['page'];
    this.websiteContentService.exportUserList(this.payload).subscribe(
      (success: any) => {
        const userList = [];
        success.data.forEach((element, index) => {
          userList.push({
            'Sr.No': index + 1,
            'Name': element.name,
            // tslint:disable-next-line:max-line-length
            'Email': element.email ? element.email : 'N/A',
            'Phone Number': element.phoneNo ? element.phoneNo : 'N/A',
            'Address': element.address ? element.address : 'N/A',
            'Status': element.accountStatus,
          });
        });
        this.excelService.exportAsExcelFile(userList, 'user_list');
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllUserListing();
  }
  searchData() {
    this.payload['sortBy'] = this.selectedSortValue.id ? this.selectedSortValue.id : '';
    this.payload['searchValue'] = this.searchValue;
    const searchLocationValue = this.selectedCountryList.map(({ value }) => value);
    this.payload['searchLocation'] = searchLocationValue.join(',');
    console.log('selec', this.selectedCountryList);
    this.getAllUserListing();
  }
  resetData() {
    this.payload['searchValue'] = '';
    this.payload['sortBy'] = '';
    this.searchValue = '';
    this.selectedSortValue = '';
    this.selectedCountryList = [];
    this.payload['searchLocation'] = '';
    this.getAllUserListing();
  }
  changeStatus(status: any, id: any, index: any) {
    const body = {
      status: status.value
    }
    this.websiteContentService.userStatus(id, body).subscribe(
      (success: any) => {
        this.UserListing[index].accountStatus = status.value;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  handleChange(event: any) {
    var item = new Set([]);
    if (event !== '') {
      var callback = (predictions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        predictions.forEach(element => {
          item.add(element.structured_formatting.main_text);
        });
        this.countryList = Array.from(item);
      }
      var service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: event, types: ['(regions)'] }, callback);
    }
  }

  deletHostP(id): void {
    this.utilityService.loaderStart();
    this.websiteContentService.deleteOrganiser(id).subscribe(
      (result: any) => {
        this.utilityService.loaderStop();
        if (result.success) {
          this.messageService.add({
            severity: 'success',
            summary: result.message,
            detail: ''
          });
          this.getAllUserListing()
        }
      }, (error) => {
        this.utilityService.loaderStop();
        this.utilityService.routingAccordingToError(error);
      }
    );
  }

  DeleteAction(id){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.deletHostP(id);
      }
    });
  }
}
