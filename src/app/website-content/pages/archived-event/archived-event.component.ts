import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { Router } from '@angular/router';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FileUploadService } from 'app/shared/services/file-upload.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-archived-event',
  templateUrl: './archived-event.component.html',
  styleUrls: ['./archived-event.component.scss'],
  providers: [DatePipe]
})
export class ArchivedEventComponent implements OnInit {

  isAddFaqSubmitted = false;
  addEditCompanyForm: FormGroup;
  EventListing: any[] = [];
  displayAddEditAbout = false;
  selectedFile: File;
  mode: string;
  success: any;
  itemToEdit: any;
  aboutForm: FormGroup;
  cols: any[];
  data: any;
  payload: object = {
    page: 1,
    // limit: 100,
    searchValue: '',
    type: '',
    toDate: '',
    fromDate: '',
    categoryId: '',
    subCategoryId: ''
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
  allCategoriesSelect: any = false;
  selectedCategory: any = {};
  categorySubCategoryList: any = [];
  Object = Object;
  categoryTitle: any = 'Sort Categories';
  totalRecords: any = 0;
  searchValue: any = '';
  selectedFilterValue: any = '';
  filter = 'pi pi-filter';
  // tslint:disable-next-line:max-line-length
  filterArray: any = [{ id: '', name: 'All' }, { id: 'current', name: 'Current' }, { id: 'upcoming', name: 'Upcoming' }, { id: 'past', name: 'Past' }];
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
    private router: Router,
    private datePipe : DatePipe
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
    this.addEditCompanyForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      paidType: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      users: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      start: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      end: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      sellingStart: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      sellingEnd: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      eventHelpLine: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      userLikeCount: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      userDisLikeCount: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      address: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      description2: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      eventImages: new FormControl(''),
      // 
    });
    this.getAllEventListing();
    this.fetchCategorySubcategoryList();
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
      this.itemToEdit = this.EventListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditCompanyForm.controls.name.patchValue(
        this.itemToEdit.name
      );
      this.addEditCompanyForm.controls.paidType.patchValue(
        this.itemToEdit.paidType
      );
      this.addEditCompanyForm.controls.users.patchValue(
        this.itemToEdit.users.name
      );
      this.addEditCompanyForm.controls.start.patchValue(
        this.itemToEdit.start
      );
      this.addEditCompanyForm.controls.end.patchValue(
        this.itemToEdit.end
      );
      this.addEditCompanyForm.controls.sellingStart.patchValue(
        this.itemToEdit.sellingStart
      );
      this.addEditCompanyForm.controls.sellingEnd.patchValue(
        this.itemToEdit.sellingEnd
      );
      this.addEditCompanyForm.controls.description2.patchValue(
        this.itemToEdit.description2
      );
      this.addEditCompanyForm.controls.userLikeCount.patchValue(
        this.itemToEdit.userLikeCount
      );
      this.addEditCompanyForm.controls.userDisLikeCount.patchValue(
        this.itemToEdit.userDisLikeCount
      );
      this.addEditCompanyForm.controls.eventHelpLine.patchValue(
        this.itemToEdit.eventHelpLine
      );
      this.addEditCompanyForm.controls.address.patchValue(
        this.itemToEdit.address[0].venueAddress
      );
      this.addEditCompanyForm.controls.eventImages.patchValue(this.itemToEdit.eventImages[0].eventImage);
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

  getAllEventListing() {
    this.cols = [
      { field: 'name', header: 'name' },
      //  { field: 'paidType', header: 'paidType' },
      // { field: 'brand', header: 'Brand' },
      // { field: 'color', header: 'Color' }
    ];
    this.utilityService.loaderStart();
    this.websiteContentService.getAllArchivedEvents(this.payload).subscribe(
      (success: any) => {
        this.EventListing = success.data.eventList;
        this.totalRecords = success.data.totalDataCount;
        //  console.log('check value', this.EventListing)
        this.utilityService.resetPage();
        //  console.log('check value' + JSON.stringify(this.EventListing))
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
    this.getSortCategoriesName();
  }
  fetchCategorySubcategoryList() {
    this.websiteContentService.getCategorySubcategoryList().subscribe(
      (success: any) => {
        this.categorySubCategoryList = success.data;
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

  onToDateChange(value) {
    if (value) {
      this.minFromDate = new Date(value);
      console.log('minFromDate', this.minFromDate);
    }
  }
  searchByDate() {
    this.page = 1;
    let data = this.searchByDateForm.value;
    if (data.toDate == '') {
      this.payload['page'] = 1;
      this.payload['toDate'] = '';
    } else {
      this.payload['page'] = 1;
      this.payload['toDate'] = this.datePipe.transform(data.toDate, 'dd-MM-yyyy');
    }
    if (data.fromDate == '') {
      this.payload['page'] = 1;
      this.payload['fromDate'] = '';
    } else {
      this.payload['page'] = 1;
      this.payload['fromDate'] = this.datePipe.transform(data.fromDate, 'dd-MM-yyyy');
    }
    let categoryId = [];
    let subCategoryId = [];
    Object.keys(this.selectedCategory).forEach(element => {
      subCategoryId = [...subCategoryId, this.selectedCategory[element].subcategorySelect];
      if (this.selectedCategory[element].allChecked) {
        categoryId = [...categoryId, element];
      }
    });
    this.payload['searchValue'] = this.searchValue;
    this.payload['categoryId'] = categoryId.toString();
    this.payload['subCategoryId'] = subCategoryId.toString();
    this.payload['type'] = this.selectedFilterValue !== '' ? this.selectedFilterValue.id : '';
    this.getAllEventListing();
  }

  resetSearchForm() {
    //   this.payload['page'] = 1;
    this.payload['fromDate'] = '';
    this.payload['toDate'] = '';
    this.payload['categoryId'] = '';
    this.payload['subCategoryId'] = '';
    this.payload['searchValue'] = '';
    this.payload['type'] = '';
    this.selectedFilterValue = '';
    this.searchValue = '';
    this.searchByDateForm.reset();
    this.selectedCategory = {};
    this.categoryTitle = 'Sort Categories';
    this.allCategoriesSelect = false;
    this.getAllEventListing();
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
  // filterByStatus(value) {
  //   console.log('Type', value)
  //   this.payload['page'] = 1;
  // //  this.payload['limit'] = 100;
  //   this.payload['type'] = value;
  //   this.getAllEventListing();
  // }
  listing() {
    throw new Error('Method not implemented');
  }
  statusChange(e, id) {
    // tslint:disable-next-line: no-shadowed-variable
    const data = {
      'is_active': e,
      'id': id
    }
    this.websiteContentService.eventStatus(data).subscribe((success: any) => {
    this.utilityService.successMessage('Event status updated successfully!'); 
    }, error => {
      this.utilityService.routingAccordingToError(error);
      this.getAllEventListing();
    });

  }
  categorySelect(event, item) {
    event.stopPropagation();
    this.allCategoriesSelect = false;
    if (Object.keys(this.selectedCategory).includes(item.id.toString())) {
      if (this.selectedCategory[item.id].partialChecked) {
        const categoryId = item.subCategory.map(({ id }) => id);
        this.selectedCategory = {
          ...this.selectedCategory,
          [item.id]: { id: item.id, name: item.categoryName, allChecked: true, partialChecked: false, subcategorySelect: categoryId }
        }
      } else {
        delete this.selectedCategory[item.id];
      }
    } else {
      const categoryId = item.subCategory.map(({ id }) => id);
      this.selectedCategory = {
        ...this.selectedCategory,
        [item.id]: { id: item.id, name: item.categoryName, allChecked: true, partialChecked: false, subcategorySelect: categoryId }
      }
    }
    this.getSortCategoriesName();
  }
  subCategorySelect(event, item, category) {
    event.stopPropagation();
    this.allCategoriesSelect = false;
    if (this.selectedCategory[category.id] && this.selectedCategory[category.id].subcategorySelect.includes(item.id)) {
      const index = this.selectedCategory[category.id].subcategorySelect.findIndex(x => x === item.id);
      this.selectedCategory[category.id].subcategorySelect.splice(index, 1);
      this.selectedCategory[category.id].allChecked = false;
      this.selectedCategory[category.id].partialChecked = true;
      if (this.selectedCategory[category.id].subcategorySelect.length === 0) {
        delete this.selectedCategory[category.id];
      }
    } else {
      let data = [];
      if (this.selectedCategory[category.id] && this.selectedCategory[category.id].subcategorySelect) {
        data = this.selectedCategory[category.id].subcategorySelect;
      }
      this.selectedCategory = {
        ...this.selectedCategory,
        // tslint:disable-next-line:max-line-length
        [category.id]: { id: category.id, name: category.categoryName, allChecked: false, partialChecked: true, subcategorySelect: [...data, item.id] }
      }
    }
    if (this.selectedCategory[category.id] && this.selectedCategory[category.id].subcategorySelect.length === category.subCategory.length) {
      this.selectedCategory[category.id].allChecked = true;
      this.selectedCategory[category.id].partialChecked = false;
    }
    this.getSortCategoriesName();
  }
  selectAllCategories(event) {
    event.stopPropagation();
    this.allCategoriesSelect = true;
    this.selectedCategory = {};
    this.getAllEventListing();
  }

  getSortCategoriesName() {
    const categoryId = Object.keys(this.selectedCategory);
    let count = 0;
    if (categoryId && categoryId.length !== 0) {
      categoryId.forEach(element => {
        count = count + this.selectedCategory[element].subcategorySelect.length;
      });
      this.categoryTitle = count + ' items selected';
    } else {
      this.categoryTitle = 'Sort Categories';
    }
  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllEventListing();
  }
  goToEventDetail(id) {
    localStorage.setItem('eventsFrom', '/archived-events');
    this.router.navigate([`/event-detail/${id}`]);
  }

  deletEventsP(id): void {
    this.utilityService.loaderStart();
    this.websiteContentService.deleteEventsPermanent(id).subscribe(
      (result: any) => {
        this.utilityService.loaderStop();
        if (result.success) {
          this.messageService.add({
            severity: 'success',
            summary: result.message,
            detail: ''
          });
          this.getAllEventListing()
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
        this.deletEventsP(id);
      }
    });
  }
}
