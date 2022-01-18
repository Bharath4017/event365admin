import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationResolverService implements Resolve<any> {
  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    return this.notificationService
      .fetchNotifications()
      .pipe(
        map(data => {
          return data;
        }),
        catchError(error => {
          this.errorHandler.routeAccordingToError(error);
          return throwError(error);
        })
      );
  }

  constructor(private notificationService:NotificationsService, private errorHandler:ErrorHandlerService) { }
}
