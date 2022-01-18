import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteContentRoutingModule } from './website-content-routing.module';
import { WebsiteContentLayoutComponent } from './website-content-layout/website-content-layout.component';

import { VenuerComponent } from './pages/venuer/venuer.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { EventComponent } from './pages/event/event.component';
import { SharedModule } from 'app/shared/shared.module';
import { PromoterComponent } from './pages/promoter/promoter.component';
import { subCategoryComponent } from './pages/subCategory/subCategory.component';
import { HostComponent } from './pages/host/host.component';
import { MemberComponent } from './pages/member/member.component';
import { SupportComponent } from './pages/support/support.component';
import { PaymentOrganiserComponent } from './pages/payment-organiser/payment-organiser.component';
import { UsersComponent } from './pages/users/users.component';
import { AccurateComponent } from './pages/accurate/accurate.component';
import { PaymentUserComponent } from './pages/payment-user/payment-user.component';
import { CommonComponent } from './pages/common/common.component';
import { VenueComponent } from './pages/venue/venue.component';
import { CategoryComponent } from './pages/category/category.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TemplateComponent } from './pages/template/template.component';
import { HightlightedEventsComponent } from './pages/event/hightlighted-events/hightlighted-events.component';
import { EventsDetailComponent } from './pages/event/events-detail/events-detail.component';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TooltipModule} from 'primeng/tooltip';
import {GalleriaModule} from 'primeng/galleria';
import { MapViewComponent } from './pages/venue/map-view/map-view.component';
import { VenueDetailComponent } from './pages/venue/venue-detail/venue-detail.component';
import { CreateVenueComponent } from './pages/venue/create-venue/create-venue.component';
import { SubAdminComponent } from './pages/sub-admin/sub-admin.component';
import { CreateEditSubAdminComponent } from './pages/sub-admin/create-edit-sub-admin/create-edit-sub-admin.component';
import { SubAdminDetailsComponent } from './pages/sub-admin/sub-admin-details/sub-admin-details.component';
import {GMapModule} from 'primeng/gmap';
import { NotesComponent } from './pages/notes/notes.component';
import { PaideventsComponent } from './pages/paidevents/paidevents.component';
import { PaidEventDetailsComponent } from './pages/paidevents/paid-event-details/paid-event-details.component';
import { PaidEventRulesComponent } from './pages/paidevents/paid-event-rules/paid-event-rules.component';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChipsModule} from 'primeng/chips';
import {RatingModule} from 'primeng/rating';
import { TagInputModule } from 'ngx-chips';
import { AvatarModule } from 'ngx-avatar';
import { IntlInputPhoneModule } from 'intl-input-phone';
import { SupportQueriesComponent } from './pages/support/support-queries/support-queries.component';
import { ArchivedEventComponent } from './pages/archived-event/archived-event.component';
import { HomePageDesignComponent } from './pages/home-page-design/home-page-design.component';

@NgModule({
  imports: [
    CommonModule,
    GalleriaModule,
    WebsiteContentRoutingModule,
    SharedModule,
    DropdownModule,
    PaginatorModule,
    GMapModule,
    ConfirmDialogModule,
    TooltipModule,
    MultiSelectModule,
    ChipsModule,
    RatingModule,
    TagInputModule,
    AvatarModule,
    IntlInputPhoneModule,
  ],
// tslint:disable-next-line: max-line-length
  declarations: [WebsiteContentLayoutComponent, TemplateComponent, CommonComponent, TicketsComponent, CategoryComponent, VenueComponent, PaymentUserComponent, UsersComponent, PaymentOrganiserComponent, MemberComponent, SupportComponent, VenuerComponent, TermsAndConditionsComponent, PrivacyPolicyComponent, EventComponent, PromoterComponent, subCategoryComponent, HostComponent, AccurateComponent, HightlightedEventsComponent, EventsDetailComponent, MapViewComponent, VenueDetailComponent, CreateVenueComponent, SubAdminComponent, CreateEditSubAdminComponent, SubAdminDetailsComponent, NotesComponent, PaideventsComponent, PaidEventDetailsComponent, PaidEventRulesComponent, UserDetailComponent, SupportQueriesComponent, ArchivedEventComponent, HomePageDesignComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class WebsiteContentModule { }
