import { Injectable } from '@angular/core';

import { ErrorHandlerService } from './error-handler.service';

import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaideventService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }
  getAllEvents(fetchingData?) {
    console.log('getAllEvents', fetchingData)
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/paidEventList' + query ).pipe(
      retry(3),
          catchError(this.errorHandler.handleError)
    );
  }
  getEventDetails(eventId) {
    return this.http.get(this.baseUrl + 'admin/event/' + eventId).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getRules() {
    return this.http.get(this.baseUrl + 'admin/rules').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  updateRules(body) {
    return this.http.post(this.baseUrl + 'admin/addPaidEventRules' , body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

}
