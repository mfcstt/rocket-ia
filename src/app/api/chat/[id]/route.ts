import { handleChatStream } from '@mastra/ai-sdk'
import { toAISdkV5Messages } from '@mastra/ai-sdk/ui'
import { createUIMessageStreamResponse } from 'ai'
import { mastra, storage } from '@/mastra'
import { NextResponse } from 'next/server'

const RESOURCE_ID = 'rocket-ia-memory'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

  const body = await req.json()
  const { stackName } = body

  const stream = await handleChatStream({
    mastra,
    agentId: 'rocket-ia',
    params: {
      ...body,
      system: `The user is studying the ${stackName}. Be helpful and focus your answers in this stack`,
      memory: {
        ...body.memory,
        thread: id,
        resource: RESOURCE_ID,
        options: {
          generateTitle: true,
        }
      },
    },
  })

  return createUIMessageStreamResponse({ stream: stream as any })
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const memory = await mastra
    .getAgentById("rocket-ia")
    .getMemory()

  let response = null

  try {
    response = await memory?.recall({
      threadId: id,
      resourceId: RESOURCE_ID,
      perPage: false,
    })
  } catch {
    console.log("No previous messages found.")
  }

  const uiMessages = toAISdkV5Messages(response?.messages ?? [])

  return NextResponse.json(uiMessages)
}
