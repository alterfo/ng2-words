import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WordsAppComponent} from './words-app/layout/words-app/words-app.component';
import {ErrorComponent} from './words-app/layout/error/error.component';

const routes: Routes = [
  {path: '', component: WordsAppComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
