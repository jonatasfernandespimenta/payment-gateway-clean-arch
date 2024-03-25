import { faker } from "@faker-js/faker";
import { Card } from "../../enterprise/interfaces/card";
import { CreateCardToken } from "../../enterprise/interfaces/create-card-token";

export class CardBuilder {
  makeSimpleCard(id: string, customerId: string): Card {
    return {
      id,
      name: faker.person.fullName(),
      brand: 'visa',
      country: faker.location.country(),
      expMonth: faker.date.month(),
      expYear: '2028',
      lastFour: faker.finance.creditCardNumber().slice(-4),
      customerId
    };
  };

  makeSimpleCardWithoutId(customerId: string): CreateCardToken {
    return {
      name: faker.person.fullName(),
      brand: 'visa',
      country: faker.location.country(),
      expMonth: faker.date.month(),
      expYear: '2028',
      lastFour: faker.finance.creditCardNumber().slice(-4),
      customerId
    };
  };
}
