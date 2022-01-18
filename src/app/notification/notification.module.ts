import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './pages/notification-list/notification-list.component';


@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule
  ],
  declarations: [NotificationListComponent],
  
})
export class NotificationModule { }
