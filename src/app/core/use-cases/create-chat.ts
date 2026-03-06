import { PrismaChatRepository } from "../database/prisma/prisma-chat.repository";
import type { CreateChatDTO } from "../dtos/create-chat-dto";
import { randomUUID } from "crypto";

export class CreateChat {
  private chatRepository: PrismaChatRepository;

  constructor() {
    this.chatRepository = new PrismaChatRepository();
  }

  async execute(dto: CreateChatDTO) {
    const chat = await this.chatRepository.createChat({
      id: randomUUID(),
      stackId: dto.stackId,
    });
    return chat;
  }
}
