import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import AdminNavbar from "@/components/AdminNavBar";
import Head from "next/head";
export const metadata = {
  title: 'ليبيا الغد | المشاريع والخدمات',
  description: 'اكتشف المشاريع والخدمات المتميزة التي تقدمها ليبيا الغد.',
  keywords: ['ليبيا الغد', 'مشاريع ليبيا', 'خدمات ليبيا', 'شركة ليبيا الغد', 'Libya Al-Ghad','ليبيا الغد للمقاولات العمومية', 'ليبيا الغد للمشاريع', 'مشاريع ليبيا الغد', 'خدمات ليبيا الغد'],
  openGraph: {
    title: 'ليبيا الغد | المشاريع والخدمات',
    description: 'اكتشف المشاريع والخدمات المتميزة التي تقدمها ليبيا الغد.',
    url: 'https://libyaalghad.com/',
    siteName: 'ليبيا الغد',
    images: [
      {
        url: 'https://libyaalghad.com/logo.png', // رابط الصورة الذي سيظهر في Open Graph و Twitter
        width: 800,
        height: 600,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ليبيا الغد | المشاريع والخدمات',
    description: 'اكتشف المشاريع والخدمات المتميزة التي تقدمها ليبيا الغد.',
    images: ['https://libyaalghad.com/logo.png'], // رابط الصورة الذي سيظهر في Twitter Card
  },
  icons: {
    icon: '/logo.png', // الرابط إلى شعار الـ favicon
    apple: '/logo.png', // الشعار الخاص بـ apple
  },
  themeColor: '#d4af37', // اللون الرئيسي للموقع
  other: {
    'msapplication-TileColor': '#d4af37',
    'msapplication-TileImage': '/logo.png',
    'fb:app_id': '678187878005363',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <Head>
        {/* SEO Tags */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />

        {/* Favicon and Icons */}
        <link rel="icon" href={metadata.icons.icon} />
        <link rel="apple-touch-icon" href={metadata.icons.apple} />
        
        {/* Theme Color */}
        <meta name="theme-color" content={metadata.themeColor} />
        
        {/* Other Meta Tags */}
        {Object.keys(metadata.other).map(key => (
          <meta key={key} name={key} content={metadata.other[key]} />
        ))}
      </Head>
      <body>
        <AdminNavbar />
        <Navbar />
        {children}
        <Footer />

      </body>
    </html>
  );
}
