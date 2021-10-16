import {of as observableOf} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class MockTextService {

  constructor() {
  }

  static getTextByDate() {
    return observableOf({
      'text': 'texasdfrrraasdfsdft2  sfassssdf',
      'date': '22.09.2017'
    });
  }

  static saveText() {
    return observableOf({'n': 1, 'nModified': 0, 'ok': 1});
  }

}
