import { CreateCustomerUseCase } from "../../domain/payment-gateway/application/use-cases/create-customer-use-case";
import { DeleteCustomerUseCase } from "../../domain/payment-gateway/application/use-cases/delete-customer-use-case";
import { ResourceNotFoundError } from "../../domain/payment-gateway/application/use-cases/errors/resource-not-found-error";
import { GetCustomerUseCase } from "../../domain/payment-gateway/application/use-cases/get-customer-use-case";
import { UpdateCustomerUseCase } from "../../domain/payment-gateway/application/use-cases/update-customer-use-case";
import { CreateCustomer } from "../../domain/payment-gateway/enterprise/interfaces/create-customer";
import { UpdateCustomer } from "../../domain/payment-gateway/enterprise/interfaces/update-customer";
import { StripeCustomerRepository } from "../repositories/stripe/stripe-customer-repository";

export class CustomerService {
  constructor(private customerRepository: StripeCustomerRepository) {}

  async get(id: string) {
    const getCustomerUseCase = new GetCustomerUseCase(this.customerRepository);
    const response = await getCustomerUseCase.execute({ customerId: id });

    if(response.isRight()) {
      return response.value;
    }

    if(response.value instanceof ResourceNotFoundError) {
      console.log('Customer not found');
    }
  }

  async save(customer: CreateCustomer) {
    const createCustomerUseCase = new CreateCustomerUseCase(this.customerRepository);
    return createCustomerUseCase.execute({ customer });
  }

  async update(id: string, customer: UpdateCustomer) {
    const updateCustomerUseCase = new UpdateCustomerUseCase(this.customerRepository);
    return updateCustomerUseCase.execute({ customerId: id, customer });
  }

  async delete(id: string) {
    const deleteCustomerUseCase = new DeleteCustomerUseCase(this.customerRepository);
    return deleteCustomerUseCase.execute({ customerId: id });
  }
}
