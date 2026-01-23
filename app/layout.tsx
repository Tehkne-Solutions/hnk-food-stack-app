import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TenantProvider } from "@/providers/tenant-provider";
import { AnalyticsProvider } from "@/providers/analytics-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { RecoveryTracker } from "@/components/recovery-tracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HNK Food Stack - Churrascaria Premium",
  description: "Cardápio digital e agendamento de eventos para churrascaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider>
          <TenantProvider>
            <ThemeProvider>
              {children}
              <CookieConsentBanner />
              <RecoveryTracker />
            </ThemeProvider>
          </TenantProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
