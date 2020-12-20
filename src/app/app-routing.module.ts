import { NgModule } from '@angular/core';
import {CarListComponent} from './car-list/car-list.component';
import {CarPageComponent} from './car-page/car-page.component';
import {Routes,  RouterModule } from '@angular/router';
import {BookingPageComponent} from './booking-page/booking-page.component';
import {LoggedInGuardGuard} from './logged-in-guard.guard';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'car', component: CarPageComponent },
  { path: 'booking', component: BookingPageComponent, canActivate: [LoggedInGuardGuard] }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
