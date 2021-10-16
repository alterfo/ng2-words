import {Component, ViewChild} from '@angular/core';
import {TimelineComponent} from '../../components/timeline/timeline.component';
import {Temporal} from '@js-temporal/polyfill';

@Component({
  selector: 'words-app',
  templateUrl: './words-app.component.html'
})
export class WordsAppComponent {
  @ViewChild(TimelineComponent)
  timelineComponent!: TimelineComponent;
  isPast = false;
  calendar = Temporal.Calendar.from('gregory');
  activeDate = Temporal.Now.plainDate(this.calendar);
  now = Temporal.Now.plainDate(this.calendar);


  ngOnInit() {
    this.isPast = this.activeDate.toString() !== this.now.toString();
  }
}
