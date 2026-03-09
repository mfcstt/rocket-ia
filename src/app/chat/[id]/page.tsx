import { redirect } from "next/navigation"
import { PrismaStackRepository } from "@/app/core/database/prisma/prisma-stack-repository"
import Chat from "../_components/chat"

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ stackId?: string; stackName?: string }>
}) {
  const { id } = await params
  const { stackId, stackName } = await searchParams

  const repository = new PrismaStackRepository()
  const stacks = await repository.findAll()

  return <div>
    <Chat 
    stackId={stackId as string} 
    stackName={stackName as string} 
    id={id as string} 
    stacks={stacks.map((s) => ({ id: s.id, name: s.name, icon: s.icon }))} 
    />
    </div>

}