// import { NextResponse } from 'next/server';
// import { auth } from '@/app/api/firebase'; // استيراد auth من Firebase
// import { verifyIdToken } from 'firebase-admin/auth'; // التحقق من صحة توكين المستخدم

// export async function middleware(req) {
//   const { pathname, headers } = req.nextUrl;
  
//   // إذا كانت الصفحة هي /dashboard أو أي صفحة محمية
//   if (pathname.startsWith('/dashboard')) {
//     const token = req.cookies.get('token'); // استخدم التوكين المخزن في الكوكيز أو من أي مصدر آخر

//     if (!token) {
//       // إذا لم يوجد توكين، إعادة التوجيه إلى صفحة تسجيل الدخول
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     try {
//       // التحقق من التوكين باستخدام Firebase Admin SDK
//       const decodedToken = await verifyIdToken(token);
//       const user = decodedToken ? decodedToken : null;
      
//       if (!user) {
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//     } catch (error) {
//       console.error('فشل التحقق من التوكين:', error);
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   return NextResponse.next(); // السماح بالاستمرار في تصفح الصفحات
// }

// export const config = {
//   matcher: ['/dashboard', '/login/dashboard'], // تحديد المسارات المحمية
// };
