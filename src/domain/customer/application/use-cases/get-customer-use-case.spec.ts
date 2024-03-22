import { describe, expect, it, beforeEach } from '@jest/globals';

import { CustomerRepository } from '../repositories/customer-repository';
import { InMemoryCustomerRepository } from '../../test/repositories/in-memory-customer-repository';
import { CustomerBuilder } from '../../test/builders/customer-builder';
import { GetCustomerUseCase } from './get-customer-use-case';

let customerRepository: CustomerRepository;
let sut: GetCustomerUseCase;

describe('Update Customer UseCase', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    sut = new GetCustomerUseCase(customerRepository);
  });

  it('Should get a customer', async () => {
    const newCustomer = new CustomerBuilder().makeSimpleCustomerWithoutId();
    const { id } = await customerRepository.save(newCustomer);

    const result = await sut.execute({ customerId: id });

    if(result.isRight()) {
      expect(result.isRight()).toBeTruthy();
      expect(result.value.customer.id).toBe(id);
    }
  });

  it('Should return a ResourceNotFoundError if customer does not exist', async () => {
    const result = await sut.execute({ customerId: 'non-existing' });

    expect(result.isLeft()).toBeTruthy();
  })
});
