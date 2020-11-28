import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';


import { PageService } from './page/page.service';
import { UserService } from './user/user.service';
import { CarService } from './car/car.service';
import {ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarListComponent } from './car-list/car-list.component';
import { CarCardComponent } from './car-card/car-card.component';
import { SearchComponent } from './search/search.component';
import { CarPageComponent } from './car-page/car-page.component';
import {CalendarHComponent} from './calendarH/calendarH.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    CarListComponent,
    CarCardComponent,
    SearchComponent,
    CalendarHComponent,
    CarPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [UserService, CarService, PageService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
