import { CreatePayment } from "../../enterprise/interfaces/create-payment";
import { CreateRefund } from "../../enterprise/interfaces/create-refund";

export interface PaymentRepository {
  create(payment: CreatePayment): Promise<void>;
  confirm(id: string): Promise<void>;
  refund(refund: CreateRefund): Promise<void>;
}
