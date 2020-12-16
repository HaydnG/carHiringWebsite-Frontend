import { NgModule } from '@angular/core';
import {CarListComponent} from './car-list/car-list.component';
import {CarPageComponent} from './car-page/car-page.component';
import {Routes,  RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'car', component: CarPageComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
