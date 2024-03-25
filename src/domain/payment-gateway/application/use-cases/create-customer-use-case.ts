import { Either, right } from "../../../../core/either";
import { CreateCustomer } from "../../enterprise/interfaces/create-customer";
import { Customer } from "../../enterprise/interfaces/customer";
import { CustomerRepository } from "../repositories/customer-repository";

interface CreateCustomerUseCaseProps {
  customer: CreateCustomer;
}

type CreateCustomerUseCaseResponse = Either<{}, {customer: Customer;}>;

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(props: CreateCustomerUseCaseProps): Promise<CreateCustomerUseCaseResponse> {
    const customer = await this.customerRepository.save(props.customer);

    return right({ customer });
  }
}
