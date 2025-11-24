export interface Receiver {
  name: string;
  address: string;
  phone: string;
  city: string;
  postalCode: string;
}

export interface IParcel {
  type: string;
  weight: number;
  fee: number;
  address: string;
  receiver: Receiver;
  deliveryDate: string;
}
