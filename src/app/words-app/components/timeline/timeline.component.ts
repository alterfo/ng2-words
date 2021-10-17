import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Temporal} from '@js-temporal/polyfill';
import PlainDate = Temporal.PlainDate;

export interface TimelineEntity {
  date: PlainDate;
  text: string;
  wordCount: number
}
// компонент выводит в одну строку дни выбранного месяца
// месяцы можно листать назад и обратно
@Component({
  selector: 'words-timeline',
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  @Input()
  timeline!: TimelineEntity[];
  @Input()
  activeDate!: PlainDate;
  @Input()
  isCurrentMonth = true;

  @Output() changeCurrentDate: EventEmitter<PlainDate> = new EventEmitter<Temporal.PlainDate>();

  viewText(date: PlainDate) {
    this.changeCurrentDate.emit(date);
  }

  toMonth(direction: number) {
    this.changeCurrentDate.emit(this.activeDate.add({months: direction}));
  }
}
