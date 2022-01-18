import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { BaseService } from './base.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrameManagementService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  // --------------------------------------------- COLORS ---------------------------------------------

  getColorsList() {
    return this.http.get(this.baseUrl + 'fetchFrameColors').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateColor(data) {
    return this.http.post(this.baseUrl + 'addUpdateFrameColors', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteColor(data) {
    return this.http.post(this.baseUrl + 'deleteFrameColor', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- MAT ---------------------------------------------

  getMatList() {
    return this.http.get(this.baseUrl + 'fetchMatStyle').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateMat(data) {
    return this.http.post(this.baseUrl + 'addUpdateMatStyle', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteMat(data) {
    return this.http.post(this.baseUrl + 'deleteMatStyle', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- FRAME STYLES ---------------------------------------------

  getFrameStylesList() {
    return this.http.get(this.baseUrl + 'fetchFrameStyles').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateFrameStyle(data) {
    return this.http.post(this.baseUrl + 'addUpdateFrameStyle', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteFrameStyle(data) {
    return this.http.post(this.baseUrl + 'deleteFrameStyles', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- ACRYLIC ---------------------------------------------
  getAcrylicList() {
    return this.http.get(this.baseUrl + 'fetchAcrylicGlaze').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // add/update acrylic
  addUpdateAcrylic(data) {
    return this.http.post(this.baseUrl + 'addUpdateAcrylicGlaze', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteAcrylic(data) {
    return this.http.post(this.baseUrl + 'deleteAcrylicGlaze', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- COLLECTIONS ---------------------------------------------
  getCollectionsList() {
    return this.http.get(this.baseUrl + 'fetchCollection').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getCollectionDetailsByCollectionId(id) {
    return this.http.get(this.baseUrl + 'fetchSingleCollection/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateCollections(data) {
    return this.http.post(this.baseUrl + 'addUpdateCollection', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteCollections(data) {
    return this.http.post(this.baseUrl + 'actionOnCollection', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- CATEGORIES ---------------------------------------------
  getCategoriesList() {
    return this.http.get(this.baseUrl + 'fetchCategories').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getCategoryDetailsByCategoryId(id) {
    return this.http.get(this.baseUrl + 'fetchSingleCategory/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  updateCategory(data) {
    return this.http.post(this.baseUrl + 'updateCategory', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteCategory(data) {
    return this.http.post(this.baseUrl + 'actionOnCategory', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- ADD FRAME ---------------------------------------------

  fetchDataOnAddFrame() {
    return this.http.get(this.baseUrl + 'fetchDataForAddEditFrame').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  fetchFrameDataByFrameId(frameId) {
    console.log("Banner Id "+frameId);
    return this.http.get(this.baseUrl + 'fetchDataForAddEditFrame/' + frameId).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateFrame(data) {
    return this.http.post(this.baseUrl + 'addUpdateFrame', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getFramesList() {
    return this.http.get(this.baseUrl + 'fetchFrameForAdmin').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  markFrameAvailability(data) {
    return this.http.post(this.baseUrl + 'markFrameAvailability', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

}


