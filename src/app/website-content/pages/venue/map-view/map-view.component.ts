import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UtilityService } from 'app/shared/utility/utility.service';
import { MessageService } from 'primeng/api';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { Router } from '@angular/router';
declare let google: any;
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  options: any;
  CompanyListing: any[] = [];
  overlays: any = [];
  payload: object = {
    sortBy: '',
    searchValue: ''
  };
  infoWindow: any;
  constructor(
    private utilityService: UtilityService,
    private router: Router,
    private websiteContentService: WebsiteContentService,
    private messageService: MessageService,
    private location: Location) { }

  ngOnInit() {
    this.getAllCompanyListing();
    // this.options = {
    //   center: { lat: 36.890257, lng: 30.707417 },
    //   zoom: 12
    // };
    // this.overlays = [
    //   new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
    //   new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
    //   new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
    // ]
    this.infoWindow = new google.maps.InfoWindow();
  }
  goBack() {
    this.location.back();
  }
  getAllCompanyListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getAllVenuesMaps().subscribe(
      (success: any) => {
        this.CompanyListing = success.data;
        this.options = {
          center: { lat: Number(this.CompanyListing[this.CompanyListing.length - 1].latitude), lng: Number(this.CompanyListing[this.CompanyListing.length - 1].longitude) },
          zoom: 2
        };
        // this.overlays.push(
        //          new google.maps.Marker({ position: { lat: 22.7643066, lng: 75.8871281 }, title: 'amar deep', venueData: '' }))
        for (const data of this.CompanyListing) {
          if (data.latitude !== '' && data.longitude !== '') {
            this.overlays.push(
              new google.maps.Marker({ position: { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }, title: data.venueName, venueData: data }))
          }
        }
        this.utilityService.resetPage();
        //  console.log('check value' + JSON.stringify(this.CompanyListing))
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  navigate(id) {
    console.log('DDDDDDDDDDDDDDDDDDDDDD', id);
  }
  handleOverlayClick(event) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA', event.overlay.venueData);
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '<br>' + `<a id="infoWindowButton" href="javascript:;" (click)="navigate(${event.overlay.venueData.id})">
        <span>Click to View Venue</span>
      </a><br> `+ 'Sub-venue: ' + event.overlay.venueData.subvenuecount + '<br>' + 'Total capacity: ' + event.overlay.venueData.venueCapacity + '<br>' + event.overlay.venueData.venueAddress + '<br>');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
      this.infoWindow.addListener('domready', () => {
        document.getElementById("infoWindowButton").addEventListener("click", () => {
          document.getElementById("infoWindowButton").removeEventListener('click', () => { }, false);
          localStorage.setItem('venueFrom', '/map-view');
          this.router.navigate([`/venue-detail/${event.overlay.venueData.id}`])
        });
      });
      this.messageService.add({ severity: 'info', summary: 'Marker Selected', detail: title });
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Shape Selected', detail: '' });
    }
  }
}
