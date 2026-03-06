import { redirect } from "next/navigation"
import { PrismaStackRepository } from "@/app/core/database/prisma/prisma-stack-repository"
import Chat from "../_components/chat"

export default async function ChatPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { stackId, stackName } = await searchParams

  if (!stackId || !stackName) {
    redirect("/stacks")
  }

  const repository = new PrismaStackRepository()
  const stacks = await repository.findAll()

  return (
    <Chat
      stackId={stackId as string}
      stackName={stackName as string}
      stacks={stacks.map((s) => ({ id: s.id, name: s.name, icon: s.icon }))}
    />
  )
}