import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { finalize, map } from 'rxjs/operators';
import { UtilityService } from 'app/shared/utility/utility.service';
import { FileUploadService } from 'app/shared/services/file-upload.service';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, of, from } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() currentImage: string;
  @Input() basePathToUploadFiles: string;
  @Output() downloadUrl = new EventEmitter();
  @Output() fileUploadReset = new EventEmitter();
  @Output() fileSelected = new EventEmitter();
  @ViewChild('inputFile') fileUploadInput: ElementRef;

  dialogMessages = [];
  imagePath;
  previewImage: any;
  message: string;
  uploadProgressPercent: number;
  progressState: string;
  // uploadTask: AngularFireUploadTask;
  current_page = 1;
  displayAddImageForm = false;
  eventFromFileInput: any;
  finalDownloadUrl: string;
  spinnerStatus = false;

  constructor(
    private utilityService: UtilityService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit() {
    // display current image in image preview if there is any during EDIT
    if (this.currentImage) {
      this.previewImage = this.currentImage;
    }
  }

  notifyParentDataUpdated() {
    this.downloadUrl.emit(this.finalDownloadUrl);
  }

  notifyParentReset() {
    this.fileUploadReset.emit(true);
  }

  notifyParentFileIsSelected() {
    this.fileSelected.emit(true);
  }

  preview(file) {
    this.eventFromFileInput = file;
    const files = file.target.files;
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.previewImage = reader.result;
    };

    this.notifyParentFileIsSelected();
  }

  uploadFile(): Observable<any> {
    // hit the File Upoading API if the user uses the FILE UPLOADER
    if (this.eventFromFileInput) {
      let file;
      file = this.eventFromFileInput.target.files[0];

      // create a unique file name by adding timestamp
      // const currentTimeStamp = new Date();
      // const filePath = `${this.basePathToUploadFiles}/${
      //   file.name
      // }${currentTimeStamp.toISOString()}`;

      return this.fileUploadService.fileUploadImage(file).pipe(
        map(
          response => {
            return response;
          },
          error => {
            this.utilityService.routingAccordingToError(error);
          }
        )
      );
    } else {
      // return observable of a string in case the user doesn't use the file uploader (in case of edit)
      return of('Image not uploaded / changed');
    }
  }

  cancelCurrentUpload() {
    this.resetUploadInputForm();
  }

  resetUploadInputForm() {
    this.fileUploadInput.nativeElement.value = '';

    // if there was a image already during edit - reset to the original image present
    if (this.currentImage) {
      this.previewImage = this.currentImage;
    } else {
      this.previewImage = null;
    }
    this.progressState = null;
    this.eventFromFileInput = null;
    this.uploadProgressPercent = 0;
    this.dialogMessages = [];

    this.notifyParentReset();
  }
}
