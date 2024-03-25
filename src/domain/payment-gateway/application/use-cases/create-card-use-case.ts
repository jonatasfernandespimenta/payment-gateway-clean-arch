import { Either, right } from "../../../../core/either";
import { Card } from "../../enterprise/interfaces/card";
import { CreateCardToken } from "../../enterprise/interfaces/create-card-token";
import { CardRepository } from "../repositories/card-repository";

interface CreateCardUseCaseProps {
  card: CreateCardToken;
}

type CreateCardUseCaseResponse = Either<{}, { token: string, card: Card }>;

export class CreateCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({ card }: CreateCardUseCaseProps): Promise<CreateCardUseCaseResponse> {
    const createdCard = await this.cardRepository.createToken(card);

    await this.cardRepository.save({ cardToken: createdCard.token, customerId: card.customerId });
    return right(createdCard);
  }
} 
