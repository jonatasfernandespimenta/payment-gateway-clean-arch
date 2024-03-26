import { Either, left, right } from "../../../../core/either";
import { Card } from "../../enterprise/interfaces/card";
import { Payment } from "../../enterprise/interfaces/payment";
import { PaymentStatus } from "../../enterprise/interfaces/payment-status-enum";
import { PaymentRepository } from "../repositories/payment-repository";
import { NotAllowedError } from "./errors/not-allowed-errorr";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RefundPaymentUseCaseProps {
  id: string;
  amount: number;
  card: Card
}

type RefundPaymentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { payment: Payment }>;

export class RefundPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute({ id, amount, card }: RefundPaymentUseCaseProps): Promise<RefundPaymentUseCaseResponse> {
    const payment = await this.paymentRepository.get(id);

    if(!payment) {
      return left(new ResourceNotFoundError());
    }

    if(!payment.card) {
      return left(new NotAllowedError());
    }

    if(payment.status !== PaymentStatus.confirmed) {
      console.log('3')
      return left(new NotAllowedError());
    }

    const refund = await this.paymentRepository.refund({ amountInCents: amount, paymentId: id, card });

    return right({ payment: refund });
  }
}
