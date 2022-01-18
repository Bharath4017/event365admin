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
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditOrganisersForm: FormGroup;
  OrganisersListing: any[] = [];
  displayAddEditOrganiser = false;
  selectedFile: File;
  mode: string;
  success: any;
  cols: any[];
  itemToEdit: any;
  aboutForm: FormGroup;
  payload: object = {
    page: 1,
    sortBy: '',
    searchValue: ''
  };
  totalRecords: any = 0;
  // tslint:disable-next-line:max-line-length
  sortByArray: any = [{ id: '1', name: 'Profile Status: Active' }, { id: '2', name: 'Profile Status: Inactive' }, { id: '3', name: 'Profile Status: Flagged' }, { id: '4', name: 'A-Z (Alphabetically)' }, { id: '5', name: 'Z-A (Reverse Alphabetically)' }];
  selectedSortBy: any = '';
  statusArray: any = [{ name: 'Flagged', value: 'flagged' }, { name: 'Active', value: 'active' }, { name: 'Inactive', value: 'inactive' }];
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    toolbarPosition: 'top'
  };

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.addEditOrganisersForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      password: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      address: new FormControl(''),
      phoneNo: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      shortInfo: new FormControl(''),
      profilePic: new FormControl(''),
    });
    this.getAllOrganisersListing();
    this.cols = [
      { field: 'email', header: 'Email' },
      { field: 'name', header: 'Name' },
      { field: 'phoneNo', header: 'PhoneNo' },
      { field: 'address', header: 'Address' }
    ];
  }
  onBasicUpload(e) {
    console.log(e);
  }
  // openAddEditOrganisers(item?) {
  //   // edit
  //   if (item) {
  //     console.log('item', item)
  //     this.itemToEdit = item;
  //     this.itemToEdit = this.OrganisersListing.find(kubernetes => kubernetes.id === item.id);
  //     this.addEditOrganisersForm.controls.name.patchValue(
  //       this.itemToEdit.name
  //     );
  //     this.addEditOrganisersForm.controls.email.patchValue(
  //       this.itemToEdit.email
  //     );
  //     this.addEditOrganisersForm.controls.password.patchValue(
  //       this.itemToEdit.password
  //     );
  //     this.addEditOrganisersForm.controls.address.patchValue(
  //       this.itemToEdit.address
  //     );
  //     this.addEditOrganisersForm.controls.city.patchValue(
  //       this.itemToEdit.city
  //     );
  //     this.addEditOrganisersForm.controls.state.patchValue(
  //       this.itemToEdit.state
  //     );
  //     this.addEditOrganisersForm.controls.phoneNo.patchValue(
  //       this.itemToEdit.phoneNo
  //     );
  //     this.addEditOrganisersForm.controls.shortInfo.patchValue(
  //       this.itemToEdit.shortInfo
  //     );
  //     this.addEditOrganisersForm.controls.profilePic.patchValue(
  //       this.itemToEdit.profilePic
  //     );
  //     this.displayAddEditOrganiser = true;
  //   } else {
  //     // add
  //     this.displayAddEditOrganiser = true;
  //   }
  // }
  openAddEditOrganisers(item?) {
    // edit
    if (item) {
      console.log('okay fine' + JSON.stringify(item));

      this.itemToEdit = item;
      this.displayAddEditOrganiser = true;
    } else {
      // add
      this.displayAddEditOrganiser = true;
    }
  }
  closeAddEditOrganisers() {
    this.addEditOrganisersForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditOrganiser = false;
    this.itemToEdit = null;
  }

  getAllOrganisersListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getAllHost(this.payload).subscribe(
      (success: any) => {
        this.OrganisersListing = success.data.user_list;
        this.totalRecords = success.data.totalDataCount;
        this.utilityService.resetPage();
        console.log('check value' + JSON.stringify(this.OrganisersListing))
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
      this.getAllOrganisersListing();
    });

  }

  uploadImage(event, key) {
    console.log(event)
    this.selectedFile = <File>event.target.files[0];

    console.log(this.selectedFile);
    this.uploader.fileUploadImage(this.selectedFile)
      .subscribe((success: any) => {
        this.addEditOrganisersForm.controls[key].setValue(success.image.url);
        console.log(key + ' : ' + this.addEditOrganisersForm.value[key]);
        this.messageService.add({
          severity: 'success',
          summary: 'File added',
          detail: ''
        });
      });
  }

  addUpdateOrganiser() {
    console.log('Ok fine')
    let aboutBody;
    this.isAddFaqSubmitted = true;
    console.log(this.addEditOrganisersForm.valid)
    if (this.addEditOrganisersForm.valid) {
      this.utilityService.loaderStart();
      if (this.itemToEdit) {
        console.log('"update"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          name: this.addEditOrganisersForm.controls.name.value,
          email: this.addEditOrganisersForm.controls.email.value,
          password: this.addEditOrganisersForm.controls.password.value,
          phoneNo: this.addEditOrganisersForm.controls.phoneNo.value,
          city: this.addEditOrganisersForm.controls.city.value,
          state: this.addEditOrganisersForm.controls.state.value,
          address: this.addEditOrganisersForm.controls.address.value,
          userType: 'venuer',
          shortInfo: this.addEditOrganisersForm.controls.shortInfo.value,
          id: this.itemToEdit.id
        };
      } else {
        // console.log('create' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          name: this.addEditOrganisersForm.controls.name.value,
          email: this.addEditOrganisersForm.controls.email.value,
          password: this.addEditOrganisersForm.controls.password.value,
          phoneNo: this.addEditOrganisersForm.controls.phoneNo.value,
          city: this.addEditOrganisersForm.controls.city.value,
          state: this.addEditOrganisersForm.controls.state.value,
          address: this.addEditOrganisersForm.controls.address.value,
          userType: 'venuer',
          shortInfo: this.addEditOrganisersForm.controls.shortInfo.value,
        };
      }
      this.websiteContentService.addUpdateOrganiser(aboutBody).subscribe(
        (success: any) => {
          console.log('Create Organiser' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Organiser Updated');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Organiser Added');
          }
          this.closeAddEditOrganisers();
          this.getAllOrganisersListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.addEditOrganisersForm);
    }
  }

  // statusChange(e, id) {
  //   const data = {
  //    'is_active': e,
  //     'id': id
  //   }
  //   console.log('Data value' + JSON.stringify(data));
  //   this.websiteContentService.userStatus(data).subscribe((success: any) => {

  //   }, error => {
  //     this.utilityService.routingAccordingToError(error);
  //     this.getAllOrganisersListing();
  //   });

  // }
  changeStatus(status: any, id: any, index: any) {
    const body = {
      status: status.value
    }
    this.websiteContentService.userStatus(id, body).subscribe(
      (success: any) => {
        this.OrganisersListing[index].accountStatus = status.value;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }

  deleteOrganiser(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteOrganiser(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('Organiser Deleted');
            this.getAllOrganisersListing();
          });
      }
    });
  }
  searchList(event) {
    this.payload['searchValue'] = event.target.value;
    this.websiteContentService.getAllHost(this.payload).subscribe(
      (success: any) => {
        this.OrganisersListing = success.data.user_list;
        this.totalRecords = success.data.totalDataCount;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  selectSortValue(event) {
    this.payload['sortBy'] = event.value.id;
    this.getAllOrganisersListing();
  }

  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllOrganisersListing();
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
          this.getAllOrganisersListing()
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


