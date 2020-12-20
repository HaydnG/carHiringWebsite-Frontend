import {Accessory, Car} from '../car/Car';

export class Booking {
  ID: number;
  carID: number;
  userID: number;
  start: number;
  end: number;
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
