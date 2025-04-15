"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/api/firebase';
import { collection, addDoc, setDoc, getDoc, doc } from 'firebase/firestore';
import { updateEmail, updatePassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import ProjectList from '@/components/projectList';
import ChangeUserInfo from '@/components/ChangeUserInfo';
import AddUser from '@/components/AddUser';
import AddProject from '@/components/AddProject';
import AdminUsersPage from '@/components/AdminUsersPage';
import AddAboutImage from '@/components/AddAboutImage';
import GalleryDisplay from '@/components/GalleryDisplay';

export default function Dashboard() {
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true); // حالة التحميل لتوجيه المستخدم بعد التحقق من الحالة
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
      } else {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserRole(userSnap.data().role);
        }
      }

      setLoading(false); // بعد التحقق من الحالة، قم بتحديث حالة التحميل
    });

    return () => unsubscribe();
  }, [router]);

  // إذا كانت الصفحة في حالة تحميل، لا نعرض المحتوى بعد
  if (loading) {
    return <div>جارٍ التحقق من الحالة...</div>; // أو عرض شاشة تحميل إذا أردت
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#d4af37] mb-6 text-center">لوحة التحكم</h1>

        {/* تغيير البريد وكلمة المرور */}
        <ChangeUserInfo />

        {/* إضافة مستخدم جديد (بناءً على صلاحية المستخدم) */}
        {userRole === 'moderator' && <AddUser />}

        <AddAboutImage />

        {/* إضافة مشروع جديد */}
        <AddProject />

      </div>
      <GalleryDisplay />
      {/* التحكم بالمستخدمين */}
      <AdminUsersPage userRole={userRole} />

      {/* قائمة المشاريع */}
      <ProjectList userRole={userRole} />
    </div>
  );
}
