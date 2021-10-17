import { Pipe, PipeTransform } from '@angular/core';
import {Temporal} from '@js-temporal/polyfill';
import PlainDate = Temporal.PlainDate;

@Pipe({
  name: 'removeCalendar'
})
export class RemoveCalendarPipe implements PipeTransform {

  transform(value: PlainDate): string {
    const dateString = value?.toString();
    const sliceEnd = dateString?.indexOf('[');
    if (sliceEnd) {
      return dateString?.substring(0, sliceEnd);
    }
    return dateString;
  }

}
