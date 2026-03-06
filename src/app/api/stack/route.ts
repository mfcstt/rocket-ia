import { StackSchemaDTO } from "@/app/core/dtos/create-stack-dto"
import { PrismaStackRepository } from "@/app/core/database/prisma/prisma-stack-repository"
import { CreateStack } from "@/app/core/use-cases/create-stack"
import { NextResponse } from "next/server"


export async function POST(request: Request){
  const body = await request.json()

  const parsed = StackSchemaDTO.safeParse(body)

  if(!parsed.success) {
     return NextResponse.json(
      { error: parsed.error},
      { status: 400 }
    )
  }

  const repository = new PrismaStackRepository()
  const useCase = new CreateStack(repository)

  const stack = await useCase.execute(parsed.data)

  return NextResponse.json(stack, { status: 201 })
}

export async function GET() {
  const repository = new PrismaStackRepository()
  const stacks = await repository.findAll()
  return NextResponse.json(stacks)
}