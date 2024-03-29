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

import {ErrorComponent} from './words-app/layout/error/error.component';
import {AppRoutingModule} from './app-routing.module';
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';
import { RemoveCalendarPipe } from './words-app/pipes/remove-calendar.pipe';
import { CountWordsPipe } from './words-app/pipes/count-words.pipe';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'texts',
    storeConfig: {keyPath: 'date', autoIncrement: false},
    storeSchema: [
      {name: 'text', keypath: 'text', options: {unique: false}},
      {name: 'wordCount', keypath: 'wordCount', options: {unique: false}},
      {name: 'date', keypath: 'date', options: {unique: true}}
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
    ErrorComponent,
    RemoveCalendarPipe,
    CountWordsPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxIndexedDBModule.forRoot(dbConfig),
    AngularFireModule.initializeApp(environment.firebase)
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
