import {Component} from '@angular/core';
import {Temporal} from '@js-temporal/polyfill';


// компонент выводит в одну строку дни выбранного месяца
// месяцы можно листать назад и обратно
@Component({
  selector: 'words-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  calendar = Temporal.Calendar.from('gregory');
  now = Temporal.Now.plainDate(this.calendar);
  activeDate = Temporal.Now.plainDate(this.calendar);
  timeline = new Array(this.activeDate.daysInMonth).fill(-1);
  activeDayN = this.activeDate.day;
  activeMonthN = this.activeDate.month;

  constructor() {
  }

  ngOnInit() {
    console.log(this.now);
    console.log(this.timeline);
    console.log(this.activeDayN);
  }

  viewText(dayN: number) {
    console.log(dayN);
  }

  toMonth(direction: number) {
    this.activeDate = this.activeDate.add({months: direction});
    this.timeline = new Array(this.activeDate.daysInMonth).fill(-1);
    this.activeDayN = this.activeDate.day;
    this.activeMonthN = this.activeDate.month;
  }

  isCurrentMonth() {
    return this.now.toString() === this.activeDate.toString()
  }
}
