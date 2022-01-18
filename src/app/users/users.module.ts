import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListingComponent } from './pages/users-listing/users-listing.component';
import { UsersLayoutComponent } from './users-layout/users-layout.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [UsersListingComponent, UsersLayoutComponent]
})
export class UsersModule { }
