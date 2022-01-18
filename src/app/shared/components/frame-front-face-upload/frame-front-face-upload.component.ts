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

import { ImageBorder } from './image-border';

declare var $: any;

@Component({
  selector: 'app-frame-front-face-upload',
  templateUrl: './frame-front-face-upload.component.html',
  styleUrls: ['./frame-front-face-upload.component.scss']
})
export class FrameFrontFaceUploadComponent implements OnInit {

  @Input() businessId: string;
  @Input() currentImage: string;
  @Input() basePathToUploadFiles: string;
  @Output() frontFaceData = new EventEmitter();
  @Output() fileUploadReset = new EventEmitter();
  @Output() fileSelected = new EventEmitter();
  @ViewChild('inputFile') fileUploadInput: ElementRef;

  dialogMessages = [];
  imagePath;
  previewImage: any;
  message: string;
  uploadProgressPercent: number;
  progressState: string;
  imageWidth;
  imageHeight;
  // uploadTask: AngularFireUploadTask;
  current_page = 1;
  displayAddImageForm = false;
  eventFromFileInput: any;
  finalDownloadUrl: string;
  spinnerStatus = false;
  border = [];
  noImage = true;

  constructor(
    private utilityService: UtilityService,
    private confirmationService: ConfirmationService,
    private fileUploadService: FileUploadService,
    private errorHandlerService: ErrorHandlerService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {

    // display current image in image preview if there is any during EDIT
    if (this.currentImage) {
      this.previewImage = this.currentImage;
    }
    //new ImageBorder()
  }


  notifyParentDataUpdated(data) {
    this.frontFaceData.emit(data);
  }

  preview(file) {
    this.eventFromFileInput = file;

    let thisObject = this;
    const files = file.target.files;
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    /** get the image width and height to maintain max limit */
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.previewImage = reader.result;
      const imageText = new Image();
      imageText.src = this.previewImage;
      imageText.onload = function () {
        thisObject.imageWidth = imageText.width;
        thisObject.imageHeight = imageText.height;

        /** calculate scale */
        const scale = Math.min(300, (30000 / thisObject.imageWidth) | 0);
        thisObject.setScale(scale);
        $('#subject').attr('data-scale', scale);

        /** Initiate Image Border for each guideline slider */
        $('.guideline').each(function () {
          const borderType = $(this).data('topic').split('-')[1];

          thisObject.border[borderType] = new ImageBorder(this);

          /** set max slider limit */
          if (borderType === 'top' || borderType === 'bottom') {
            thisObject.border[borderType].setMax(thisObject.imageHeight);

          } else {
            thisObject.border[borderType].setMax(thisObject.imageWidth);
          }
          /** update default image position */
          thisObject.border[borderType].updateGuidelinePos();
        })
      }
    };
    this.noImage = false;
  }

  /** This function is bind with the guideline slider to get the position */
  drageEvent(e) {
    const thisObject = e.target;
    const borderType = $(thisObject).attr('data-topic').split('-')[1];
    this.border[borderType].startDrag(e);

  }

  /** set image width height css based on calculated scale */
  setScale(value) {

    const scale = value;

    const w = this.imageWidth * scale / 100 | 0;
    const h = this.imageHeight * scale / 100 | 0;
    $('#subject').css({
      'width': w + 'px',
      'height': h + 'px'
    });

  }

  uploadFile() {
    const coordinates = [];
    // this.loader.start();
    this.utilityService.loaderStart();
    const file = this.eventFromFileInput.target.files[0];

    const thisObject = this;

    /** this can be used to get the set data value - go for the order - top right bottom left */
    $('.guideline').each(function () {
      if ($(this).data('value')) {
        coordinates.push($(this).data('value'));
      }
    });

    this.fileUploadService.fileUploadImage(file).subscribe(
      response => {
        this.utilityService.loaderStop();
        this.notifyParentDataUpdated({ response, coordinates })
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
    // create a unique file name by adding timestamp
    // const currentTimeStamp = new Date();
    // const filePath = `${this.basePathToUploadFiles}/${
    //   file.name
    // }${currentTimeStamp.toISOString()}`;

    // this.fileUploadService.fileUploadImage(file).subscribe(
    //   (success: any) => {
    //     this.spinnerStatus = false;
    //     this.finalDownloadUrl = success.image;
    //     this.notifyParentDataUpdated();
    //     this.spinnerStatus = false;
    //   },
    //   error => {
    //     this.errorHandlerService.routeAccordingToError(error);
    //     this.spinnerStatus = false;
    //   }
    // );

    // get notified when the download URL is available - if download link is required for image
    /*
                this.finalDownloadUrl = url;
                this.notifyParentDataUpdated();
                this.spinnerStatus = false;
    */
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

    const thisObject = this;
    $('.guideline').each(function () {
      var borderType = $(this).data('topic').split('-')[1];

      thisObject.border[borderType] = new ImageBorder(this);
      thisObject.border[borderType].updateGuidelinePos();
    });

    this.noImage = true;

    this.notifyParentReset();
  }

  notifyParentReset() {
    this.fileUploadReset.emit(true);
  }

}
