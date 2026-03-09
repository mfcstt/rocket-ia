"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import { MessageResponse } from "@/components/ai-elements/message"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useChat } from '@ai-sdk/react'

import { StackSelector } from "@/app/stacks/_components/stack-selector"
import { ChatNavbar } from "./chat-navbar"
import { BottomNavigation } from "./bottom-navigation"
import { DefaultChatTransport } from "ai"

interface StackItem {
  id: string
  name: string
  icon: string
}

interface ChatProps {
  id: string
  stackId: string
  stackName: string
  stacks: StackItem[]
}

function Chat({ stackId, stackName, stacks, id }: ChatProps) {
  const [input, setInput] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const router = useRouter()

  
const { messages, setMessages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({
    api: `/api/chat/${id}`,
  }),
})

useEffect(() => {
  async function loadMessages() {
    try {
      const res = await fetch(`/api/chat/${id}`)
      const data = await res.json()
      setMessages(data) 
    } catch (error) {
      console.error("Error fetching chat data:", error)
    }
  }

  if (id) {
    loadMessages()
  }
}, [id, setMessages])


 const handleSubmit = () => {
    if (!input.trim()) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }
 

  return (
    <main className="mx-auto flex h-dvh w-full max-w-97.5 flex-col justify-between px-5 py-10">

      <ChatNavbar onSwitchStack={() => setDialogOpen(true)} />

      <Conversation className="mt-4 flex-1">
        <ConversationContent className="gap-4">
          <div className="text-base leading-relaxed text-text-body">
            <p>Olá, Dev!</p>
            <p>
              Vamos começar seus estudos sobre{" "}
              <span className="font-semibold">{stackName}</span>
            
            </p>
          </div>

          {messages.map((message) => (
              <div key={message.id} className="flex flex-col gap-3">
                {message.parts?.map((part, i) => {
                  if (part.type !== "text") return null

                  if (message.role === "user") {
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="ml-auto max-w-[85%] rounded-2xl rounded-br-none bg-background-section px-4 py-2.5 text-base text-muted-foreground"
                      >
                        {part.text}
                      </div>
                    )
                  }

                  return (
                    <div
                      key={`${message.id}-${i}`}
                      className="max-w-[85%] rounded-2xl rounded-bl-none border border-border bg-primary px-4 py-2.5 text-base text-primary-foreground"
                    >
                      <MessageResponse>{part.text}</MessageResponse>
                    </div>
                  )
                })}
              </div>
            ))}

          <ConversationScrollButton />
        </ConversationContent>
      </Conversation>

      <div className="flex flex-col gap-3 pb-4 pt-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Qual a sua dúvida sobre ${stackName.toUpperCase()}?`}
           disabled={status !== "ready"}

        
          className="min-h-20 resize-none"
        />

        <Button
          className="w-full p-3 text-base font-semibold"
          size="lg"
        >
          Enviar
        </Button>
      </div>

      <BottomNavigation />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trocar Stack</DialogTitle>
          </DialogHeader>
          <StackSelector
            stacks={stacks}
            selectedId={stackId}
            onSelect={(newStackId) => {
              const selectedStack = stacks.find((s) => s.id === newStackId)
              if (!selectedStack) return
              router.push(`/chat/${id}?stackId=${selectedStack.id}&stackName=${selectedStack.name}`)
            }}

          />
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default Chat