"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { StackSelector, StackItem } from "./_components/stack-selector"
import { createChatAction } from "../chat/actions"
import { useRouter } from "next/navigation"

export default function StackPage() {
  const [stacks, setStacks] = useState<StackItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    async function fetchStacks() {
      try {
        const res = await fetch("/api/stack")
        const data = await res.json()
        setStacks(data)
      } catch (error) {
        console.error("Erro ao buscar stacks:", error)
      }
    }

    fetchStacks()
  }, [])

  async function handleConfirm() {

    if (!selectedId) return

    const selectedStack = stacks.find((s) => s.id === selectedId)
    if (!selectedStack) return

      const chat = await createChatAction({ stackId: selectedStack.id })
      console.log("chat criado:", chat)

    router.push(`/chat/${chat.id}?stackId=${selectedStack.id}&stackName=${selectedStack.name}`)
  }

  return (
    <main className="mx-auto flex h-dvh w-full max-w-97.5 flex-col justify-between px-5 py-10">
      
      {/* HEADER */}
      <header className="flex items-center gap-2">
        <div className="relative h-7.75 w-8">
          <Image
            src="/orb.svg"
            alt="RocketIA"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>

        <span className="text-base font-bold text-foreground">
          RocketIA
        </span>
      </header>

      {/* CONTEÚDO */}
      <section className="flex w-full flex-col items-center gap-8">
        <p className="w-full text-base leading-relaxed text-text-body">
          Qual área de programação vamos estudar juntos?
        </p>

        <StackSelector
          stacks={stacks}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </section>

      {/* BOTÃO */}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={!selectedId}
        className="flex w-full items-center justify-center rounded-lg bg-primary p-3 text-base font-semibold leading-relaxed text-primary-foreground disabled:opacity-50"
      >
        Confirmar
      </button>
    </main>
  )
}