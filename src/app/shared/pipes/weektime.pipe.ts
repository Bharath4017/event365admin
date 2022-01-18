import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({
     name: 'weektime'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
     transform(value: any, args?: any): any {
          if (value) {
               return super.transform(moment(value, 'HH:mm:ss').toDate(), 'hh:mm a');
          }
     }
}
