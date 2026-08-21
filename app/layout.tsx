import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'مخزن — إدارة المبيعات والمخزون وحسابات العملاء',
  description:
    'مخزن نظام لإدارة المبيعات والمخزون وديون العملاء والراجع والتقارير للشركات الإنشائية، ويواصل العمل عند انقطاع الإنترنت.',
  icons: { icon: '/assets/makhzan-mark.svg' },
  openGraph: {
    type: 'website',
    locale: 'ar_IQ',
    title: 'مخزن — إدارة المبيعات والمخزون وحسابات العملاء',
    description:
      'المبيعات والمخزون وديون العملاء والراجع والتقارير في نظام واحد للشركات الإنشائية.',
  },
};

export const viewport: Viewport = { themeColor: '#eceff3' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preload" href="/assets/fonts/IBMPlexSansArabic-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/IBMPlexSansArabic-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/style.css?v=20260822" />
      </head>
      <body id="top">
        {children}
        <script src="/assets/gsap.min.js" defer />
        <script src="/main.js" defer />
      </body>
    </html>
  );
}
