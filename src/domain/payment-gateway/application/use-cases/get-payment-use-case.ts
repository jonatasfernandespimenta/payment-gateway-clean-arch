import { Either, left, right } from "../../../../core/either";
import { Payment } from "../../enterprise/interfaces/payment";
import { PaymentRepository } from "../repositories/payment-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPaymentUseCaseProps {
  id: string;
}

type GetPaymentUseCaseResponse = Either<ResourceNotFoundError, { payment: Payment }>;

export class GetPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute({ id }: GetPaymentUseCaseProps): Promise<GetPaymentUseCaseResponse> {
    const payment = await this.paymentRepository.get(id);

    if(payment === null) {
      return left(new ResourceNotFoundError());
    }

    return right({ payment });
  }
}
