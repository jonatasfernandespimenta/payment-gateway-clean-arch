require('dotenv').config()
import { CustomerBuilder } from "../domain/payment-gateway/test/builders/customer-builder";
import { StripeCustomerRepository } from "./repositories/stripe/stripe-customer-repository";
import { CustomerService } from "./services/customer.service";

export async function init() {
  const customerStripeRepository = new StripeCustomerRepository();
  const customerService = new CustomerService(customerStripeRepository);

  const customerBuilder = new CustomerBuilder()

  await customerService.get('123');
}
