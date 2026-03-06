"use client"

import Image from "next/image"
import { ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatNavbarProps {
  onSwitchStack: () => void
}

export function ChatNavbar({ onSwitchStack }: ChatNavbarProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative h-7.75 w-8">
          <Image src="/orb.svg" alt="RocketIA" fill className="object-cover" />
        </div>
        <span className="text-base font-bold text-foreground">RocketIA</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onSwitchStack}
        className="rounded-lg bg-background-elevated"
      >
        <ArrowLeftRight className="size-5" />
      </Button>
    </header>
  )
}
