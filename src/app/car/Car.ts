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
}

class Attribute {
  ID: number;
  Description: string;
}
