import { describe, expect, it, beforeEach } from '@jest/globals';

import { CreateCustomerUseCase } from './create-customer-use-case';
import { CustomerBuilder } from '../../test/builders/customer-builder'
import { CustomerRepository } from '../repositories/customer-repository';
import { InMemoryCustomerRepository } from '../../test/repositories/in-memory-customer-repository';

let customerRepository: CustomerRepository;
let sut: CreateCustomerUseCase;

describe('Create Customer UseCase', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    sut = new CreateCustomerUseCase(customerRepository);
  });

  it('should create a customer', async () => {
    const simpleCustomer = new CustomerBuilder().makeSimpleCustomerWithoutId();

    const createCustomerUseCase = await sut.execute({ customer: simpleCustomer });

    if(createCustomerUseCase.isRight()) {
      const foundCustomer = await customerRepository.get(createCustomerUseCase.value.customer.id);
  
      expect(foundCustomer).toEqual(createCustomerUseCase.value.customer);
    }

  });
});
