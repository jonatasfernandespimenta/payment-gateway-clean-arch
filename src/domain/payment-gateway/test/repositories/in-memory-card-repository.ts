import { CardRepository } from "../../application/repositories/card-repository";
import { Card } from "../../enterprise/interfaces/card";
import { CreateCard } from "../../enterprise/interfaces/create-card";
import { CreateCardToken } from "../../enterprise/interfaces/create-card-token";
import { UpdateCard } from "../../enterprise/interfaces/update-card";

export class InMemoryCardRepository implements CardRepository {
  private cards: Card[] = [];
  private tokens: { [key: string]: Card } = {};

  async get(id: string): Promise<Card | null> {
    const card = this.cards.find(card => card.id === id);

    if (!card) {
      return null;
    }

    return Promise.resolve(card);
  }

  async createToken(card: CreateCardToken): Promise<{ token: string, card: Card }> {
    const token = Math.random().toString();
    const id = Math.random().toString();

    this.tokens[token] = { ...card, id };

    return Promise.resolve({ token, card: { ...card, id } });
  }

  async save(card: CreateCard): Promise<void> {
    const token = this.tokens[card.cardToken];
    this.cards.push({ ...token, customerId: card.customerId });
  }

  async update(customerId: string, id: string, card: UpdateCard): Promise<void> {
    const index = this.cards.findIndex(card => card.id === id);
    const foundCard = this.cards[index];

    this.cards[index] = { ...foundCard, ...card, customerId };
  }

  async delete(customerId: string, id: string): Promise<void> {
    this.cards = this.cards.filter(card => card.id !== id);
  }
}
