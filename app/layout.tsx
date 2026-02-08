import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@/theme';
import QueryProvider from '@/contexts/QueryProvider';
import Mainlayout from "@/components/shared/Mainlayout";
import { AuthProvider } from "@/contexts/AuthContext";

// Import all CSS files at the top level to avoid @import issues
import 'react-medium-image-zoom/dist/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "دليل أمراض النباتات - مرجع علمي شامل",
  description: "دليل أمراض النباتات - مرجع علمي شامل لأمراض النباتات وطرق علاجها والوقاية منها",
  keywords: "أمراض النباتات، دليل، زراعة، نباتات، علاج، وقاية، مرجع علمي",
  authors: [{ name: "فريق تشخيص أمراض النباتات" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "دليل أمراض النباتات",
    description: "مرجع علمي شامل لأمراض النباتات وطرق علاجها",
    type: "website",
    locale: "ar_SA",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily: "'Tajawal', 'Noto Sans Arabic', -apple-system, BlinkMacSystemFont, sans-serif",
          direction: "rtl",
        }}
      >
        <noscript>
          <div style={{
            textAlign: "center",
            padding: "50px",
            fontFamily: "'Tajawal', sans-serif"
          }}>
            <h2>يجب تفعيل JavaScript لتشغيل هذا التطبيق</h2>
            <p>الرجاء تفعيل JavaScript في متصفحك للحصول على أفضل تجربة</p>
          </div>
        </noscript>
        <AppRouterCacheProvider>
          <QueryProvider>
            <ThemeProvider>
              <AuthProvider>
                <Mainlayout>
                  {children}
                </Mainlayout>
              </AuthProvider>
            </ThemeProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
