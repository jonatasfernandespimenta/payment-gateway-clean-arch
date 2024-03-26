import { CreatePayment } from "../../enterprise/interfaces/create-payment";
import { CreateRefund } from "../../enterprise/interfaces/create-refund";
import { Payment } from "../../enterprise/interfaces/payment";

export interface PaymentRepository {
  create(payment: CreatePayment): Promise<Payment>;
  confirm(id: string): Promise<void>;
  refund(refund: CreateRefund): Promise<Payment>;
  get(id: string): Promise<Payment | null>;
}
