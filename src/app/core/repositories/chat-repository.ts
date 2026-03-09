import type { Chat } from "@/generated/prisma/client"

export interface ChatRepository {
  createChat(data: {
    id: string
    stackId: string
    // Relacionamento com mastra_messages será feito via campo chatId
  }): Promise<Chat>
}