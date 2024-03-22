import { faker } from '@faker-js/faker';
import { Payment } from "../../enterprise/interfaces/payment";
import { PaymentStatus } from '../../enterprise/interfaces/payment-status-enum';
import { Card } from '../../enterprise/interfaces/card';

export class PaymentBuilder {
  makeSimplePayment(id: string, customerId: string, card?: Card): Payment {
    return {
      id,
      amountInCents: Number(faker.finance.amount()),
      customerId,
      status: PaymentStatus.pending,
      currency: 'BRL',
      installments: 1,
      orderId: 120,
      pixExpiresAfterSeconds: 3600,
      paymentMethod: 'credit_card',
      card: card
    };
  }
}
