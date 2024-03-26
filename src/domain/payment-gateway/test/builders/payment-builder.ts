import { faker } from '@faker-js/faker';
import { Payment } from "../../enterprise/interfaces/payment";
import { PaymentStatus } from '../../enterprise/interfaces/payment-status-enum';
import { Card } from '../../enterprise/interfaces/card';
import { CreatePayment } from '../../enterprise/interfaces/create-payment';

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
  };

  makeSimplePaymentWithoutId(customerId: string, card?: Card): CreatePayment {
    return {
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
  };
}
