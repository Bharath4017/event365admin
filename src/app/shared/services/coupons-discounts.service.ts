import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { generate } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsDiscountsService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  getAllCoupons() {
    return this.http.get(this.baseUrl + 'fetchCouponsForAdmin').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateCoupon(data) {
    return this.http.post(this.baseUrl + 'addUpdateCoupon', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  generateCoupon() {
    return this.http.get(this.baseUrl + 'generateCode').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  expireCoupon(data) {
    return this.http.post(this.baseUrl + 'expireThisCoupon', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}
