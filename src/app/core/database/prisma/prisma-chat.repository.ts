import prisma from "@/lib/prisma"
import type { Chat } from "../../entities/chat"
import type { ChatRepository } from "../../repositories/chat-repository"

export class PrismaChatRepository implements ChatRepository {
  async createChat(data: {
    id: string
    stackId: string
  }): Promise<Chat> {
    const chat = await prisma.chat.create({
      data: {
        id: data.id,
        stackId: data.stackId,
      },

    })

    return chat
  }
}