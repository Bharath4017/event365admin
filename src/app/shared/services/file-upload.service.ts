import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService,
    private router: Router
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
   // console.log("kjbnjkng"+this.baseUrl)
  }

  fileUploadImage(image) {
    console.log("shubha"+JSON.stringify(image))
    const formData: FormData = new FormData();
    formData.append('file', image);
    return this.http.post(this.baseUrl + 'upload/file', formData);
  }
}
