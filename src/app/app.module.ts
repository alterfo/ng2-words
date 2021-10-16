import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {HeaderComponent} from './words-app/components/header/header.component';
import {WordsAppComponent} from './words-app/layout/words-app/words-app.component';
import {TimelineComponent} from './words-app/components/timeline/timeline.component';
import {AreaComponent} from './words-app/components/area/area.component';
import {TimelineService} from './words-app/services/timeline.service';
import {TextService} from './words-app/services/text.service';
import {CapitalizePipe} from './words-app/pipes/capitalize.pipe';
import {AuthInterceptor} from './words-app/services/auth-interceptor.service';
import {ToastrModule} from 'ngx-toastr';

import {Autosize} from './words-app/directives/autosize.directive';
import { ErrorComponent } from './words-app/layout/error/error.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'texts',
    storeConfig: { keyPath: 'date', autoIncrement: true },
    storeSchema: [
      { name: 'text', keypath: 'text', options: { unique: false } },
      { name: 'date', keypath: 'date', options: { unique: true } }
    ]
  }]
};

@NgModule({
  declarations: [
    HeaderComponent,
    WordsAppComponent,
    TimelineComponent,
    AreaComponent,
    CapitalizePipe,
    Autosize,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    TimelineService,
    TextService,
    AuthInterceptor,
    {provide: LOCALE_ID, useValue: 'ru-RU'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [WordsAppComponent]
})
export class AppModule {
}
