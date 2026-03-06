
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background">
      <div className="flex w-full max-w-[390px] flex-col items-center gap-[42px] px-5 py-10">
        <div className="relative h-[191px] w-[194px]">
          <Image
            src="/orb.svg"
            alt="RocketIA"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="text-sm leading-relaxed text-text-span">
            O seu assistente de estudos em programação.
          </p>

          <div className="flex w-full flex-col gap-4">
            <h1 className="font-heading text-2xl font-bold leading-[1.3] tracking-[-0.48px] text-foreground">
              Seja bem-vindo(a) à RocketIA!
            </h1>

            <p className="text-base leading-relaxed text-text-body">
              Escolha uma área de estudos.
              <br />
              Tire suas dúvidas.
              <br />
              Armazene conhecimentos.
            </p>
          </div>
        </div>

        <Link
          href="/stacks"
          className="flex w-full items-center justify-center rounded-lg bg-primary p-3 text-base font-semibold leading-relaxed text-primary-foreground"
        >
          Iniciar
        </Link> 
      </div>
    </main>
  );
}
 