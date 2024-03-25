import { beforeEach, describe, expect, it } from "@jest/globals";
import { CardRepository } from "../repositories/card-repository";
import { UpdateCardUseCase } from "./update-card-use-case";
import { InMemoryCardRepository } from "../../test/repositories/in-memory-card-repository";
import { CardBuilder } from "../../test/builders/card-builder";
import { NotAllowedError } from "./errors/not-allowed-errorr";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let cardRepository: CardRepository;
let sut: UpdateCardUseCase;

describe("Update Card Use Case", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository;
    sut = new UpdateCardUseCase(cardRepository);
  });

  it("should update a card", async () => {
    const customerId = "123";

    const cardToBeCreated = new CardBuilder().makeSimpleCardWithoutId(customerId);

    const { token, card } = await cardRepository.createToken(cardToBeCreated);
    await cardRepository.save({ cardToken: token, customerId });

    const cardToUpdate = { name: 'Main Card' }

    const sutResponse = await sut.execute({ cardId: card.id, customerId, card: cardToUpdate });

    expect(sutResponse.isRight()).toBeTruthy();
    
    if(sutResponse.isRight()) {
      const foundCard = await cardRepository.get(card.id);
     
      expect(foundCard?.name).toBe(cardToUpdate.name);
    }
  });

  it("should return ResourceNotFoundError when card does not exist", async () => {
    const customerId = "123";

    const cardToUpdate = { name: 'Main Card' }

    const sutResponse = await sut.execute({ cardId: '123', customerId, card: cardToUpdate });

    expect(sutResponse.isLeft()).toBeTruthy();
    expect(sutResponse.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it("should return NotAllowedError when card does not belong to the customer", async () => {
    const customerId = "123";

    const cardToBeCreated = new CardBuilder().makeSimpleCardWithoutId(customerId);

    const { token, card } = await cardRepository.createToken(cardToBeCreated);
    await cardRepository.save({ cardToken: token, customerId });

    const cardToUpdate = { name: 'Main Card' }

    const sutResponse = await sut.execute({ cardId: card.id, customerId: '456', card: cardToUpdate });

    expect(sutResponse.isLeft()).toBeTruthy();
    expect(sutResponse.value).toBeInstanceOf(NotAllowedError);
  });
})
