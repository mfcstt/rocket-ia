
import type { MastraHistoryRepository } from "../database/mastra/mastra-history-repository";
import type { StackRepository } from "../repositories/stack-repository";

export class GetHistoryThreads {
  constructor(
    private stackRepository: StackRepository,
    private historyRepository: MastraHistoryRepository
  ) {}

  async execute() {
    const stacks = await this.stackRepository.findAll();
    const messages = await this.historyRepository.getThreads();

    const threads = Object.values(
      messages.reduce((acc: Record<string, any>, msg: any) => {
        if (
          !acc[msg.thread_id] ||
          new Date(acc[msg.thread_id].created_at) < new Date(msg.created_at)
        ) {
          acc[msg.thread_id] = msg;
        }
        return acc;
      }, {})
    );

    return {
      stacks,
      threads,
    };
  }
}