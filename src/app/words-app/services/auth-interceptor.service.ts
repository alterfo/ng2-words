import {throwError as observableThrowError} from 'rxjs';

import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          _ => {
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/signin']);
              }
              if (err.status === 500) {
                this.router.navigate(['/error'])
              }
            }
            return observableThrowError(err);
          }
        ),
      );
  }
}
