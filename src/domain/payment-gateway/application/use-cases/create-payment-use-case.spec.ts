import { beforeEach, describe, expect, it } from "@jest/globals";
import { PaymentRepository } from "../repositories/payment-repository";
import { CreatePaymentUseCase } from "./create-payment-use-case";
import { InMemoryPaymentRepository } from "../../test/repositories/in-memory-payment-repository";
import { PaymentBuilder } from "../../test/builders/payment-builder";
import { CardBuilder } from "../../test/builders/card-builder";
import { PaymentStatus } from "../../enterprise/interfaces/payment-status-enum";

let repository: PaymentRepository;
let sut: CreatePaymentUseCase;

describe('Create Payment Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPaymentRepository();
    sut = new CreatePaymentUseCase(repository);
  })

  it('should create and confirm a payment', async () => {
    const card = new CardBuilder().makeSimpleCard('123', '123');
    const payment = new PaymentBuilder().makeSimplePaymentWithoutId('123', card);

    const response = await sut.execute({ payment });

    expect(response.isRight()).toBeTruthy();

    if(response.isRight()) {
      const createdPayment = await repository.get(response.value.payment.id);
      expect(createdPayment).not.toBeNull();
      expect(createdPayment?.status).toBe(PaymentStatus.confirmed);
    }

  });
})
