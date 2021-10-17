import {Component} from '@angular/core';
import {Temporal} from '@js-temporal/polyfill';

@Component({
  selector: 'words-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  calendar = Temporal.Calendar.from('gregory');
  activeDate = Temporal.Now.plainDate(this.calendar);

  constructor() {

  }
}
