import { CreateCard } from '../../enterprise/interfaces/create-card';
import { Card } from '../../enterprise/interfaces/card';
import { CreateCardToken } from '../../enterprise/interfaces/create-card-token';
import { UpdateCard } from '../../enterprise/interfaces/update-card';

export interface CardRepository {
  save(card: CreateCard): Promise<void>;
  get(id: string, customerId?: string): Promise<Card | null>;
  createToken(card: CreateCardToken): Promise<{ token: string, card: Card }>;
  update(customerId: string, id: string, card: UpdateCard): Promise<void>;
  delete(customerId: string, id: string): Promise<void>;
}
