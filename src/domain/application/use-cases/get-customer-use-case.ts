import { Either, left, right } from "../../../core/either";
import { Customer } from "../../enterprise/interfaces/customer";
import { CustomerRepository } from "../repositories/customer-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetCustomerUseCaseProps {
  customerId: string;
}

type GetCustomerUseCaseResponse = Either<ResourceNotFoundError, {customer: Customer}>

export class GetCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(props: GetCustomerUseCaseProps): Promise<GetCustomerUseCaseResponse> {
    const customer = await this.customerRepository.get(props.customerId);

    if (!customer) {
      return left(new ResourceNotFoundError());
    }

    return right({ customer });
  }
}
