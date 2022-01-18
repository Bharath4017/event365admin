import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteContentLayoutComponent } from './website-content-layout/website-content-layout.component';

import { VenuerComponent } from './pages/venuer/venuer.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { EventComponent } from './pages/event/event.component';
import { PromoterComponent } from './pages/promoter/promoter.component';
import { subCategoryComponent } from './pages/subCategory/subCategory.component';
import { HostComponent } from './pages/host/host.component';
import { MemberComponent } from './pages/member/member.component';
import { SupportComponent } from './pages/support/support.component';
import { PaymentUserComponent } from './pages/payment-user/payment-user.component';

import { CommonComponent } from './pages/common/common.component';
import { PaymentOrganiserComponent } from './pages/payment-organiser/payment-organiser.component';
import { UsersComponent } from './pages/users/users.component';
import { AccurateComponent } from './pages/accurate/accurate.component';
import { VenueComponent } from './pages/venue/venue.component';
import { CategoryComponent } from './pages/category/category.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TemplateComponent } from './pages/template/template.component';
import { HightlightedEventsComponent } from './pages/event/hightlighted-events/hightlighted-events.component';
import { EventsDetailComponent } from './pages/event/events-detail/events-detail.component';
import { VenueDetailComponent } from './pages/venue/venue-detail/venue-detail.component';
import { CreateVenueComponent } from './pages/venue/create-venue/create-venue.component';
import { MapViewComponent } from './pages/venue/map-view/map-view.component';
import { SubAdminComponent } from './pages/sub-admin/sub-admin.component';
import { CreateEditSubAdminComponent } from './pages/sub-admin/create-edit-sub-admin/create-edit-sub-admin.component';
import { SubAdminDetailsComponent } from './pages/sub-admin/sub-admin-details/sub-admin-details.component';
import { NotesComponent } from './pages/notes/notes.component';
import { PaideventsComponent } from './pages/paidevents/paidevents.component';
import { PaidEventRulesComponent } from './pages/paidevents/paid-event-rules/paid-event-rules.component';
import { PaidEventDetailsComponent } from './pages/paidevents/paid-event-details/paid-event-details.component';
import { UserDetailComponent } from './pages/users/user-detail/user-detail.component';
import { SupportQueriesComponent } from './pages/support/support-queries/support-queries.component';
import { ArchivedEventComponent } from './pages/archived-event/archived-event.component';
import { HomePageDesignComponent } from './pages/home-page-design/home-page-design.component';
const routes: Routes = [
  {
    path: '',
    component: WebsiteContentLayoutComponent,
    children: [
      {
        path: 'subCategory/:id',
        component: subCategoryComponent
      },
      {
        path: 'venuer',
        component: VenuerComponent
      },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'event',
        component: EventComponent
      },
      {
        path: 'archived-events',
        component: ArchivedEventComponent
      },
      {
        path: 'highlighted-event',
        component: HightlightedEventsComponent
      },
      {
        path: 'explored-event',
        component: HightlightedEventsComponent
      },
      {
        path: 'event-detail/:id',
        component: EventsDetailComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'promoter',
        component: PromoterComponent
      },
      {
        path: 'user-payment',
        component: PaymentUserComponent
      },
      {
        path: 'host',
        component: HostComponent
      },
      {
        path: 'member',
        component: MemberComponent
      },

      {
        path: 'common',
        component: CommonComponent
      },
      {
        path: 'support',
        component: SupportComponent
      },
      {
        path: 'support-queries/:id',
        component: SupportQueriesComponent
      },
      {
        path: 'organiser-payment',
        component: PaymentOrganiserComponent
      },
      {
        path: 'accurate',
        component: AccurateComponent
      },

      {
        path: 'venue',
        component: VenueComponent
      },
      {
        path: 'map-view',
        component: MapViewComponent
      },
      {
        path: 'venue-detail/:id',
        component: VenueDetailComponent
      },
      {
        path: 'create-venue',
        component: CreateVenueComponent
      },
      {
        path: 'edit-venue/:id',
        component: CreateVenueComponent
      },
      {
        path: 'categories',
        component: CategoryComponent
      },
      {
        path: 'home-page-design',
        component: HomePageDesignComponent
      },
      {
        path: 'template',
        component: TemplateComponent
      },
      {
        path: 'tickets/:id',
        component: TicketsComponent
      },
      {
        path: 'sub-admin',
        component: SubAdminComponent
      },
      {
        path: 'create-sub-admin',
        component: CreateEditSubAdminComponent
      },
      {
        path: 'edit-sub-admin/:id',
        component: CreateEditSubAdminComponent
      },
      {
        path: 'sub-admin-details/:id',
        component: SubAdminDetailsComponent
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: 'paidevents',
        component: PaideventsComponent
      },
      {
        path: 'manageRule',
        component: PaidEventRulesComponent
      },
      {
        path: 'paideventdetails/:id',
        component: PaidEventDetailsComponent
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteContentRoutingModule {}
