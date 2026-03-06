import prisma from "@/lib/prisma";
import type { Stack } from "../../entities/stack";
import type { StackRepository } from "../../repositories/stack-repository";

export class PrismaStackRepository implements StackRepository {
  async create(data: { name: string; icon: string; }) {
    const stack = await prisma.stack.create({
      data,
    })
    return stack
  }
  async findById(id: string) {
    const stack = await prisma.stack.findUnique({
      where: { id }
    })
    return stack
  }
  async findAll() {
    const stacks = await prisma.stack.findMany()
    return stacks
  }
  async update(id: string, stack: Stack) {
    const updatedStack = await prisma.stack.update({
      where: { id },
      data: stack
    })
    return updatedStack
  }
  async findByName(name: string) {
    const stack = await prisma.stack.findFirst({
      where: { name }
    })
    return stack
  }
}
