import {Accessory, Car} from '../car/Car';
import {Booking} from '../booking/Booking';
import {User} from '../user/User';

export class BookingStat {
  ProcessID: number;
  Description: string;
  Count: number;
  AdminRequired: boolean;
}

export class UserStat {
  AdminCount: number;
  BlackListedCount: number;
  RepeatUsersCount: number;
  UserCount: number;
  ActiveUsers: number;
  DisabledCount: number;
}

export class CarStat {
  CarCount: number;
  DisabledCount: number;
  AvailableCount: number;
}

export class AccessoryStat {
  ID: number;
  Description: string;
  Stock: number;
}

export class BookingColumn {
  ID: number;
  carID: number;
  userID: number;
  start: number;
  end: number;
  finish: number;
  totalCost: number;
  amountPaid: number;
  lateReturn: boolean;
  fullDay: boolean;
  created: number;
  bookingLength: number;
  CarDescription: string;
  UserFirstName: string;
  UserOtherName: string;
  startDate: Date;
  endDate: Date;
  finishDate: Date;
  createdDate: Date;
  countdownDate: number;
  countdownFormat: string;
  process: string;
}

export class BookingStatusType{
  ID: number;
  Description: string;
  AdminRequired: boolean;
  Order: number;
  BookingPage: boolean;
}

export class AdminBooking{
  booking: Booking;
  user: User;
}

export class UserBundle{
  user: User;
  bookings: BookingColumn[];
}




