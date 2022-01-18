import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { FileUploadService } from 'app/shared/services/file-upload.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { UtilityService } from 'app/shared/utility/utility.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
declare let google: any;
@Component({
  selector: 'app-create-venue',
  templateUrl: './create-venue.component.html',
  styleUrls: ['./create-venue.component.scss']
})
export class CreateVenueComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  timings: any = [{ key: '00:00', value: '00:00:00', number: 0 }, { key: '01:00', value: '01:00:00', number: 1 }, { key: '02:00', value: '02:00:00', number: 2 }, { key: '03:00', value: '03:00:00', number: 3 }, { key: '04:00', value: '04:00:00', number: 4 }, { key: '05:00', value: '05:00:00', number: 5 }, { key: '06:00', value: '06:00:00', number: 6 }, { key: '07:00', value: '07:00:00', number: 7 }, { key: '08:00', value: '08:00:00', number: 8 }, { key: '09:00', value: '09:00:00', number: 9 }, { key: '10:00', value: '10:00:00', number: 10 }, { key: '11:00', value: '11:00:00', number: 11 }, { key: '12:00', value: '12:00:00', number: 12 }, { key: '13:00', value: '13:00:00', number: 13 }, { key: '14:00', value: '14:00:00', number: 14 }, { key: '15:00', value: '15:00:00', number: 15 }, { key: '16:00', value: '16:00:00', number: 16 }, { key: '17:00', value: '17:00:00', number: 17 }, { key: '18:00', value: '18:00:00', number: 18 }, { key: '19:00', value: '19:00:00', number: 19 }, { key: '20:00', value: '20:00:00', number: 20 }, { key: '21:00', value: '21:00:00', number: 21 }, { key: '22:00', value: '22:00:00', number: 22 }, { key: '23:00', value: '23:00:00', number: 23 }, { key: '24:00', value: '24:00:00', number: 24 }];
  time: any;
  form: FormGroup;
  isShowSubVenue: any = false;
  subVenueList: any = [];
  selectedFile: any = [];
  venueImage: any = [];
  subVenueError: any = false;
  isSubmit: any = false;
  idSub: Subscription;
  venueDetailId: any = '';
  venueDetails: any;
  isSubVenueDelete: any = [];
  isAvailabilityDeleted: any = [];
  isImageDeleted: any = [];
  showImageModal: any = false;
  imageURL: any = '';
  @ViewChild('searchTextField') search: ElementRef;
  latitude: any = '';
  longitude: any = '';
  city: any = '';
  // tslint:disable-next-line:max-line-length
  // regex: any = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  
  regex: any = '^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\:.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$'; // fragment locator

  //  regex: any = '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$';
  
  constructor(private fb: FormBuilder, private location: Location, private uploader: FileUploadService,
    private messageService: MessageService, private activatedRoute: ActivatedRoute,
    private websiteContentService: WebsiteContentService, private utilityService: UtilityService) {
    this.idSub = this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.venueDetailId = params.get('id');
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_ ]*$')]],
      address: ['', [Validators.required]],
      // tslint:disable-next-line:max-line-length
      // websiteurl: ['', [Validators.required, ]],
      // tslint:disable-next-line:max-line-length
      websiteurl: ['', [Validators.pattern(this.regex)]],
      description: ['', [Validators.minLength(10), Validators.maxLength(200)]],
      eventType: ['indoor'],
      monday: [false],
      mondayId: [],
      mondayFrom: [{ key: '09:00', value: '09:00:00', number: 9 }],
      mondayTo: [{ key: '21:00', value: '21:00:00', number: 21 }],
      tuesday: [false],
      tuesdayId: [],
      tuesdayFrom: [{ key: '09:00', value: '09:00:00', number: 9 }],
      tuesdayTo: [{ key: '21:00', value: '21:00:00', number: 21 }],
      wednesday: [false],
      wednesdayId: [],
      wednesdayFrom: [{ key: '09:00', value: '09:00:00', number: 9 }],
      wednesdayTo: [{ key: '21:00', value: '21:00:00', number: 21 }],
      thrusday: [false],
      thursdayId: [],
      thrusdayFrom: [{ key: '09:00', value: '09:00:00', number: 9 }],
      thrusdayTo: [{ key: '21:00', value: '21:00:00', number: 21 }],
      friday: [false],
      fridayId: [],
      fridayFrom: [{ key: '09:00', value: '09:00:00', number: 9 }],
      fridayTo: [{ key: '21:00', value: '21:00:00', number: 21 }],
      saturday: [false],
      saturdayId: [],
      saturdayFrom: [{ key: '09:00', value: '09:00:00', number: 9 }],
      saturdayTo: [{ key: '21:00', value: '21:00:00', number: 21 }],
      sunday: [false],
      sundayId: [],
      sundayFrom: [{ key: '09:00', value: '09:00:00', number: 9 }],
      sundayTo: [{ key: '21:00', value: '21:00:00', number: 21 }],
      totalCapacity: ['', []],
      subVenue: [false]
    });
    var input = this.search.nativeElement;
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      var place = autocomplete.getPlace();
      console.log(place);
      var mapObject = { city: '' };
      for (let i = 0; i < place.address_components.length; i++) {
        switch (place.address_components[i].types[0]) {
          case 'country':
            mapObject['country'] = place.address_components[i].long_name;
            break;
          case 'administrative_area_level_1':
            mapObject['state'] = place.address_components[i].long_name;
            break;
          case 'administrative_area_level_2':
            mapObject['city'] = place.address_components[i].long_name;
            break;
          case 'route':
            mapObject['street'] = place.address_components[i].long_name;
            break;
          case '"postal_code"':
            mapObject['zipcode'] = place.address_components[i].long_name;
            break;
        }
      }

      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", mapObject);
      this.city = mapObject.city;
      this.form.controls.address.setValue(place.formatted_address);
      this.form.controls.address.updateValueAndValidity();
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      console.log('rtrt', this.latitude, this.longitude);
    });
    if (this.venueDetailId !== '') {
      this.fetchVenueDetails();
    }
  }

  fetchVenueDetails() {
    if (this.venueDetailId) {
      this.utilityService.loaderStart();
      this.websiteContentService.getVenueDetail(this.venueDetailId).subscribe(
        (success: any) => {
          this.venueDetails = success.data;
          this.utilityService.resetPage();
          this.form.controls.name.patchValue(
            this.venueDetails.venueName
          );
          this.form.controls.address.patchValue(
            this.venueDetails.venueAddress
          );
          this.form.controls.websiteurl.patchValue(
            this.venueDetails.websiteURL
          );
          this.form.controls.description.patchValue(
            this.venueDetails.shortDescription
          );
          this.form.controls.eventType.patchValue(
            this.venueDetails.venueType
          );
          this.form.controls.totalCapacity.patchValue(
            this.venueDetails.venueCapacity
          );
          this.city = this.venueDetails.city;
          if (this.venueDetails.daysAvailable.length > 0) {
            for (const data of this.venueDetails.daysAvailable) {
              if (data.weekDayName === 1) {
                this.form.controls.monday.patchValue(
                  true
                );
                this.form.controls.mondayId.patchValue(
                  data.id
                );
                this.form.controls.mondayFrom.patchValue(
                  this.timings.filter((a) => { return a.value === data.fromTime })[0]
                );
                this.form.controls.mondayTo.patchValue(
                  this.timings.filter((a) => { return a.value === data.toTime })[0]
                );
              }
              if (data.weekDayName === 2) {
                this.form.controls.tuesday.patchValue(
                  true
                );
                this.form.controls.tuesdayId.patchValue(
                  data.id
                );
                this.form.controls.tuesdayFrom.patchValue(
                  this.timings.filter((a) => { return a.value === data.fromTime })[0]
                );
                this.form.controls.tuesdayTo.patchValue(
                  this.timings.filter((a) => { return a.value === data.toTime })[0]
                );
              }
              if (data.weekDayName === 3) {
                this.form.controls.wednesday.patchValue(
                  true
                );
                this.form.controls.wednesdayId.patchValue(
                  data.id
                );
                this.form.controls.wednesdayFrom.patchValue(
                  this.timings.filter((a) => { return a.value === data.fromTime })[0]
                );
                this.form.controls.wednesdayTo.patchValue(
                  this.timings.filter((a) => { return a.value === data.toTime })[0]
                );
              }
              if (data.weekDayName === 4) {
                this.form.controls.thrusday.patchValue(
                  true
                );
                this.form.controls.thursdayId.patchValue(
                  data.id
                );
                this.form.controls.thrusdayFrom.patchValue(
                  this.timings.filter((a) => { return a.value === data.fromTime })[0]
                );
                this.form.controls.thrusdayTo.patchValue(
                  this.timings.filter((a) => { return a.value === data.toTime })[0]
                );
              }
              if (data.weekDayName === 5) {
                this.form.controls.friday.patchValue(
                  true
                );
                this.form.controls.fridayId.patchValue(
                  data.id
                );
                this.form.controls.fridayFrom.patchValue(
                  this.timings.filter((a) => { return a.value === data.fromTime })[0]
                );
                this.form.controls.fridayTo.patchValue(
                  this.timings.filter((a) => { return a.value === data.toTime })[0]
                );
              }
              if (data.weekDayName === 6) {
                this.form.controls.saturday.patchValue(
                  true
                );
                this.form.controls.saturdayId.patchValue(
                  data.id
                );
                this.form.controls.saturdayFrom.patchValue(
                  this.timings.filter((a) => { return a.value === data.fromTime })[0]
                );
                this.form.controls.saturdayTo.patchValue(
                  this.timings.filter((a) => { return a.value === data.toTime })[0]
                );
              }
              if (data.weekDayName === 7) {
                this.form.controls.sunday.patchValue(
                  true
                );
                this.form.controls.sundayId.patchValue(
                  data.id
                );
                this.form.controls.sundayFrom.patchValue(
                  this.timings.filter((a) => { return a.value === data.fromTime })[0]
                );
                this.form.controls.sundayTo.patchValue(
                  this.timings.filter((a) => { return a.value === data.toTime })[0]
                );
              }
            }
          }
          console.log('this.form.controls', this.form.controls)
          if (this.venueDetails.subVenues.length > 0) {
            this.form.controls.subVenue.patchValue(
              true
            );
            this.isShowSubVenue = true;
            this.subVenueList = this.venueDetails.subVenues;
          }
          this.selectedFile = this.venueDetails.venueImages;
          this.latitude = this.venueDetails.latitude;
          this.longitude = this.venueDetails.longitude;
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  showSubVenue(event: any) {
    console.log("EEEEEEEEEEEEEEEE", event);
    if (event) {
      this.isShowSubVenue = true;
      if (this.subVenueList.length == 0) {
        this.subVenueList.push({ subVenueName: '', subVenueCapacity: 0 });
      }
    } else {
      this.isShowSubVenue = false;
    }
  }
  addSubVenue() {
    this.subVenueList.map((a) => {
      if (a.subVenueName === '') {
        this.subVenueError = true;
      }
      if (!a.subVenueCapacity || a.subVenueCapacity === 0) {
        this.subVenueError = true;
      }
    })
    if (this.subVenueError) {
      return;
    }
    this.subVenueList.push({ subVenueName: '', subVenueCapacity: 0 });
  }
  deleteSubVenue(item: any, index: any) {
    if (item.id && item.id !== '') {
      this.isSubVenueDelete.push(item.id);
    }
    this.subVenueList.splice(index, 1);
  }
  changeSubVenueName(event: any, index: any) {
    if (event.target.value === '') {
      this.subVenueError = true;
    } else {
      this.subVenueError = false;
    }
    this.subVenueList[index].subVenueName = event.target.value;
  }
  changeSubVenueCapacity(event: any, index: any) {
    if (!event.target.value) {
      this.subVenueError = true;
    } else {
      this.subVenueError = false;
    }
    this.subVenueList[index].subVenueCapacity = parseInt(event.target.value);
  }
  goBack() {
    this.location.back();
  }
  openPopup(id) {
    $(id).trigger('click');
  }
  onUploadPicture(event) {
    let fileurl = '';
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (e: any) => {
        fileurl = e.target.result;
        this.selectedFile.push({ id: '', venueImages: fileurl, file: event.target.files[0] });
        console.log('Filesssssssssssssssssss', this.selectedFile)
      }
    }
  }

  createVenue() {
    this.isSubmit = true;
    if (this.form.invalid) {
      return;
    }
    if (this.latitude === '' && this.longitude === '') {
      return;
    }
    console.log(this.form.value);
    let availabilityList = [];
    if (this.form.value.monday) {
      if (this.form.value.mondayFrom.number > this.form.value.mondayTo.number) {
        return
      }
      if (this.venueDetailId !== '' && this.form.value.mondayId && this.form.value.mondayId !== '') {
        // tslint:disable-next-line:max-line-length
        availabilityList.push({ weekDayName: 1, fromTime: this.form.value.mondayFrom.value, toTime: this.form.value.mondayTo.value, id: this.form.value.mondayId });
      } else {
        availabilityList.push({ weekDayName: 1, fromTime: this.form.value.mondayFrom.value, toTime: this.form.value.mondayTo.value });
      }
    }
    if (this.form.value.tuesday) {
      if (this.form.value.tuesdayFrom.number > this.form.value.tuesdayTo.number) {
        return
      }
      if (this.venueDetailId !== '' && this.form.value.tuesdayId && this.form.value.tuesdayId !== '') {
        // tslint:disable-next-line:max-line-length
        availabilityList.push({ weekDayName: 2, fromTime: this.form.value.tuesdayFrom.value, toTime: this.form.value.tuesdayTo.value, id: this.form.value.tuesdayId });
      } else {
        availabilityList.push({ weekDayName: 2, fromTime: this.form.value.tuesdayFrom.value, toTime: this.form.value.tuesdayTo.value });
      }
    }
    if (this.form.value.wednesday) {

      if (this.form.value.wednesdayFrom.number > this.form.value.wednesdayTo.number) {
        return
      }
      if (this.venueDetailId !== '' && this.form.value.wednesdayId && this.form.value.wednesdayId !== '') {
        // tslint:disable-next-line:max-line-length
        availabilityList.push({ weekDayName: 3, fromTime: this.form.value.wednesdayFrom.value, toTime: this.form.value.wednesdayTo.value, id: this.form.value.wednesdayId });
      } else {
        availabilityList.push({ weekDayName: 3, fromTime: this.form.value.wednesdayFrom.value, toTime: this.form.value.wednesdayTo.value });
      }
    }
    if (this.form.value.thrusday) {

      if (this.form.value.thrusdayFrom.number > this.form.value.thrusdayTo.number) {
        return
      }
      if (this.venueDetailId !== '' && this.form.value.thursdayId && this.form.value.thursdayId !== '') {
        // tslint:disable-next-line:max-line-length
        availabilityList.push({ weekDayName: 4, fromTime: this.form.value.thrusdayFrom.value, toTime: this.form.value.thrusdayTo.value, id: this.form.value.thursdayId });
      } else {
        availabilityList.push({ weekDayName: 4, fromTime: this.form.value.thrusdayFrom.value, toTime: this.form.value.thrusdayTo.value });
      }
    }
    if (this.form.value.friday) {

      if (this.form.value.fridayFrom.number > this.form.value.fridayTo.number) {
        return
      }
      if (this.venueDetailId !== '' && this.form.value.fridayId && this.form.value.fridayId !== '') {
        // tslint:disable-next-line:max-line-length
        availabilityList.push({ weekDayName: 5, fromTime: this.form.value.fridayFrom.value, toTime: this.form.value.fridayTo.value, id: this.form.value.fridayId });
      } else {
        availabilityList.push({ weekDayName: 5, fromTime: this.form.value.fridayFrom.value, toTime: this.form.value.fridayTo.value });
      }
    }
    if (this.form.value.saturday) {
      if (this.form.value.saturdayFrom.number > this.form.value.saturdayTo.number) {
        return
      }
      if (this.venueDetailId !== '' && this.form.value.saturdayId && this.form.value.saturdayId !== '') {

        // tslint:disable-next-line:max-line-length
        availabilityList.push({ weekDayName: 6, fromTime: this.form.value.saturdayFrom.value, toTime: this.form.value.saturdayTo.value, id: this.form.value.saturdayId });
      } else {
        availabilityList.push({ weekDayName: 6, fromTime: this.form.value.saturdayFrom.value, toTime: this.form.value.saturdayTo.value });
      }
    }
    if (this.form.value.sunday) {

      if (this.form.value.sundayFrom.number > this.form.value.sundayTo.number) {
        return
      }
      if (this.venueDetailId !== '' && this.form.value.sundayId && this.form.value.sundayId !== '') {

        // tslint:disable-next-line:max-line-length
        availabilityList.push({ weekDayName: 7, fromTime: this.form.value.sundayFrom.value, toTime: this.form.value.sundayTo.value, id: this.form.value.sundayId });
      } else {
        availabilityList.push({ weekDayName: 7, fromTime: this.form.value.sundayFrom.value, toTime: this.form.value.sundayTo.value });
      }
    }
    let venueImagesArray = [];
    if (this.selectedFile.length > 0) {
      this.selectedFile.forEach(element => {
        if (element.id !== '') {
          // venueImagesArray.push(element);
        } else {
          venueImagesArray.push(element.file);
        }
      });
    }

    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA', venueImagesArray)
    let body = {
      venueName: this.form.value.name,
      venueAddress: this.form.value.address,
      websiteURL: this.form.value.websiteurl,
      shortDescription: this.form.value.description,
      venueType: this.form.value.eventType,
      venueCapacity: this.form.value.totalCapacity === '' ? 0: parseInt(this.form.value.totalCapacity),
      latitude: this.latitude,
      longitude: this.longitude,
      countryCode: '+91',
      city: this.city,
      // isVenueAvailableToOtherHosts: true
    };
    let count = 0;
    if (this.isShowSubVenue) {

      for (const s of this.subVenueList) {
        if (s.subVenueName.trim() === '') {
          return;
        }
        if (s.subVenueCapacity === 0) {
          return;
        }
        count = count + s.subVenueCapacity;

      }
      if (count > parseInt(this.form.value.totalCapacity)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Sub-venue capacity should be less then total capacity!',
          detail: ''
        });
        return;
      }
      body['subVenue'] = JSON.stringify(this.subVenueList);
    }
    if (availabilityList.length > 0) {
      body['availability'] = JSON.stringify(availabilityList);
    }
    if (this.venueDetailId !== '') {
      body['id'] = this.venueDetailId;
    }
    if (this.isAvailabilityDeleted.length > 0) {
      body['isAvailabilityDeleted'] = this.isAvailabilityDeleted;
    }
    if (this.isSubVenueDelete.length > 0) {
      body['isSubVenueDeleted'] = JSON.stringify(this.isSubVenueDelete);
    }
    if (this.isImageDeleted.length > 0) {
      body['isImageDeleted'] = JSON.stringify(this.isImageDeleted);
    }
    console.log('availabilityList', availabilityList);
    console.log('body', body);
    this.utilityService.loaderStart();
    this.websiteContentService.postCreateVenue(body, venueImagesArray).subscribe(
      (res: any) => {
        this.utilityService.resetPage();
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: res.message,
            detail: ''
          });
          this.goBack();
        }
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  deleteImage(image: any, index: any) {
    if (image.id !== '') {
      this.isImageDeleted.push(image.id);
    }
    this.selectedFile.splice(index, 1);
  }
  showImageDialog(image: any) {
    this.showImageModal = true;
    this.imageURL = image.venueImages;
  }
  handleChange(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      return;
    }
  }
}
