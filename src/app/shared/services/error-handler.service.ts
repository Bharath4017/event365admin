import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService, private router: Router) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage: any;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`
      );
      errorMessage = error.error.message || error.message;
    }
    return throwError(error);
  }

  routeAccordingToError(error) {
    // generic error message toast
    this.messageService.add({
      severity: 'error',
      summary: `${error.error.message}`
    });

    // if verification link is not valid
    if (
      error.error.message ===
      'Either invalid link or link is expired or already used'
    ) {
      this.redirectToLogin();
    }

    // if session is expired - 401
    if (error.status === 401) {
      // generic error message toast
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }
}
