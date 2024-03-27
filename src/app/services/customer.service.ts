import { CreateCustomer } from "../../domain/payment-gateway/enterprise/interfaces/create-customer";
import { Customer } from "../../domain/payment-gateway/enterprise/interfaces/customer";
import { UpdateCustomer } from "../../domain/payment-gateway/enterprise/interfaces/update-customer";
import { StripeCustomerRepository } from "../repositories/stripe/stripe-customer-repository";

export class CustomerService {
  constructor(private customerRepository: StripeCustomerRepository) {}

  async get(id: string): Promise<Customer | null> {
    return this.customerRepository.get(id);
  }

  async save(customer: CreateCustomer): Promise<Customer> {
    return this.customerRepository.save(customer);
  }

  async update(id: string, customer: UpdateCustomer) {
    await this.customerRepository.update(id, customer);
  }

  async delete(id: string): Promise<void> {
    return await this.customerRepository.delete(id);
  }
}
