import { storage } from "@/mastra";

export class MastraHistoryRepository {
  async getThreads() {
    const result = await storage.db.query(`
      SELECT 
        m.id,
        t.id AS thread_id,
        t.title,
        m.role,
        (m.content::jsonb)->>'content' AS message,
        m."createdAt" AS created_at
      FROM mastra_threads t
      JOIN mastra_messages m 
        ON m.thread_id = t.id
      ORDER BY m."createdAt" DESC;
    `);

    return result.rows ?? [];
  }
}