import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module'; // CLI imports AppRoutingModule
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';


import { UserService } from './services/user/user.service';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {PaymentComponent} from './payment/payment.component';
import {BookingPageComponent} from './booking-page/booking-page.component';
import {BookingCardComponent} from './booking-card/booking-card.component';
import {EditBookingComponent} from './edit-booking/edit-booking.component';
import {DetailsComponent} from './booking-details/booking-details.component';
import {CancelBookingComponent} from './cancel-booking/cancel-booking.component';
import {BookingHistoryComponent} from './booking-history/booking-history.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

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
    BookingHistoryComponent
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
    MatSortModule
  ],
  providers: [UserService, CarService, MatDatepickerModule, ScreenService, CurrencyService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
