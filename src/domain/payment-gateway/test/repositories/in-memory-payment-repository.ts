import { PaymentRepository } from "../../application/repositories/payment-repository";
import { CreatePayment } from "../../enterprise/interfaces/create-payment";
import { CreateRefund } from "../../enterprise/interfaces/create-refund";
import { Payment } from "../../enterprise/interfaces/payment";
import { PaymentStatus } from "../../enterprise/interfaces/payment-status-enum";

export class InMemoryPaymentRepository implements PaymentRepository {
  private payments: Payment[] = [];

  async get(id: string): Promise<Payment | null> {
    return this.payments.find(payment => payment.id === id) ?? null;
  }

  async create(payment: CreatePayment): Promise<Payment> {
    payment.status = PaymentStatus.pending;

    const id = Math.random().toString();

    this.payments.push({ ...payment, id });

    return Promise.resolve({ ...payment, id });
  }

  async confirm(id: string): Promise<void> {
    const index = this.payments.findIndex(payment => payment.id === id);
    this.payments[index] = { ...this.payments[index], status: PaymentStatus.confirmed };
    return Promise.resolve();
  }

  async refund(refund: CreateRefund): Promise<Payment> {
    const index = this.payments.findIndex(payment => payment.id === refund.paymentId);
    this.payments[index] = { ...this.payments[index], status: PaymentStatus.refunded };

    return Promise.resolve(this.payments[index]);
  }
}
