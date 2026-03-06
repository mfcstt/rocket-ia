import type { Message } from "./messages"

export interface Chat {
  id: string
  stackId: string
  messages?: Message[]
  createdAt: Date
  updatedAt: Date
}