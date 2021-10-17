import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Temporal} from '@js-temporal/polyfill';
import PlainDate = Temporal.PlainDate;
import {CountWordsPipe} from '../pipes/count-words.pipe';
import {TimelineEntity} from '../components/timeline/timeline.component';

@Injectable()
export class TextService {
  calendar = Temporal.Calendar.from('gregory');

  constructor(private dbService: NgxIndexedDBService) {
  }

  getTextByDate(date: PlainDate): Observable<TimelineEntity> {
    return this.dbService.getByKey('texts', date.toString())
  }

  async saveText(text: string) {
    const date = Temporal.Now.plainDate(this.calendar).toString()
    await this.dbService.delete('texts', date)
    return this.dbService.add('texts', {
      text,
      date,
      wordCount: new CountWordsPipe().transform(text)
    });
  }

}
