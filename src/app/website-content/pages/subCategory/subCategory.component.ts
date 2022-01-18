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
  templateUrl: './subCategory.component.html',
  styleUrls: ['./subCategory.component.scss']
})

// tslint:disable-next-line: class-name
export class subCategoryComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditCompanyForm: FormGroup;
  CompanyListing: any[] = [];
  displayAddEditAbout = false;
  selectedFile: File;
  mode: string;
  success: any;
  itemToEdit: any;
  categoryId: any;
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
  cols: { field: string; header: string; }[];

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.categoryId = route.snapshot.params.id;
  }

  ngOnInit() {
    this.addEditCompanyForm = new FormGroup({
      subCategoryName: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.getAllCompanyListing();
  }
  onBasicUpload(e) {
    console.log(e);
  }
  openAddEditCompany(item?) {
    // edit
    if (item) {
      console.log(' this.categoryId', this.categoryId);
      console.log('okay fine' + JSON.stringify(item));
      this.itemToEdit = this.categoryId;
      this.itemToEdit = this.CompanyListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditCompanyForm.controls.subCategoryName.patchValue(
        this.itemToEdit.subCategoryName
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

  getAllCompanyListing() {
    this.cols = [
      { field: 'subCategoryName', header: 'subCategoryName' }
    ];
    this.utilityService.loaderStart();
    this.websiteContentService.getAllSubCategory(this.categoryId).subscribe(
      (success: any) => {
        console.log(success.data)
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

  statusChange(e, id) {
    let data = {
      'isActive': e,
      'id': id
    }
    console.log('Data value' + JSON.stringify(data));
    this.websiteContentService.SubcategoryStatus(data).subscribe((success: any) => {

    }, error => {
      this.utilityService.routingAccordingToError(error);
      this.getAllCompanyListing();
    });

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

  addUpdateSubCategory() {
    let aboutBody;
    this.isAddFaqSubmitted = true;
    if (this.addEditCompanyForm.valid) {
      this.utilityService.loaderStart();
      if (this.itemToEdit) {
        console.log('"update"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          categoryId: this.categoryId,
          subCategoryName: this.addEditCompanyForm.controls.subCategoryName.value,
          id: this.itemToEdit.id
        };
      } else {
        console.log('" create!!"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          categoryId: this.categoryId,
          subCategoryName: this.addEditCompanyForm.controls.subCategoryName.value,
        };
      }
      this.websiteContentService.addUpdateSubCategory(aboutBody).subscribe(
        (success: any) => {
          console.log('Sub Category' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Sub Category Updated');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Sub Category Added');
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

  deleteSubCategory(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteSubCategory(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('Sub Category Deleted');
            this.getAllCompanyListing();
          },
          error => {
            this.utilityService.routingAccordingToError(error);
          });
      }
    });
  }
}
