import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Temporal} from '@js-temporal/polyfill';
import firebase from 'firebase/compat';
import User = firebase.User;

@Component({
  selector: 'words-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  calendar = Temporal.Calendar.from('gregory');
  activeDate = Temporal.Now.plainDate(this.calendar);

  @Output() onLogout = new EventEmitter();

  @Input() user!: User;

  constructor() {

  }

  logout() {
    this.onLogout.emit()
  }
}
