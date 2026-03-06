import { StackRepository } from "../repositories/stack-repository";

interface Request {
  name: string;
  icon: string;
}

export class CreateStack {
  constructor(private stackRepository: StackRepository) {}

  async execute({ name, icon }: Request) {

  const existingStack = await this.stackRepository.findByName(name);

  if(existingStack) {
    throw new Error('Stack with this name already exists');
  }

  const stack = await this.stackRepository.create({
    name,
    icon
  })

  return stack;

  }
}