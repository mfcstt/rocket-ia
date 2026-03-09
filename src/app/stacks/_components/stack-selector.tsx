import Image from "next/image"

export interface StackItem {
  id: string
  name: string
  icon: string
}

interface StackSelectorProps {
  stacks: StackItem[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}

export function StackSelector({
  stacks,
  selectedId,
  onSelect,
}: StackSelectorProps) {
  return (
    <div className="flex w-full flex-wrap content-center items-center justify-center gap-3">
      {stacks.map((stack) => (
        <button
          key={stack.id}
          type="button"
          onClick={() => onSelect?.(stack.id)}
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
  )
}