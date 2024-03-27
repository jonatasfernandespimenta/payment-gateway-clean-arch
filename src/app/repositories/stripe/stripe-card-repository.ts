import { CardRepository } from "../../../domain/payment-gateway/application/repositories/card-repository";
import { Card } from "../../../domain/payment-gateway/enterprise/interfaces/card";
import { CreateCard } from "../../../domain/payment-gateway/enterprise/interfaces/create-card";
import { CreateCardToken } from "../../../domain/payment-gateway/enterprise/interfaces/create-card-token";
import { UpdateCard } from "../../../domain/payment-gateway/enterprise/interfaces/update-card";
import { stripe, stripeApi } from './stripe'

export class StripeCardRepository implements CardRepository {
  async get(id: string, customerId: string): Promise<Card | null> {
    try {
      const response = await stripeApi.get(`/customers/${customerId}/cards/${id}`);

      return {
        id: response.data.id,
        brand: response.data.brand,
        country: response.data.country,
        customerId: response.data.customer,
        expMonth: response.data.exp_month,
        expYear: response.data.exp_year,
        lastFour: response.data.last4,
        name: response.data.name,
        funding: response.data.funding,
      }
    } catch (error) {
      return null;
    }
  };

  async createToken(card: CreateCardToken): Promise<{ token: string; card: Card; }> {
    const response = await stripe.tokens.create({
      card: {
        name: card.name,
        number: card.number,
        exp_month: card.expMonth,
        exp_year: card.expYear,
        cvc: card.cvc,
      }
    });

    if(!response.card) {
      throw new Error('Card not found');
    }

    return {
      token: response.id,
      card: {
        id: response.id,
        brand: response.card.brand,
        country: response.card.country || '',
        customerId: '',
        expMonth: response.card.exp_month.toString(),
        expYear: response.card.exp_year.toString(),
        lastFour: response.card?.last4,
        name: '',
        funding: 'unknown',
      }
    }
  };

  async save(card: CreateCard): Promise<void> {
    await stripe.customers.createSource(card.customerId, {
      source: card.cardToken,
    })
  };

  async update(customerId: string, id: string, card: UpdateCard): Promise<void> {
    await stripe.customers.updateSource(customerId, id, {
      ...(card.name && { name: card.name }),
      ...(card.expMonth && { exp_month: card.expMonth }),
      ...(card.expYear && { exp_year: card.expYear }),
    });
  };

  async delete(customerId: string, id: string): Promise<void> {
    await stripe.customers.deleteSource(customerId, id);
  };
}
