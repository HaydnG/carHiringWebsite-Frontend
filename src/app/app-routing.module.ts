import {NgModule, Type} from '@angular/core';
import {CarListComponent} from './car-list/car-list.component';
import {CarPageComponent} from './car-page/car-page.component';
import {Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {BookingPageComponent} from './booking-page/booking-page.component';
import {LoggedInGuard} from './logged-in-guard.service';
import {Observable} from 'rxjs';


const routes: Routes = [
  { path: '', component: CarListComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: false}},
  { path: 'car', component: CarPageComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: false} },
  { path: 'booking', component: BookingPageComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true}}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {





}
