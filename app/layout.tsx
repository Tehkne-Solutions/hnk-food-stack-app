import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { TenantContextProvider } from "@/context/TenantContext";
import { AnalyticsProvider } from "@/providers/analytics-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { CartProvider } from "@/context/CartContext";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { RecoveryTracker } from "@/components/recovery-tracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
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
  // GTM Container ID - Substitua pelo ID real do seu GTM
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

  // Meta Pixel ID - Substitua pelo ID real do seu Meta Pixel
  const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID || "123456789";

  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body
        className="bg-ember-dark text-white antialiased"
      >
        {/* Google Tag Manager (noscript) - Fallback para JavaScript desabilitado */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            className="hidden"
          />
        </noscript>

        {/* Meta Pixel (noscript) - Fallback para JavaScript desabilitado */}
        <noscript>
          <img
            height="1"
            width="1"
            className="hidden"
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt="meta-pixel"
          />
        </noscript>

        <AnalyticsProvider>
          <TenantContextProvider>
            <ThemeProvider>
              <CartProvider>
                {children}
                <CookieConsentBanner />
                <RecoveryTracker />
              </CartProvider>
            </ThemeProvider>
          </TenantContextProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
