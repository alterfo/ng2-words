import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Temporal} from '@js-temporal/polyfill';

@Injectable()
export class TextService {
  calendar = Temporal.Calendar.from('gregory');
  now = Temporal.Now.plainDate(this.calendar);
  constructor(private dbService: NgxIndexedDBService) {
  }

  getTextByDate(dateString: string): Observable<{ text: string }> {
    return this.dbService.getByKey('texts', dateString)
  }

  saveText(text: string) {
    return this.dbService.update("texts", {
      text: text,
      date: this.now.toString()
    });
  }

}
