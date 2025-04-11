"use client"; // تحديد المكون كمكون عميل

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // استبدال next/router بـ next/navigation
import { auth, db } from '@/app/api/firebase'; // استيراد Firestore
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // استيراد getDoc من Firestore

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // تسجيل الدخول
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // جلب بيانات المستخدم من Firestore للتحقق من الدور
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);
  
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userRole = userData.role;
  
        // إعادة التوجيه بناءً على الدور
        if (userRole === 'moderator' || userRole === 'admin') {
          router.push('/login/dashboard'); // توجيه المشرف
        }
      } else {
        setError('بيانات المستخدم غير موجودة.');
      }
    } catch (err) {
      setError('فشل تسجيل الدخول. تحقق من بياناتك.');
      console.error(err);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#d4af37] mb-6">تسجيل الدخول</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#d4af37] text-white p-3 rounded-lg hover:bg-[#b8932f] transition duration-300"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
