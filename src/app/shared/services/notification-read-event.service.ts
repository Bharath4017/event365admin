import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationReadEventService {

  constructor() { }

  private subject = new BehaviorSubject(0);

  currentNotice = this.subject.asObservable();

  setNotificationStatus(val) {
    this.subject.next(val);
  }
}
