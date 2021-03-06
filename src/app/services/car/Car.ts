export class Car {

  ID: number;
  FuelType: Attribute;
  GearType: Attribute;
  CarType: Attribute;
  Size: Attribute;
  Colour: Attribute;
  Cost: number;
  Description: string;
  Image: string;
  Seats: number;
  BookingCount: number;
  Over25: boolean;
}

class Attribute {
  ID: number;
  Description: string;
}

export class Accessory {
  ID: number;
  Description: string;
  Checked: boolean;
}
