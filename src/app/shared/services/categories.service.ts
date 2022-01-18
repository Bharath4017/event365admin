import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  // get all categories
  getAllCategories() {
    return this.http.get(this.baseUrl + 'fetchCategories').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // update category
  updateCategory(data) {
    return this.http.post(this.baseUrl + 'updateCategory', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete/deactivate category
  deleteDeactivateCategory(data) {
    return this.http.post(this.baseUrl + 'actionOnCategory', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // fetch categories details of a single category
  fetchCategoryDetailsById(id) {
    return this.http.get(this.baseUrl + 'fetchSingleCategory/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}
