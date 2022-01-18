import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { PaideventService } from 'app/shared/services/paidevent.service';

@Component({
  selector: 'app-paid-event-details',
  templateUrl: './paid-event-details.component.html',
  styleUrls: ['./paid-event-details.component.scss']
})
export class PaidEventDetailsComponent implements OnInit {
  sortByArray: any = [{ id: 0, name: 'A-Z (Alphabetically)' }, { id: 1, name: 'Z-A (Reverse Alphabetically)' }, { id: 2, name: 'Ticket Type: Free' }, { id: 3, name: 'Ticket Type: Paid' }, { id: 4, name: 'Ticket Type: RSVP' }, { id: 5, name: 'Ticket Type: VIP' }, { id: 6, name: 'Ticket Type: Table and Seatings' }];
  UsersList: any = [];
  idSub: Subscription;
  eventDetailId: any;
  eventDetails: any;
  showImageModal: any = false;
  imageURL: any = '';
  constructor(private activatedRoute: ActivatedRoute,
    private websiteContentService: WebsiteContentService,
    private router: Router,
    private paidEventService: PaideventService,
    private utilityService: UtilityService,
    private location: Location) {
    this.idSub = this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.eventDetailId = params.get('id');
      }
    });
  }

  ngOnInit() {
    this.fetchEventDetails();
  }
  showImageDialog(imageUrl: any) {
    this.showImageModal = true;
    this.imageURL = imageUrl;
  }
  fetchEventDetails() {
    if (this.eventDetailId) {
      this.utilityService.loaderStart();
      this.paidEventService.getEventDetails(this.eventDetailId).subscribe(
        (success: any) => {
          console.log('success', success.data);
          this.eventDetails = success.data;
          this.UsersList.push({
            name: success.data.users.name,
            email: success.data.users.email,
            hostAddress: success.data.hostAddress,
            paymentDateTime: success.data.paymentDateTime,
            TransactionId: success.data.paymentDetail,
            invoiceNo: success.data.invoiceNo,
            MinPaidAmount: success.data.MinPaidAmount,
            status: 'Success'
          })
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  // getSubCategoryName(subCategoryName) {
  //   const categoryName = subCategoryName.map(({ subCategoryName }) => subCategoryName);
  //   return categoryName.toString();
  // }
  goBack() {
    this.location.back();
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
  }
  goTo(id) {
    localStorage.setItem('venueFrom', `/paideventdetails/${this.eventDetailId}`);
    this.router.navigate([`/venue-detail/${id}`]);
  }
}
