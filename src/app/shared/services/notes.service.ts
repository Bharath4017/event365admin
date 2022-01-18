import { EventEmitter, Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl: string;
  public notesEvent: any = new EventEmitter();
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }
  // get all admins
  allAdminList() {
    return this.http.get(this.baseUrl + 'admin/allAdminList').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // get all notes
  allNotes(page) {
    return this.http.get(this.baseUrl + `admin/notes?page=${page}`).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // add new notes
  addNotes(body) {
    return this.http.post(this.baseUrl + 'admin/notes', body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  deleteNotes(id: any, body: any) {
    return this.http.delete(this.baseUrl + 'admin/notes/' + id, body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}
