import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit, OnDestroy {
  idSub: Subscription;
  venueDetailId: any;
  venueDetails: any;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private websiteContentService: WebsiteContentService,
    private utilityService: UtilityService) {
    this.idSub = this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.venueDetailId = params.get('id');
      }
    });
  }

  ngOnInit() {
    this.fetchVenueDetails();
  }
  fetchVenueDetails() {
    if (this.venueDetailId) {
      this.utilityService.loaderStart();
      this.websiteContentService.getVenueDetail(this.venueDetailId).subscribe(
        (success: any) => {
          this.venueDetails = success.data;
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  goBack() {
    this.router.navigate([localStorage.getItem('venueFrom')]);
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
  }
}
