import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(
    private loader: NgxUiLoaderService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) {}

  scrollToTop() {
    window.scroll(0, 0);
  }
  scrollToClass(class_name) {
    setTimeout(() => {
      console.log(document.getElementsByClassName(class_name));
        document.getElementsByClassName(class_name).item(0).scrollIntoView(
            { behavior: 'smooth', block: 'center' }
        );
    }, 200);
}
  convertDateToNumberFormat(d) {
    const formattedTime =
      (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) +
      '' +
      (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
    return +formattedTime;
  }

  timeToObject(startTime, endTime) {
    return {
      open: this.convertDateToNumberFormat(startTime),
      close: this.convertDateToNumberFormat(endTime)
    };
  }

  convertNumberToDateFormat(time_in_number) {
    const finalTime = new Date();
    const hourAndMinute = time_in_number.toString().match(/.{1,2}/g);
    finalTime.setHours(+hourAndMinute[0]);
    finalTime.setMinutes(+hourAndMinute[1]);
    return finalTime;
  }

  arrayOfStringsToArrayOfObjects(arr: any[]) {
    const newArray = [];
    arr.forEach(element => {
      newArray.push({
        label: element,
        value: element
      });
    });
    return newArray;
  }

  arrayOfObjectToArrayOfStrings(obj: []) {
    const newArray = [];
    obj.forEach(element => {
      newArray.push(element['value']);
    });
    return newArray;
  }

  stringToNumber(str: string) {
    return +str;
  }

  validateEmail(controls) {
    const regExp = new RegExp(
      // tslint:disable-next-line: max-line-length
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateEmail: true };
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  numberOnly(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && charCode !== 43 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  resetPage() {
    this.loader.stop();
    this.scrollToTop();
  }

  loaderStart() {
    this.loader.start();
  }

  loaderStop() {
    this.loader.stop();
  }

  successMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: `${message}`,
      life: 3000
    });
  }

  routingAccordingToError(error) {
    this.errorHandler.routeAccordingToError(error);
    this.resetPage();
  }
}
