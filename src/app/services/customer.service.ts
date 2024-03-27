import { CreateCustomerUseCase } from "../../domain/payment-gateway/application/use-cases/create-customer-use-case";
import { DeleteCustomerUseCase } from "../../domain/payment-gateway/application/use-cases/delete-customer-use-case";
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

    console.log(response.value)
    return response.value;
  }

  async save(customer: CreateCustomer) {
    const createCustomerUseCase = new CreateCustomerUseCase(this.customerRepository);
    const response = await createCustomerUseCase.execute({ customer });

    console.log(response.value)
    return response.value;
  }

  async update(id: string, customer: UpdateCustomer) {
    const updateCustomerUseCase = new UpdateCustomerUseCase(this.customerRepository);
    const response = await updateCustomerUseCase.execute({ customerId: id, customer });
  
    console.log(response.value)
    return response.value;
  }

  async delete(id: string) {
    const deleteCustomerUseCase = new DeleteCustomerUseCase(this.customerRepository);
    const response = await deleteCustomerUseCase.execute({ customerId: id });
    
    console.log(response.value)
    return response.value;
  }
}
