export default async function HistoryPage() {
  // export async function GET() {
    //const memory = await mastra.getAgentById('rocket-ia').getMemory()
  const messages = await fetch("/api/chat").then((res) => res.json())
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat History</h1>
      <p>This is where the chat history will be displayed.</p>
    </div>
  )
}