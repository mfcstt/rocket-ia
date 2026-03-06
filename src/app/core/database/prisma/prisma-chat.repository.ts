import prisma from "@/lib/prisma"
import type { Chat } from "../../entities/chat"
import type { ChatRepository } from "../../repositories/chat-repository"
import type { Message } from "../../entities/messages"

export class PrismaChatRepository implements ChatRepository {
  async createChat(data: {
    id: string
    stackId: string
    messages?: Message[]
  }): Promise<Chat> {
    const chat = await prisma.chat.create({
      data: {
        id: data.id,
        stackId: data.stackId,

        ...(data.messages && data.messages.length > 0 && {
          messages: {
            create: data.messages.map((message) => ({
              content: message.content,
              role: message.role,
            })),
          },
        }),
      },
      include: {
        messages: true,
      },
    })

    return chat
  }
}