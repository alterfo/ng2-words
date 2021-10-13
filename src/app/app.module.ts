import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './words-app/components/header/header.component';
import {WordsAppComponent} from './words-app/layout/words-app/words-app.component';
import {TimelineComponent} from './words-app/components/timeline/timeline.component';
import {AreaComponent} from './words-app/components/area/area.component';
import {UserService} from './words-app/services/user.service';
import {TimelineService} from './words-app/services/timeline.service';
import {TextService} from './words-app/services/text.service';
import {CapitalizePipe} from './words-app/pipes/capitalize.pipe';
import {AuthInterceptor} from './words-app/services/auth-interceptor.service';
import {ToastrModule} from 'ngx-toastr';
import {LoginComponent} from './words-app/layout/login/login.component';
import {SignupComponent} from './words-app/layout/signup/signup.component';

import {routing} from './app.routes';
import {Autosize} from './words-app/directives/autosize.directive';
import {AboutComponent} from './words-app/layout/about/about.component';
import { ErrorComponent } from './words-app/layout/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WordsAppComponent,
    TimelineComponent,
    AreaComponent,
    CapitalizePipe,
    LoginComponent,
    SignupComponent,
    Autosize,
    AboutComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UserService,
    TimelineService,
    TextService,
    AuthInterceptor,
    {provide: LOCALE_ID, useValue: 'ru-RU'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
