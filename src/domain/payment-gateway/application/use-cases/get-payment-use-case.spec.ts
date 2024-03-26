import { beforeEach, describe, expect, it } from "@jest/globals";
import { PaymentRepository } from "../repositories/payment-repository";
import { GetPaymentUseCase } from "./get-payment-use-case";
import { InMemoryPaymentRepository } from "../../test/repositories/in-memory-payment-repository";
import { PaymentBuilder } from "../../test/builders/payment-builder";
import { CardBuilder } from "../../test/builders/card-builder";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let repository: PaymentRepository;
let sut: GetPaymentUseCase;

describe('Get Payment Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPaymentRepository();
    sut = new GetPaymentUseCase(repository);
  })

  it('should get a payment', async () => {
    const payment = new PaymentBuilder().makeSimplePaymentWithoutId('123');
    const { id } = await repository.create(payment);

    const response = await sut.execute({ id });

    expect(response.isRight()).toBeTruthy();

    if(response.isRight()) {
      expect(response.value.payment.id).toBe(id);
    }
  });

  it('should return a ResourceNotFoundError when payment does not exist', async () => {
    const response = await sut.execute({ id: '123' });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });
})
