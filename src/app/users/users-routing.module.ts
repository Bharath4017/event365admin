import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { UsersListingComponent } from './pages/users-listing/users-listing.component';

const routes: Routes = [
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full'
      },
      {
        path: 'listing',
        component: UsersListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
