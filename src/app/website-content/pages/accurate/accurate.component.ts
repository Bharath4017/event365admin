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
  templateUrl: './accurate.component.html',
  styleUrls: ['./accurate.component.scss']
})
export class AccurateComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditAccurateForm: FormGroup;
  AccurateListing: any[] = [];
  displayAddEditAccurate = false;
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
    public utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.addEditAccurateForm = new FormGroup({
      heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      description: new FormControl('', [Validators.required, noWhitespaceValidator]),
      image: new FormControl(''),
    });
    this.getAllAccurateListing();
  }
  onBasicUpload(e) {
    console.log(e);
  }
  openAddEditAccurate(item?) {
    // edit
    if (item) {
      console.log('okay fine' + JSON.stringify(item));
      this.itemToEdit = this.AccurateListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditAccurateForm.controls.heading.patchValue(
        this.itemToEdit.heading
      );
      this.addEditAccurateForm.controls.image.patchValue(this.itemToEdit.image);
      this.addEditAccurateForm.controls.description.patchValue(this.itemToEdit.description);
      this.displayAddEditAccurate = true;
    } else {
      // add
      this.displayAddEditAccurate = true;
    }
  }

  closeAddEditAccurate() {
    this.addEditAccurateForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditAccurate = false;
  }

  getAllAccurateListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getAllAccurate().subscribe(
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


  uploadImage(event, key) {
    console.log(event)
    this.selectedFile = <File>event.target.files[0];

    console.log(this.selectedFile);
    this.uploader.fileUploadImage(this.selectedFile)
      .subscribe((success: any) => {
        this.addEditAccurateForm.controls[key].setValue(success.image.url);
        console.log(key + ' : ' + this.addEditAccurateForm.value[key]);
        this.messageService.add({
          severity: 'success',
          summary: 'File added',
          detail: ''
        });
      });
  }

  addUpdateAccurate() {
    let aboutBody;
    this.isAddFaqSubmitted = true;
    if (this.addEditAccurateForm.valid) {
      this.utilityService.loaderStart();
      if (this.itemToEdit) {
        console.log('"update"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          heading: this.addEditAccurateForm.controls.heading.value,
          description: this.addEditAccurateForm.controls.description.value,
          image: this.addEditAccurateForm.controls.image.value,
          id: this.itemToEdit.id
        };
      } else {
        console.log('" create"' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          heading: this.addEditAccurateForm.controls.heading.value,
          description: this.addEditAccurateForm.controls.description.value,
          image: this.addEditAccurateForm.controls.image.value,
        };
      }
      this.websiteContentService.addUpdateAccurate(aboutBody).subscribe(
        (success: any) => {
          console.log('" create"' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Accurate Updated');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Accurate Added');
          }
          this.closeAddEditAccurate();
          this.getAllAccurateListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.addEditAccurateForm);
    }
  }

  deleteAccurate(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteAccurate(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('Accurate Deleted');
            this.getAllAccurateListing();
          });
      }
    });
  }
}
