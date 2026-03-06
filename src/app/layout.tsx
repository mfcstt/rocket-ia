import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["700"],
});


export const metadata: Metadata = {
  title: "RocketIA",
  description: "O seu assistente de estudos em programação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} ${sora.variable} bg-background font-sans text-text-body`}
      >
        {children}
      </body>
    </html>
  );
}
