import { beforeEach, describe, expect, it } from "@jest/globals";
import { CardRepository } from "../repositories/card-repository";
import { CreateCardUseCase } from "./create-card-use-case";
import { InMemoryCardRepository } from "../../test/repositories/in-memory-card-repository";
import { CardBuilder } from "../../test/builders/card-builder";

let cardRepository: CardRepository;
let sut: CreateCardUseCase;

describe("Create Card Use Case", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    sut = new CreateCardUseCase(cardRepository);
  });

  it("should create a card", async () => {
    const card = new CardBuilder().makeSimpleCardWithoutId("123");

    const response = await sut.execute({ card });

    expect(response.isRight()).toBeTruthy();

    if(response.isRight()) {
      expect(response.value).toHaveProperty("token");
      expect(response.value).toHaveProperty("card");
      expect(response.value.card.customerId).toEqual("123");
    }
  });
})
