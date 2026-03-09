import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Thread = {
  thread_id: string
  title: string
  role: string
  message: string
  created_at: Date
}

type Stack = {
  id: string
  name: string
  icon?: string
}

type Props = {
  threads: Thread[]
  stacks: Stack[]
}

export function HistoryList({ threads }: Props) {
  return (
    <div className="grid gap-4">
      {threads.map((thread) => (
        <Card key={thread.thread_id}>
          <CardHeader className="flex items-center gap-3">
            <div className="flex-1">
              <CardTitle>{thread.title || "Sem título"}</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              {thread.message}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}