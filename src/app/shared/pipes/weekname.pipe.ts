import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
     name: 'weekname'
})
export class CustomNamePipe  implements PipeTransform {
     transform(value: any, args?: any): any {
         if (value == 1) {
             return 'Monday';
         } else if (value == 2) {
            return 'Tuesday';
         } else if (value == 3) {
            return 'Wednesday';
         } else if (value == 4) {
            return 'Thursday';
         } else if (value == 5) {
            return 'Friday';
         } else if (value == 6) {
            return 'Saturday';
         } else if (value == 7) {
            return 'Sunday';
         }
     }
}