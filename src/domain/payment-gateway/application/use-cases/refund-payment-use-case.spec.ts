import { beforeEach, describe, expect, it } from "@jest/globals";
import { PaymentRepository } from "../repositories/payment-repository";
import { RefundPaymentUseCase } from "./refund-payment-use-case";
import { InMemoryPaymentRepository } from "../../test/repositories/in-memory-payment-repository";
import { PaymentBuilder } from "../../test/builders/payment-builder";
import { CardBuilder } from "../../test/builders/card-builder";
import { PaymentStatus } from "../../enterprise/interfaces/payment-status-enum";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-errorr";

let repository: PaymentRepository;
let sut: RefundPaymentUseCase;

describe('Refund Payment Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPaymentRepository();
    sut = new RefundPaymentUseCase(repository);
  })

  it('should refund a payment', async () => {
    const payment = new PaymentBuilder().makeSimplePaymentWithoutId('123', new CardBuilder().makeSimpleCard('123', '123'));

    const { id } = await repository.create(payment);

    await repository.confirm(id);

    const response = await sut.execute({ id, amount: 100, card: new CardBuilder().makeSimpleCard('123', '123') });

    expect(response.isRight()).toBeTruthy();

    if(response.isRight()) {
      expect(response.value.payment.status).toBe(PaymentStatus.refunded);
    }
  });

  it('should not refund a payment if it does not exist', async () => {
    const response = await sut.execute({ id: '123', amount: 100, card: new CardBuilder().makeSimpleCard('123', '123') });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not refund a payment if it is not confirmed', async () => {
    const payment = new PaymentBuilder().makeSimplePaymentWithoutId('123');

    const { id } = await repository.create(payment);

    const response = await sut.execute({ id, amount: 100, card: new CardBuilder().makeSimpleCard('123', '123') });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });

  it('should not refund a payment if it does not have a card', async () => {
    const payment = new PaymentBuilder().makeSimplePaymentWithoutId('123');

    const { id } = await repository.create(payment);

    await repository.confirm(id);

    const response = await sut.execute({ id, amount: 100, card: new CardBuilder().makeSimpleCard('123', '123') });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
});
