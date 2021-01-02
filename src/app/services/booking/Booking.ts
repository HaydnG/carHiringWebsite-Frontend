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
  processName: string;
  adminRequired: boolean;
  bookingLength: number;
  carData: Car;
  accessories: Accessory[];
  awaitingExtraPayment: boolean;
  isRefund: boolean;
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

export enum BookingStatus {
  AwaitingPayment = 1,
  PaymentAccepted,
  AwaitingConfirmation,
  BookingConfirmed,
  BookingEdited,
  EditAwaitingPayment,
  EditPaymentAccepted,
  QueryingRefund,
  RefundRejected,
  RefundIssued,
  CanceledBooking,
  CollectedBooking,
  ReturnedBooking,
  CompletedBooking,
}
