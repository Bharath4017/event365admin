import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './pages/notification-list/notification-list.component';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { NotificationResolverService } from 'app/shared/resolver/notification-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NotificationListComponent,
        data: {
          sectionTitle: 'Notifications'
        },
        resolve:{
          pageData:NotificationResolverService
        }
      },
      // {
      //   path: 'list',
      //   component: NotificationListComponent,
      //   data: {
      //     sectionTitle: 'Notifications',
      //     buttonName: 'New Notification'
      //   }
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
