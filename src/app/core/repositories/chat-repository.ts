import type { Chat } from "../entities/chat"
import type { Message } from "../entities/messages"

export interface ChatRepository {
  createChat(data: {
    id: string
    stackId: string
    messages?: Message[]
  }): Promise<Chat>
}