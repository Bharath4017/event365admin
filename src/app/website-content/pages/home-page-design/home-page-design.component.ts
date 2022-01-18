import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-page-design',
  templateUrl: './home-page-design.component.html',
  styleUrls: ['./home-page-design.component.scss']
})

export class HomePageDesignComponent implements OnInit {
  // START: BANNER TAB 
  bannerDetails: BannerDetails;
  isFormSubmit = false;
  formBanner: FormGroup;
  isEnabled = false;
  EnbleDisableSliderImg:boolean;
  //DisableSliderImg = false;

  textColor = '#ffffff';
  bgColor = '#000000';
  //regex: any = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  regex: any = '^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$'; // fragment locator

  // END: BANNER TAB 

  // START: HEADER IMAGE TAB
  imageInterval: number;
  selectedFile: any = [];
  headerImagesList: any[] = [];
  isImageDeleted: any = [];
  showImageModal: any = false;
  imageURL: any = '';
  // END:  HEADER IMAGE TAB

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private websiteContentService: WebsiteContentService,
    private utilityService: UtilityService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.formBanner = this.fb.group({
      url: ['', [Validators.pattern(this.regex)]],
      bannerText: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    });

    this.getBannerDetails();
    this.getHeaderImages();
  }

  // START: BANNER
  getBannerDetails(): void {
    this.utilityService.loaderStart();
    this.websiteContentService.getBanner().subscribe(
      (result: any) => {
        this.utilityService.loaderStop();
        if (result.success) {
          this.bannerDetails = result.data;
          this.setBannerForm();
        }
      }, (error) => {
        this.utilityService.loaderStop();
        this.utilityService.routingAccordingToError(error);
      }
    );
  }

  setBannerForm(): void {
    if (this.bannerDetails) {
      this.formBanner.controls.url.setValue(this.bannerDetails.url);
      this.formBanner.controls.bannerText.setValue(this.bannerDetails.text);
      this.textColor = this.bannerDetails.text_color;
      this.bgColor = this.bannerDetails.bg_color;
      this.isEnabled = this.bannerDetails.isActive;
    }
  }

  statusChange(e): void {
    this.isEnabled = e;
  }

  updateBannerDetails(): void {
    this.isFormSubmit = true;

    if (!this.formBanner.valid) {
      return;
    }

    try {
      this.utilityService.loaderStart();

      const tempBannerDetails = new BannerDetails;
      tempBannerDetails.text = this.formBanner.value.bannerText;
      tempBannerDetails.url = this.formBanner.value.url;
      tempBannerDetails.text_color = this.textColor;
      tempBannerDetails.bg_color = this.bgColor;
      tempBannerDetails.isActive = this.isEnabled;

      if (this.bannerDetails) {
        tempBannerDetails.id = this.bannerDetails.id;
      }

      console.log(tempBannerDetails);

      this.websiteContentService.addUpdateBanner(tempBannerDetails).subscribe(
        (result: any) => {
          this.isFormSubmit = false;
          this.utilityService.loaderStop();
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: result.message,
              detail: ''
            });
          }
        }, (error) => {
          this.isFormSubmit = false;
          this.utilityService.loaderStop();
          this.utilityService.routingAccordingToError(error);
        }
      );
    } catch {
      this.utilityService.loaderStop();
    }
  }
  // END: BANNER


  // START: HEADER IMAGES
  onUpload(event): void {
    let fileurl = '';
    if (event.target.files) {
      for (let file of event.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e: any) => {
          fileurl = e.target.result;
          this.selectedFile.push({ id: '', image: fileurl, file: file });
        }
      }
    }
  }

  deleteImage(image: any, index: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      accept: () => {
        if (image.id !== '') {
          this.isImageDeleted.push(image.id);
        }
        this.selectedFile.splice(index, 1);
      }
    });
  }

  showImageDialog(image: any) {
    this.showImageModal = true;
    this.imageURL = image.venueImages;
  }

  addMultipleImages(): void {
    let uploadedCount = 0;
    this.utilityService.loaderStart();
    this.selectedFile.forEach(selectedFile => {
      this.websiteContentService.addHeaderImage(selectedFile.file).subscribe(
        (result: any) => {
          this.utilityService.loaderStop();
          if (result.success) {
            uploadedCount++;

            if (this.selectedFile.length === uploadedCount) {
              this.removeSelectedFiles();
              this.getHeaderImages();
            }
          }
        }, (error) => {
          this.utilityService.loaderStop();
          this.utilityService.routingAccordingToError(error);
        }
      );
    });
  }

  removeSelectedFiles(): void {
    this.selectedFile = [];
  }

  getHeaderImages(): void {
    this.utilityService.loaderStart();
    this.websiteContentService.getHeaderImageList().subscribe(
      (result: any) => {
        this.utilityService.loaderStop();
        if (result.success) {
          this.headerImagesList = result.data;
          this.EnbleDisableSliderImg =  result.data.status
          if (this.headerImagesList) {
            const headerImage = this.headerImagesList.find(x => x.time !== null);

            if (headerImage) {
              this.imageInterval = headerImage.time;
            }
          }
        }
      }, (error) => {
        this.utilityService.loaderStop();
        this.utilityService.routingAccordingToError(error);
      }
    );
  }

  minIntervalCheck(): boolean {
    if (this.imageInterval < 1) {
      return false;
    }
    return true;
  }

  updateHeaderImageInterval(): void {
    if (this.minIntervalCheck()) {
      const tempInterval = { time: this.imageInterval }
      const tempSelectedFiles = this.selectedFile;
      this.utilityService.loaderStart();
      this.websiteContentService.updateHeaderTimer(tempInterval).subscribe(
        (result: any) => {
          this.utilityService.loaderStop();
          if (result.success) {
            this.messageService.add({
              severity: 'success',
              summary: result.message,
              detail: ''
            });
  
            if (tempSelectedFiles && tempSelectedFiles.length > 0) {
              this.addMultipleImages();
            }
          }
        }, (error) => {
          this.utilityService.loaderStop();
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }

  onDeleteHeaderImageCall(id, index) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      accept: () => {
        this.deleteHeaderImage(id, index);
      }
    });
  }

  deleteHeaderImage(id, index): void {
    this.headerImagesList.splice(index, 1);
    this.utilityService.loaderStart();
    this.websiteContentService.deleteHeaderImage(id).subscribe(
      (result: any) => {
        this.utilityService.loaderStop();
        if (result.success) {
          this.messageService.add({
            severity: 'success',
            summary: result.message,
            detail: ''
          });
        }
      }, (error) => {
        this.utilityService.loaderStop();
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  // END: HEADER IMAGES
  enableImage(id, status){
     var body = {
      status: !status
      }
      this.utilityService.loaderStart();
      this.websiteContentService.updateHeaderSliderImage(id, body).subscribe(
        (result: any) => {
          this.utilityService.loaderStop();
          if (result.success) {
           this.getHeaderImages()
          }
        }, (error) => {
          this.utilityService.loaderStop();
          this.utilityService.routingAccordingToError(error);
        }
      );
  }

}

export class BannerDetails {
  id: number;
  bg_color: string;
  text: string;
  text_color: string;
  url: string;
  isActive: boolean;
}