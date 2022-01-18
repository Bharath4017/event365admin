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
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
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
  payload: object = {
    page: 1,
    search: '',
    type: '',
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
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
    // private carService: CarService
  ) { }

  reset() {
    // console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    //onsole.log(this.myInputVariable.nativeElement.files);
  }
  ngOnInit() {
    this.addEditCompanyForm = new FormGroup({
      categoryName: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.getAllCategoryListing();
  }
  onBasicUpload(e) {
    console.log(e);
  }
  openAddEditCompany(item?) {
    // edit
    if (item) {
      console.log('okay fine' + JSON.stringify(item));
      this.itemToEdit = this.CompanyListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditCompanyForm.controls.categoryName.patchValue(
        this.itemToEdit.categoryName
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
    this.itemToEdit = null;
  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllCategoryListing();
  }
  getAllCategoryListing() {
    this.cols = [
      { field: 'categoryName', header: 'categoryName' },
      // { field: 'year', header: 'Year' },
      // { field: 'brand', header: 'Brand' },
      // { field: 'color', header: 'Color' }
    ];
    this.utilityService.loaderStart();
    this.websiteContentService.getAllCategory(this.payload).subscribe(
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

  statusChange(e, id) {
    let data = {
      'isActive': e,
      'id': id
    }
    console.log('Data value' + JSON.stringify(data));
    this.websiteContentService.categoryStatus(data).subscribe((success: any) => {

    }, error => {
      this.utilityService.routingAccordingToError(error);
      this.getAllCategoryListing();
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
          categoryName: this.addEditCompanyForm.controls.categoryName.value,
          id: this.itemToEdit.id
        };
      } else {
        console.log('" create"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          categoryName: this.addEditCompanyForm.controls.categoryName.value,
        };
      }
      this.websiteContentService.addUpdateCategory(aboutBody).subscribe(
        (success: any) => {
          console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Category Updated');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Category Added');
            // this.reset();
          }
          this.closeAddEditCompany();
          this.getAllCategoryListing();
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
      message: 'event correspondence with this Category will be deleted?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteCategory(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('Category Deleted');
            this.getAllCategoryListing();
          });
      }
    });
  }
}
