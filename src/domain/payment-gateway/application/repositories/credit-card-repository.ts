import { CreateCard } from '../../enterprise/interfaces/create-card';
import { Card } from '../../enterprise/interfaces/card';
import { CreateCardToken } from '../../enterprise/interfaces/create-card-token';

export interface CreditCardRepository {
  save(customerId: string, card: CreateCard): Promise<void>;
  get(id: string): Promise<Card | null>;
  createToken(card: CreateCardToken): Promise<{ token: string, card: Card }>;
  update(customerId: string, id: string, card: CreateCard): Promise<void>;
  delete(customerId: string, id: string): Promise<void>;
}
