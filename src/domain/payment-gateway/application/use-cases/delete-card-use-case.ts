import { Either, left, right } from "../../../../core/either";
import { CardRepository } from "../repositories/card-repository";
import { NotAllowedError } from "./errors/not-allowed-errorr";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteCardUseCaseProps {
  cardId: string;
  customerId: string;
}

type DeleteCardUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {}>;

export class DeleteCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({ cardId, customerId }: DeleteCardUseCaseProps): Promise<DeleteCardUseCaseResponse> {
    const card = await this.cardRepository.get(cardId);

    if (!card) {
      return left(new ResourceNotFoundError())
    }

    if (card.customerId !== customerId) {
      return left(new NotAllowedError())
    }

    await this.cardRepository.delete(customerId, cardId);

    return right({});
  }
}
