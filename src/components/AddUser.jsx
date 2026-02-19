import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/api/firebase'; // استيراد Firestore

export default function AddUser() {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userRole, setUserRole] = useState('admin');

  const handleAddUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: newEmail,
        role: userRole,
        createdAt: new Date().toISOString(),
      });

      alert('تم إنشاء المستخدم بنجاح');
      setNewEmail('');
      setNewPassword('');
      setUserRole('admin');
    } catch (err) {
      alert('خطأ: ' + err.message);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">إضافة مستخدم جديد</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="admin">مشرف</option>
        <option value="moderator">مسؤول</option>
      </select>
      <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded">
        إضافة المستخدم
      </button>
    </div>
  );
}
