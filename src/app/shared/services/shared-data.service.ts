import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // store for user data
  private userDataSource = new BehaviorSubject(null);
  user_data = this.userDataSource.asObservable();

  constructor(private messageService: MessageService) {}

  updateUserDataStore(data) {
    this.userDataSource.next(data);
  }

  successMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: message,
      life: 3000
    });
  }
}
