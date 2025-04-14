import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import AdminNavbar from "@/components/AdminNavBar";

export const metadata = {
  title: 'ليبيا الغد | المشاريع والخدمات',
  description: 'اكتشف المشاريع والخدمات المتميزة التي تقدمها ليبيا الغد.',
  keywords: ['ليبيا الغد', 'مشاريع ليبيا', 'خدمات ليبيا', 'شركة ليبيا الغد', 'Libya Al-Ghad'],
  openGraph: {
    title: 'ليبيا الغد | المشاريع والخدمات',
    description: 'اكتشف المشاريع والخدمات المتميزة التي تقدمها ليبيا الغد.',
    url: 'https://libyaalghad.com/',
    siteName: 'ليبيا الغد',
    images: [
      {
        url: 'https://libyaalghad.com/logo.png',
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
    images: ['https://libyaalghad.com/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  themeColor: '#d4af37',
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
      <body>
        <AdminNavbar/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
