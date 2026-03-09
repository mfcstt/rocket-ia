import { MastraHistoryRepository } from "../core/database/mastra/mastra-history-repository";
import { PrismaStackRepository } from "../core/database/prisma/prisma-stack-repository";
import { GetHistoryThreads } from "../core/use-cases/get-history";
import { HistoryList } from "./_components/history-list";

export default async function HistoryPage() {

  const useCase = new GetHistoryThreads(
    new PrismaStackRepository(),
    new MastraHistoryRepository()
  );

  const { stacks, threads } = await useCase.execute();

  return (
    <main>
      <HistoryList stacks={stacks} threads={threads} />
    </main>
  );
}