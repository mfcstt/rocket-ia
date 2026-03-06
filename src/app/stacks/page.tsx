import Image from "next/image";
import { PrismaStackRepository } from "@/app/core/database/prisma/prisma-stack-repository";
import { StackSelector } from "./_components/stack-selector";

export default async function StackPage() {
  const repository = new PrismaStackRepository();
  const stacks = await repository.findAll();

  return (
    <main className="mx-auto flex h-dvh w-full max-w-97.5 flex-col justify-between px-5 py-10">
      <header className="flex items-center gap-2">
        <div className="relative h-7.75 w-8">
          <Image src="/orb.svg" alt="RocketIA" fill className="object-cover" />
        </div>
        <span className="text-base font-bold text-foreground">RocketIA</span>
      </header>

      <StackSelector
        description="Qual área de programação vamos estudar juntos?"
        stacks={stacks.map((s) => ({
          id: s.id,
          name: s.name,
          icon: s.icon,
        }))}
      />
    </main>
  );
}
