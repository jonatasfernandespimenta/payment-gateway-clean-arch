import { CreateCustomer } from "../../enterprise/interfaces/create-customer";
import { Customer } from "../../enterprise/interfaces/customer";
import { CustomerRepository } from "../../application/repositories/customer-repository";
import { UpdateCustomer } from "../../enterprise/interfaces/update-customer";

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [];

  async get(id: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id);

    if (!customer) {
      return null;
    }

    return Promise.resolve(customer);
  }

  async save(customer: CreateCustomer): Promise<Customer> {
    const id = Math.random().toString();

    const newCustomer = { ...customer, id };

    this.customers.push(newCustomer);

    return Promise.resolve(newCustomer);
  }

  update(id: string, customer: UpdateCustomer): Promise<void> {
    const index = this.customers.findIndex(customer => customer.id === id);
    const foundCustomer = this.customers[index];

    this.customers[index] = { ...foundCustomer, ...customer };

    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    this.customers = this.customers.filter(customer => customer.id !== id);
    return Promise.resolve();
  }
}
