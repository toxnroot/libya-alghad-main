import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import AdminNavbar from "@/components/AdminNavBar";

// تعريف الـ Metadata بشكل مركزي ونظيف
export const metadata = {
  title: 'ليبيا الغد | المشاريع والخدمات',
  description: 'اكتشف المشاريع والخدمات المتميزة التي تقدمها ليبيا الغد.',
  keywords: [
    'ليبيا الغد', 'مشاريع ليبيا', 'خدمات ليبيا', 'شركة ليبيا الغد', 
    'Libya Al-Ghad', 'ليبيا الغد للمقاولات العمومية', 
    'ليبيا الغد للمشاريع', 'مشاريع ليبيا الغد', 'خدمات ليبيا الغد'
  ],
  
  // إعدادات الـ Open Graph (فيسبوك، لينكد إن، إلخ)
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
        alt: 'شعار ليبيا الغد',
      },
    ],
    locale: 'ar_LY',
    type: 'website',
  },

  // إعدادات تويتر
  twitter: {
    card: 'summary_large_image',
    title: 'ليبيا الغد | المشاريع والخدمات',
    description: 'اكتشف المشاريع والخدمات المتميزة التي تقدمها ليبيا الغد.',
    images: ['https://libyaalghad.com/logo.png'],
  },

  // إعدادات الأيقونات (Favicon)
  icons: {
    icon: [
      { url: '/logo.png' }, // تأكد أن الصورة مربعة تماماً (مثلاً 512x512)
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // أكواد التحقق (مثل جوجل كونسول)
  verification: {
    google: 'LsnWfhO0TKvj51mqvo__9ovGfyXbBZ_S16BVqWM0sGQ',
  },

  // ألوان الثيم والوسوم المخصصة الأخرى
  category: 'construction',
  other: {
    'theme-color': '#d4af37',
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
        <AdminNavbar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}