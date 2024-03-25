import { Either, left, right } from "../../../../core/either";
import { UpdateCard } from "../../enterprise/interfaces/update-card";
import { CardRepository } from "../repositories/card-repository";
import { NotAllowedError } from "./errors/not-allowed-errorr";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateCardUseCaseProps {
  customerId: string;
  cardId: string;
  card: UpdateCard;
}

type UpdateCardUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {}>;

export class UpdateCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute({ card, cardId, customerId }: UpdateCardUseCaseProps): Promise<UpdateCardUseCaseResponse> {
    const cardExists = await this.cardRepository.get(cardId);

    if(!cardExists) {
      return left(new ResourceNotFoundError());
    }

    if(cardExists.customerId !== customerId) {
      return left(new NotAllowedError());
    }

    await this.cardRepository.update(customerId, cardId, card);

    return right({});
  }
}
