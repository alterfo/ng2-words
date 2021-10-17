import {Component} from '@angular/core';
import {TimelineEntity} from '../../components/timeline/timeline.component';
import {Temporal} from '@js-temporal/polyfill';
import {TextService} from '../../services/text.service';
import {CountWordsPipe} from '../../pipes/count-words.pipe';
import {tap} from 'rxjs/operators';
import PlainDate = Temporal.PlainDate;

@Component({
  selector: 'words-app',
  templateUrl: './words-app.component.html'
})
export class WordsAppComponent {
  calendar = Temporal.Calendar.from('gregory');
  activeDate = Temporal.Now.plainDate(this.calendar);
  now = Temporal.Now.plainDate(this.calendar);
  isPast = false;
  isCurrentMonth = true;

  timeline: TimelineEntity[] = new Array(this.activeDate.daysInMonth).fill({
    text: '',
    date: '',
    wordCount: 0,
  }).map(({text, date, wordCount}, index, array) => {
    return {
      text,
      wordCount,
      date: new Temporal.PlainDate(this.now.year, this.now.month, index + 1)
    };
  });
  text = '';

  constructor(private textService: TextService) {
    this.textService.getTextByDate(this.activeDate).subscribe(({text}) => {
      this.text = text;
    })
  }

  onChangeCurrentDate(newDate: PlainDate) {
    this.activeDate = newDate;
    this.isPast = PlainDate.compare(this.activeDate, this.now) < 0;
    this.isCurrentMonth = this.timeline[0].date.toPlainYearMonth().toString() === this.activeDate.toPlainYearMonth().toString();

    this.timeline.forEach(({text, date, wordCount}, index, array) => {
      if (newDate === date) {
        this.textService.getTextByDate(this.activeDate).pipe(
          tap(({text}) => {
            this.timeline[index] = {
              text,
              wordCount: new CountWordsPipe().transform(text),
              date: new Temporal.PlainDate(this.now.year, this.now.month, index + 1)
            };
          })
        )
      }
    });
  }
}
