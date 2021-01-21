import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module'; // CLI imports AppRoutingModule
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';


import {BlackListedComponent, UserService} from './services/user/user.service';
import { CarService } from './services/car/car.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarListComponent } from './car-list/car-list.component';
import { CarCardComponent } from './car-card/car-card.component';
import { SearchComponent } from './search/search.component';
import { CarPageComponent } from './car-page/car-page.component';
import {CalendarHComponent} from './calendarH/calendarH.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {BookingComponent} from './booking/booking.component';
import {ScreenService} from './services/screen/screen.service';
import {CurrencyService} from './services/currency/currency.service';
import {BookingService} from './services/booking/booking.service';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {PaymentComponent} from './payment/payment.component';
import {BookingPageComponent} from './booking-page/booking-page.component';
import {BookingCardComponent} from './booking-card/booking-card.component';
import {EditBookingComponent} from './edit-booking/edit-booking.component';
import {DetailsComponent} from './booking-details/booking-details.component';
import {CancelBookingComponent} from './cancel-booking/cancel-booking.component';
import {BookingHistoryComponent} from './booking-history/booking-history.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {AdminService} from './services/admin/admin.service';
import {AdminBookingComponent} from './admin-booking-page/admin-booking-page.component';
import {AdminCarComponent} from './admin-car-page/admin-car-page.component';
import {AdminUserComponent} from './admin-user-page/admin-user-page.component';
import {AdminAccessoriesComponent} from './admin-accessories-page/admin-accessories-page.component';
import {AdminBookingTableComponent} from './admin-booking-table/admin-booking-table.component';
import {DecimalPipe} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {AdminBookingViewPageComponent} from './admin-booking-view-page/admin-booking-view-page.component';
import {NavService} from './services/nav/nav.service';
import {UserCardComponent} from './user-card/user-card.component';
import {ToolsService} from './services/tools/tools.service';
import {AdminProgressBookingComponent} from './admin-progress-booking/admin-progress-booking.component';
import {AdminRefundResponseComponent} from './admin-refund-response/admin-refund-response.component';
import {AdminCarTableComponent} from './admin-car-table/admin-car-table.component';
import {CarListSearchComponent} from './car-list-search/car-list-search.component';
import { AdminCreateCarComponent } from './admin-create-car/admin-create-car.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ImageCropperModule} from 'ngx-image-cropper';
import {AdminEditCarComponent} from './admin-edit-car/admin-edit-car.component';
import {AdminUserTableComponent} from './admin-user-table/admin-user-table.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminUserViewPageComponent} from './admin-user-view-page/admin-user-view-page.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {UserViewPageComponent} from './user-view-page/user-view-page.component';
import {ExtendBookingComponent} from './extend-booking/extend-booking.component';
import {MatSliderModule} from '@angular/material/slider';
import {ExtensionPaymentComponent} from './extension-payment/extension-payment.component';
import {AdminCreateUserComponent} from './admin-create-user/admin-create-user.component';
import {AdminEditUserComponent} from './admin-edit-user/admin-edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    BookingComponent,
    CarListComponent,
    CarCardComponent,
    SearchComponent,
    CalendarHComponent,
    CarPageComponent,
    PaymentComponent,
    BookingPageComponent,
    BookingCardComponent,
    EditBookingComponent,
    DetailsComponent,
    CancelBookingComponent,
    BookingHistoryComponent,
    AdminPageComponent,
    AdminBookingComponent,
    AdminCarComponent,
    AdminUserComponent,
    AdminAccessoriesComponent,
    AdminBookingTableComponent,
    AdminBookingViewPageComponent,
    UserCardComponent,
    AdminProgressBookingComponent,
    AdminRefundResponseComponent,
    AdminCarTableComponent,
    CarListSearchComponent,
    AdminCreateCarComponent,
    AdminEditCarComponent,
    AdminUserTableComponent,
    BlackListedComponent,
    AdminUserViewPageComponent,
    ConfirmationComponent,
    UserViewPageComponent,
    ExtendBookingComponent,
    ExtensionPaymentComponent,
    AdminCreateUserComponent,
    AdminEditUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ImageCropperModule,
    MatSnackBarModule,
    MatSliderModule,
  ],
  providers: [
    UserService,
    CarService,
    MatDatepickerModule,
    ScreenService,
    CurrencyService,
    BookingService,
    AdminService,
    DecimalPipe,
    NavService,
    ToolsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
