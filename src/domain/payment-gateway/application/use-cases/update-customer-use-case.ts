import { Either, left, right } from "../../../../core/either";
import { UpdateCustomer } from "../../enterprise/interfaces/update-customer";
import { CustomerRepository } from "../repositories/customer-repository";
import { NotAllowedError } from "./errors/not-allowed-errorr";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateCustomerUseCaseProps {
  customerId: string;
  customer: UpdateCustomer;
}

type UpdateCustomerUseCaseResponse = Either<ResourceNotFoundError, NotAllowedError | string>;

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(props: UpdateCustomerUseCaseProps): Promise<UpdateCustomerUseCaseResponse> {
    const customer = await this.customerRepository.get(props.customerId);

    if (!customer) {
      return left(new ResourceNotFoundError());
    }

    if(props.customerId !== customer.id) {
      return left(new NotAllowedError());
    }

    await this.customerRepository.update(props.customerId, props.customer);

    return right(`Customer ${props.customerId} updated successfully!`);
  }
}
