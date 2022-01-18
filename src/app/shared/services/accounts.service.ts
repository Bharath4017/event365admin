import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  baseUrl: String = "";

  constructor(private http: HttpClient,
    private bs: BaseService,
    private errorHandler: ErrorHandlerService) {
    this.baseUrl = bs.baseUrl;
  }

  getPage(callFunction, params) {
    if (callFunction == '') {
      return this.fetchAccountsData();
    } else {
      return this.fetchDriverAccounts(params.id);
    }
  }
  fetchAccountsData(fetchingData?) {

    let query = "";
    if (fetchingData) {
      var esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "/?" + query : "";

    return this.http.get(this.baseUrl + "fetchMyAccountsDetail" + query).pipe(timeout(10000), catchError((error) => {
      this.errorHandler.routeAccordingToError(error);
      return throwError(error)
    }));
  }

  /**
   * updates driver account balance
   * @param data to update driver account balance
   */
  updateAccountCreditDebit(data) {
    return this.http.post(this.baseUrl + "accountsUpdate", data).pipe(
      timeout(10000),
      catchError((error) => {
        this.errorHandler.routeAccordingToError(error);
        return throwError(error);
      })
    )
  }
  fetchDriverAccounts(id, fetchingData?) {

    let query = "";
    if (fetchingData) {
      var esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "/?" + query : "";
    return this.http.get(this.baseUrl + "fetchDriverAccountStatement/" + id + "" + query).pipe(
      timeout(10000),
      catchError((error) => {
        this.errorHandler.routeAccordingToError(error);
        return throwError(error);
      })
    )
  }
}
