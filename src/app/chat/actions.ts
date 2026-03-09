"use server";

import { CreateChat } from "../core/use-cases/create-chat";
import type { CreateChatDTO } from "../core/dtos/create-chat-dto";
import { mastra } from "@/mastra";

export async function createChatAction(dto: CreateChatDTO) {
  const useCase = new CreateChat();
  const chat = await useCase.execute(dto);
  return chat;
}

// export async function getMessages(chatId: string) {
//   const agent = mastra.getAgent("rocketIA")
//   const memory = await agent.getMemory()

//   const result = await memory?.recall({
//     threadId: chatId,
//      resourceId: "rocket-ia-memory",
//     perPage: false,
//   })

//   return result?.messages ?? []
// }
