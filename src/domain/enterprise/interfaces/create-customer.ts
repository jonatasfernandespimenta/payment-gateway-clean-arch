import { Address } from "./address";

export interface CreateCustomer {
  name: string;
  lastName: string;
  email: string;
  document: string;
  birthday: string;
  address: Address;
}
