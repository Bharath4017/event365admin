import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { UtilityService } from 'app/shared/services/utility.service';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { NotificationReadEventService } from 'app/shared/services/notification-read-event.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notifications: any[];
  totalNotifications: number;

  constructor(private _activatedRoute: ActivatedRoute, private notificationService: NotificationsService, private _router: Router,
    private _notificationEvent: NotificationReadEventService) {
  }

  ngOnInit() {
    const pageData = this._activatedRoute.snapshot.data.pageData
    this.notifications = pageData.data.notifications
    this.totalNotifications = +pageData.data.total;
    this._notificationEvent.setNotificationStatus(0);
  }

  readNotification(notification) {
    if (!notification.isRead) {
      this._notificationEvent.setNotificationStatus(notification.notification_id);
    }

    this._router.navigateByUrl(notification.url);
  }

}
