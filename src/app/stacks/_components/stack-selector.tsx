"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createChatAction } from "../../chat/actions";

interface StackItem {
  id: string;
  name: string;
  icon: string;
}

interface StackSelectorProps {
  stacks: StackItem[];
  onConfirm?: (stack: StackItem) => void;
  description?: string;
}

export function StackSelector({ stacks, onConfirm, description }: StackSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  async function handleConfirm() {
    if (!selectedId) return;

    const stack = stacks.find((s) => s.id === selectedId);
    if (!stack) return;

    if (onConfirm) {
      onConfirm(stack);
      return;
    }

    // Cria o chat via Server Action
    const chat = await createChatAction({ stackId: stack.id });
    // Redireciona para a página do chat
    router.push(`/chat/${chat.id}/?stackId=${stack.id}&stackName=${encodeURIComponent(stack.name)}`);
  }

  return (
    <>
      <section className="flex w-full flex-col items-center gap-8">
        {description && (
          <p className="w-full text-base leading-relaxed text-text-body">
            {description}
          </p>
        )}
        <div className="flex w-full flex-wrap content-center items-center justify-center gap-3">
          {stacks.map((stack) => (
            <button
              key={stack.id}
              type="button"
              onClick={() => setSelectedId(stack.id)}
              className={`flex h-10 shrink-0 items-center gap-3 rounded-xl border px-2 py-3 transition-colors ${
                selectedId === stack.id
                  ? "border-border-strong bg-background-elevated"
                  : "border-border"
              }`}
            >
              <Image
                src={stack.icon}
                alt={stack.name}
                width={32}
                height={30}
                className="shrink-0 object-contain"
                unoptimized
              />
              <span className="whitespace-nowrap text-base font-bold text-foreground">
                {stack.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={!selectedId}
        className="flex w-full items-center justify-center rounded-lg bg-primary p-3 text-base font-semibold leading-relaxed text-primary-foreground disabled:opacity-50"
      >
        Confirmar
      </button>
    </>
  );
}
