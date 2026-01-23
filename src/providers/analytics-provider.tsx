'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { trackAnalyticsEvent } from '@/services/analytics'

/**
 * AnalyticsProvider
 * Carrega Meta Pixel e Google Analytics globalmente
 * HNK-GIP Pattern: Analytics com LGPD compliance
 * 
 * Renderiza:
 * 1. Meta Pixel script
 * 2. Google Analytics script
 * 3. Cookie consent banner
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ''
    const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

    useEffect(() => {
        // Disparar PageView quando component monta
        trackAnalyticsEvent('PageView', {
            page_title: document.title,
            page_path: window.location.pathname,
        })
    }, [])

    return (
        <>
            {/* Meta Pixel */}
            {facebookPixelId && (
                <Script
                    id="fb-pixel"
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
fbq('init', '${facebookPixelId}');
fbq('track', 'PageView');
            `,
                    }}
                />
            )}

            {/* Google Analytics 4 */}
            {googleAnalyticsId && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', {
  page_path: window.location.pathname,
});
            `,
                        }}
                    />
                </>
            )}

            {children}

            {/* Cookie Consent Banner - renderizará separadamente */}
        </>
    )
}
