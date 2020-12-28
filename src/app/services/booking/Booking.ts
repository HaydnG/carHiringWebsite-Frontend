import {Accessory, Car} from '../car/Car';

export class Booking {
  ID: number;
  carID: number;
  userID: number;
  start: number;
  end: number;
  finish: number;
  totalCost: number;
  amountPaid: number;
  lateReturn: boolean;
  extension: boolean;
  created: number;
  processID: number;
  bookingLength: number;
  carData: Car;
  accessories: Accessory[];
}

export class Status {
  ID: number;
  BookingID: number;
  Completed: number;
  CompletedDate: Date;
  Active: boolean;
  AdminID: number;
  Description: string;
  ProcessID: number;
  ProcessDescription: string;
  AdminRequired: boolean;
  Order: number;
  BookingPage: boolean;
}
