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
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditSupportForm: FormGroup;
  SupportListing: any[] = [];
  displayAddEditOrganiser = false;
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
    toolbarPosition: 'top'
  };
  payload: object = {
    page: 1,
    search: '',
    type: '',
  };

  // toolbar = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline'], // toggled buttons
  //     [{ header: 1 }, { header: 2 }], // custom button values
  //     [{ list: 'ordered' }, { list: 'bullet' }],
  //     [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  //     [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  //     // [{ font: [] }],
  //     [{ align: [] }],
  //     ['clean'] // remove formatting button
  //   ]
  // };

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private uploader: FileUploadService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addEditSupportForm = new FormGroup({
      heading: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ])
    });
    this.getAllSupportListing();
    this.cols = [
      { field: 'heading', header: 'heading' }
    ];
  }
  onBasicUpload(e) {
    console.log(e);
  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllSupportListing();
  }

  openAddEditOrganisers(item?) {
    // edit
    if (item) {
      console.log('item', item)
      this.itemToEdit = this.SupportListing.find(kubernetes => kubernetes.id === item.id);
      this.addEditSupportForm.controls.heading.patchValue(
        this.itemToEdit.heading
      );
      this.displayAddEditOrganiser = true;
    } else {
      // add
      this.displayAddEditOrganiser = true;
    }
  }

  goToSuportQuery(id) {
    this.router.navigate([`/support-queries/${id}`]);
  }

  closeAddEditOrganisers() {
    this.addEditSupportForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditOrganiser = false;
    this.itemToEdit = null;
  }
  statusChange(e, id) {
    const data = {
      'isActive': e,
      'id': id
    }
    console.log('Data value' + JSON.stringify(data));
    this.websiteContentService.statusIssues(data).subscribe((success: any) => {

    }, error => {
      this.utilityService.routingAccordingToError(error);
      this.getAllSupportListing();
    });

  }
  getAllSupportListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getAllIssues().subscribe(
      (success: any) => {
        this.SupportListing = success.data;
        this.utilityService.resetPage();
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
        this.addEditSupportForm.controls[key].setValue(success.image.url);
        console.log(key + ' : ' + this.addEditSupportForm.value[key]);
        this.messageService.add({
          severity: 'success',
          summary: 'File added',
          detail: ''
        });
      });
  }

  addUpdateIssues() {
    console.log('Ok fine')
    let aboutBody;
    this.isAddFaqSubmitted = true;
    console.log(this.addEditSupportForm.valid)
    if (this.addEditSupportForm.valid) {
      this.utilityService.loaderStart();
      if (this.itemToEdit) {
        console.log('update' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          heading: this.addEditSupportForm.controls.heading.value,
          type: 'issues',
          id: this.itemToEdit.id
        };
      } else {
        // console.log('create' + JSON.stringify(this.itemToEdit));
        aboutBody = {
          heading: this.addEditSupportForm.controls.heading.value,
          type: 'issues',
        };
      }
      this.websiteContentService.addUpdateIssues(aboutBody).subscribe(
        (success: any) => {
          console.log('Create Query' + JSON.stringify(this.itemToEdit));
          if (this.itemToEdit) {
            this.utilityService.successMessage('Query Updated');
            this.itemToEdit = null;
          } else {
            this.utilityService.successMessage('Query Added');
          }
          this.closeAddEditOrganisers();
          this.getAllSupportListing();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.addEditSupportForm);
    }
  }

  deleteIssues(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteIssues(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('Issue deleted successfully!');
            this.getAllSupportListing();
          });
      }
    });
  }
}
