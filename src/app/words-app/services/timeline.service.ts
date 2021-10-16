import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TimelineService {

  constructor(
    private http: HttpClient
  ) {
  }

  getTimelineData(month: string) {
    return this.http.get('/api/timeline/' + month);
  }
}
