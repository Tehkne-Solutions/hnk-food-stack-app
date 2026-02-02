import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { IndustrialFooter } from "@/components/landing/IndustrialFooter";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | HNK Food Stack",
    default: "HNK Food Stack - Plataforma Premium de Cardápio Digital",
  },
  description: "Sistema completo de cardápio digital, pedidos e gestão para restaurantes premium. Experiência Glass-Noir com Inteligência Artificial para atendimento ao cliente.",
  keywords: ["cardápio digital", "restaurante", "pedidos online", "churrascaria", "gestão de pedidos", "IA para restaurante"],
  openGraph: {
    title: "HNK Food Stack - Cardápio Digital Premium",
    description: "Transforme seu restaurante com nossa plataforma digital completa",
    url: process.env.NEXT_PUBLIC_URL || "https://hnk-food-stack.vercel.app",
    siteName: "HNK Food Stack",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head />
      <body className="bg-[#050505] text-white antialiased">
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <IndustrialFooter />
      </body>
    </html>
  );
}
