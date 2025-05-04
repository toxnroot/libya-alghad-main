/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.libyaalghad.com', // رابط الموقع الفعلي
  generateRobotsTxt: true, // توليد robots.txt
  sitemapSize: 7000, // الحد الأقصى لعدد الروابط في ملف sitemap
  outDir: './public', // وضع الملفات في مجلد public
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/', // السماح بفهرسة جميع الصفحات
        disallow: ['/api/*', '/login/*'], // استبعاد مسارات API من الفهرسة
      },
    ],
    additionalSitemaps: [
      'https://www.libyaalghad.com/sitemap.xml', // رابط sitemap
    ],
  },
  exclude: ['/api/*','/login/*'], // استبعاد مسارات API من sitemap
};