export interface Message {
  id?: string
  content: string
  role: "USER" | "ASSISTANT"
}