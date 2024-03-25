import { beforeEach, describe, expect, it } from "@jest/globals";
import { CardRepository } from "../repositories/card-repository";
import { InMemoryCardRepository } from "../../test/repositories/in-memory-card-repository";
import { DeleteCardUseCase } from "./delete-card-use-case";
import { CardBuilder } from "../../test/builders/card-builder";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-errorr";

let cardRepository: CardRepository;
let sut: DeleteCardUseCase;

describe('Delete Card Use Case', () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    sut = new DeleteCardUseCase(cardRepository);
  })

  it('should delete a card', async () => {
    const customerId = 'customer-id';
    const newCard = new CardBuilder().makeSimpleCardWithoutId(customerId);

    const { card, token } = await cardRepository.createToken(newCard)

    const cardId = card.id;

    await cardRepository.save({ cardToken: token, customerId });

    const response = await sut.execute({ customerId, cardId });

    expect(response.isRight()).toBeTruthy();

    const cardDeleted = await cardRepository.get(cardId);

    if (response.isRight()) {
      expect(cardDeleted).toBeNull();
    }
  })

  it('should return ResourceNotFoundError when card does not exist', async () => {
    const customerId = 'customer-id';
    const cardId = 'card-id';

    const response = await sut.execute({ customerId, cardId });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  })

  it('should return NotAllowedError when card does not belong to the customer', async () => {
    const customerId = 'customer-id';
    const newCard = new CardBuilder().makeSimpleCardWithoutId(customerId);

    const { card, token } = await cardRepository.createToken(newCard)

    const cardId = card.id;

    await cardRepository.save({ cardToken: token, customerId });

    const response = await sut.execute({ customerId: 'another-customer-id', cardId });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  })
})
