"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Sparkles, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const chatHref = `/chat?${searchParams.toString()}`

  return (
    <nav className="flex items-center justify-center gap-8 bg-background-elevated px-10 py-5">
      <Link href={chatHref} className="flex flex-col items-center gap-3">
        <Sparkles
          className={cn(
            "size-6",
            pathname === "/chat" ? "text-primary" : "text-text-span"
          )}
        />
        <span
          className={cn(
            "text-sm font-bold",
            pathname === "/chat" ? "text-primary" : "text-text-span"
          )}
        >
          Chat
        </span>
      </Link>

      <Link href="/history" className="flex flex-col items-center gap-3">
        <Clock
          className={cn(
            "size-6",
            pathname === "/history" ? "text-primary" : "text-text-span"
          )}
        />
        <span
          className={cn(
            "text-sm font-bold",
            pathname === "/history" ? "text-primary" : "text-text-span"
          )}
        >
          Histórico
        </span>
      </Link>
    </nav>
  )
}
