import { CreateCustomer } from "../../enterprise/interfaces/create-customer";
import { Customer } from "../../enterprise/interfaces/customer";
import { UpdateCustomer } from "../../enterprise/interfaces/update-customer";

export interface CustomerRepository {
  save(customer: CreateCustomer): Promise<Customer>;
  get(id: string): Promise<Customer | null>;
  update(id: string, customer: UpdateCustomer): Promise<void>;
  delete(id: string): Promise<void>;
}
