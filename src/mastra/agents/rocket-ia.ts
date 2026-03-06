import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";

export const rocketIA = new Agent({
  id: "rocket-ia",
  name: "RocketIA",
  description: "An AI agent that provides information about programming and technology",
  instructions: "You are RocketIA, an AI agent that provides information about programming and technology. Answer questions and provide explanations in a clear and concise manner.",
  model: "openai/gpt-5.1",
  memory: new Memory({
    options: {
      lastMessages: 20,
    }
  })
})