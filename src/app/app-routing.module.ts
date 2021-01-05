import {NgModule, Type} from '@angular/core';
import {CarListComponent} from './car-list/car-list.component';
import {CarPageComponent} from './car-page/car-page.component';
import {Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {BookingPageComponent} from './booking-page/booking-page.component';
import {LoggedInGuard} from './logged-in-guard.service';
import {Observable} from 'rxjs';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {AdminBookingComponent} from './admin-booking-page/admin-booking-page.component';
import {AdminCarComponent} from './admin-car-page/admin-car-page.component';
import {AdminUserComponent} from './admin-user-page/admin-user-page.component';
import {AdminAccessoriesComponent} from './admin-accessories-page/admin-accessories-page.component';
import {AdminBookingViewPageComponent} from './admin-booking-view-page/admin-booking-view-page.component';
import {AdminUserViewPageComponent} from './admin-user-view-page/admin-user-view-page.component';


const routes: Routes = [
  { path: '', component: CarListComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: false, adminRequired: false}},
  { path: 'car', component: CarPageComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: false, adminRequired: false} },
  { path: 'booking', component: BookingPageComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true, adminRequired: false}},
  { path: 'admin', component: AdminPageComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true, adminRequired: true}},
  { path: 'admin/booking', component: AdminBookingComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true, adminRequired: true}},
  { path: 'admin/booking/view', component: AdminBookingViewPageComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true, adminRequired: true}},
  { path: 'admin/car', component: AdminCarComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true, adminRequired: true}},
  { path: 'admin/user', component: AdminUserComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true, adminRequired: true}},
  { path: 'admin/user/view', component: AdminUserViewPageComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true, adminRequired: true}},
  { path: 'admin/accessory', component: AdminAccessoriesComponent, canActivate: [LoggedInGuard], data: {loggedInRequired: true, adminRequired: true}}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {





}
