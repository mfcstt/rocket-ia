"use server";

import { CreateChat } from "../core/use-cases/create-chat";
import type { CreateChatDTO } from "../core/dtos/create-chat-dto";

export async function createChatAction(dto: CreateChatDTO) {
  const useCase = new CreateChat();
  const chat = await useCase.execute(dto);
  return chat;
}
