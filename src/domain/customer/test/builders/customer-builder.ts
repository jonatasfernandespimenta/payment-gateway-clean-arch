import { faker } from '@faker-js/faker';
import { Customer } from '../../enterprise/interfaces/customer';
import { CreateCustomer } from '../../enterprise/interfaces/create-customer';

export class CustomerBuilder {
  makeSimpleCustomer(id: string): Customer {
    return {
      id,
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      birthday: faker.date.past().toISOString(),
      document: faker.string.alphanumeric(11),
      address: {
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        complement: faker.location.secondaryAddress(),
        district: faker.location.county(),
        city: faker.location.city(),
        uf: faker.location.state(),
        zipCode: faker.location.zipCode()
      }
    };
  }

  makeSimpleCustomerWithoutId(): CreateCustomer {
    return {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      birthday: faker.date.past().toISOString(),
      document: faker.string.alphanumeric(11),
      address: {
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        complement: faker.location.secondaryAddress(),
        district: faker.location.county(),
        city: faker.location.city(),
        uf: faker.location.state(),
        zipCode: faker.location.zipCode()
      }
    };
  }
}
