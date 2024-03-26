import { Either, left, right } from "../../../../core/either";
import { CustomerRepository } from "../repositories/customer-repository";
import { NotAllowedError } from "./errors/not-allowed-errorr";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteCustomerUseCaseProps {
  customerId: string;
}

type DeleteCustomerUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(props: DeleteCustomerUseCaseProps): Promise<DeleteCustomerUseCaseResponse> {
    const customer = await this.customerRepository.get(props.customerId);

    if (!customer) {
      return left(new ResourceNotFoundError());
    }

    await this.customerRepository.delete(props.customerId);

    return right({});
  }
}
