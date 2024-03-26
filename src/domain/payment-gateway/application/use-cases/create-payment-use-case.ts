import { Either, left, right } from "../../../../core/either";
import { CreatePayment } from "../../enterprise/interfaces/create-payment";
import { Payment } from "../../enterprise/interfaces/payment";
import { PaymentStatus } from "../../enterprise/interfaces/payment-status-enum";
import { PaymentRepository } from "../repositories/payment-repository";

interface CreatePaymentUseCaseProps {
  payment: CreatePayment;
}

type CreatePaymentUseCaseResponse = Either<{}, { payment: Payment }>;

export class CreatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute({ payment }: CreatePaymentUseCaseProps): Promise<CreatePaymentUseCaseResponse> {
    try {
      payment.status = PaymentStatus.pending;
      const { id } = await this.paymentRepository.create(payment);

      await this.paymentRepository.confirm(id);

      return right({ payment: { ...payment, id }});
    } catch (error) {
      return left({});
    }
  }
}
