import { Address } from "./address";

export interface Customer {
  id: string;
  name: string;
  lastName: string;
  email: string;
  document: string;
  birthday: string;
  address: Address;
}
