import {RouterModule, Routes} from '@angular/router';
import {WordsAppComponent} from './words-app/layout/words-app/words-app.component';
import {LoginComponent} from './words-app/layout/login/login.component';
import {ErrorComponent} from './words-app/layout/error/error.component';

const appRoutes: Routes = [
  {path: '', component: WordsAppComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
