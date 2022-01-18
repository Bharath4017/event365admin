import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService } from 'primeng/api';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ExcelService } from 'app/shared/services/excel.service';
@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.scss'],
  providers: [ExcelService]
})
export class EventsDetailComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:max-line-length
  sortByArray: any = [{ id: 1, name: 'A-Z (Alphabetically)' }, { id: 2, name: 'Z-A (Reverse Alphabetically)' }, { id: 3, name: 'Ticket Type: Free' }, { id: 4, name: 'Ticket Type: Paid' }, { id: 5, name: 'Ticket Type: RSVP' }, { id: 6, name: 'Ticket Type: VIP' }, { id: 7, name: 'Ticket Type: Table and Seatings' }];
  idSub: Subscription;
  eventDetailId: any;
  eventDetails: any;
  attendeesList: any;
  payload: object = {
    page: 1,
    sortBy: '',
    eventId: '',
    searchValue: ''
  };
  selectedSortBy: any = '';
  totalRecords: any = 0;
  showImageModal: any = false;
  activeIndex: any = '';
  categoryName: any = '';
  subCategoryName: any = '';
  sellingStartDate: any = '';
  sellingEndDate: any = '';
  showTicketModalDetails: any = false;
  ticketDetails: any;
  ticketImage: any;
  imageURL: any = '';
  constructor(private activatedRoute: ActivatedRoute,
    private websiteContentService: WebsiteContentService,
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private excelService: ExcelService,
    private router: Router,
    private location: Location) {
    this.idSub = this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.eventDetailId = params.get('id');
      }
    });
  }

  ngOnInit() {
    this.fetchEventDetails();
    this.fetchAttendeesList();
  }
  fetchEventDetails() {
    if (this.eventDetailId) {
      this.utilityService.loaderStart();
      this.websiteContentService.getEventDetails(this.eventDetailId).subscribe(
        (success: any) => {
          this.eventDetails = success.data;
          const subcategoryName = this.eventDetails.eventSubCategories.map(({ subCategoryName }) => subCategoryName);
          this.subCategoryName = subcategoryName.join(', ');
          const categoryname = this.eventDetails.eventCategories.map(({ categoryName }) => categoryName);
          this.categoryName = categoryname.join(', ');
          let sellingstartDate = [];
          let sellingendDate = [];
          this.eventDetails.ticket_info.forEach(element => {
            if (element.sellingStartDate) {
              sellingstartDate.push(moment(element.sellingStartDate).format('MMMM Do YYYY'));
            }
            if (element.sellingEndDate) {
              sellingendDate.push(moment(element.sellingEndDate).format('MMMM Do YYYY'));
            }
          });
          this.sellingStartDate = sellingstartDate.join(', ');
          this.sellingEndDate = sellingendDate.join(', ');
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  archiveStatusChange(id,archiveStatus) {
    archiveStatus = !archiveStatus;

    if(archiveStatus == true) {

      this.confirmationService.confirm({
      message: 'Are you sure you want to Unarchive this event?',
      accept: () => {
        const data = {
          'isArchived': archiveStatus,
          'id': id,
          'archivedBy': 'admin'
        }
        console.log('Data value' + JSON.stringify(data));
        this.websiteContentService.archiveStatus(data).subscribe((success: any) => {
        this.utilityService.successMessage('Event Archived successfully!'); 
        this.fetchEventDetails();
        }, error => {
          this.utilityService.routingAccordingToError(error);
          // this.getAllEventListing();
        });
      }
    });
    } 
    if(archiveStatus == false){
      this.confirmationService.confirm({
      message: 'Are you sure you want to Archive this event?',
      accept: () => {
        const data = {
          'isArchived': archiveStatus,
          'id': id,
          'archivedBy': 'admin'
        }
        console.log('Data value' + JSON.stringify(data));
        this.websiteContentService.archiveStatus(data).subscribe((success: any) => {
        this.utilityService.successMessage('Event Archived successfully!');
        this.fetchEventDetails(); 
        }, error => {
          this.utilityService.routingAccordingToError(error);
          // this.getAllEventListing();
        });
      }
    });
    }
  }

  fetchAttendeesList() {
    if (this.eventDetailId) {
      this.utilityService.loaderStart();
      this.payload['eventId'] = this.eventDetailId;
      this.websiteContentService.getAttendeesList(this.payload).subscribe(
        (success: any) => {
          this.attendeesList = success.data.attendeesList;
          this.totalRecords = success.data.totalDataCount;
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  selectSortValue(event) {
    this.payload['sortBy'] = event.value.id;
    this.fetchAttendeesList();
  }
  showImageDialog(image: any) {
    this.showImageModal = true;
    this.imageURL = image.eventImage;
  }
  showTicketDialog(ticketDetails: any) {
    this.ticketImage = '';
    this.showTicketModalDetails = true;
    this.eventDetails.eventImages.forEach(element => {
      if (element.isPrimary) {
        this.ticketImage = element.eventImage;
      }
    });
    this.ticketDetails = ticketDetails;
    console.log('ttrt', ticketDetails);
  }
  goBack() {
    this.router.navigate([localStorage.getItem('eventsFrom')]);
  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.fetchEventDetails();
  }
  exportData() {
    if (this.eventDetailId) {
      this.utilityService.loaderStart();
      this.payload['eventId'] = this.eventDetailId;
      const data = this.payload;
      delete data['page'];
      this.websiteContentService.exportAttendeesList(this.payload).subscribe(
        (success: any) => {
          const attendeesList = [];
          success.data.forEach(element => {
            attendeesList.push(element.users);
          });
          // this.attendeesList = success.data.attendeesList;
          // this.totalRecords = success.data.totalDataCount;
          this.excelService.exportAsExcelFile(attendeesList, 'attendees_list');
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  searchAttendeesList(event: any) {
    this.payload['searchValue'] = event.target.value;
    if (this.eventDetailId) {
      this.payload['eventId'] = this.eventDetailId;
      this.websiteContentService.getAttendeesList(this.payload).subscribe(
        (success: any) => {
          this.attendeesList = success.data.attendeesList;
          this.totalRecords = success.data.totalDataCount;
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  goToVenueDetail() {
    if (this.eventDetails.venueEvents[0].venueId) {
      localStorage.setItem('venueFrom', `/event-detail/${this.eventDetailId}`);
      this.router.navigate([`/venue-detail/${this.eventDetails.venueEvents[0].venueId}`]);
    }
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
  }
}
