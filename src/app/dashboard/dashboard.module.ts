import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartistModule,
    NgbModule,
    MatchHeightModule,
    SharedModule
  ],
  exports: [],
  declarations: [DashboardLayoutComponent, MainDashboardComponent],
  providers: []
})
export class DashboardModule { }
