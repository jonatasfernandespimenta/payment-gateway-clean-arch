import { beforeEach, describe, expect, it } from "@jest/globals";
import { CardRepository } from "../repositories/card-repository";
import { GetCardUseCase } from "./get-card-use-case";
import { InMemoryCardRepository } from "../../test/repositories/in-memory-card-repository";
import { CardBuilder } from "../../test/builders/card-builder";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let cardRepository: CardRepository;
let sut: GetCardUseCase;

describe("Get Card Use Case", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    sut = new GetCardUseCase(cardRepository);
  });

  it("should return a card", async () => {
    const { token, card } = await cardRepository.createToken(new CardBuilder().makeSimpleCardWithoutId('123'));

    await cardRepository.save({ cardToken: token, customerId: "123" });

    const sutResponse = await sut.execute({ cardId: card.id });

    if(sutResponse.isRight()) {
      expect(sutResponse.value.card.id).toBe(card.id);
    }

    expect(sutResponse.isRight()).toBeTruthy();
  });

  it("should return a resource not found error", async () => {
    const card = await sut.execute({ cardId: "123" });

    expect(card.isLeft()).toBeTruthy();
    expect(card.value).toBeInstanceOf(ResourceNotFoundError);
  });
})
