import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'main',
      //   pathMatch: 'full'
      // },
      {
        path: '',
        component: MainDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
