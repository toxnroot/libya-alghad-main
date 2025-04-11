"use client";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/api/firebase';  // استيراد إعدادات Firebase

const AdminUsersPage = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);  // حالة لإظهار/إخفاء المكون

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    } catch (error) {
      console.error('Error updating role: ', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  // إخفاء المكون كاملاً إذا لم يكن الدور "مدير"
  if (userRole !== "moderator") {
    return <p>ليس لديك صلاحية للوصول إلى هذه الصفحة.</p>;
  }

  return (
    <div className="p-4">
      {/* زر إظهار/إخفاء لوحة التحكم */}
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? 'إخفاء إدارة المستخدمين' : 'إظهار إدارة المستخدمين'}
      </button>

      {/* لوحة التحكم التي تحتوي على قائمة المستخدمين */}
      {isVisible && (
        <div className="border-t border-gray-300 mt-4 pt-4">
          <h1 className="text-2xl font-semibold mb-4">إدارة المستخدمين</h1>

          {/* إضافة خاصية التمرير الأفقي للجداول على الشاشات الصغيرة */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">البريد الإلكتروني</th>
                  <th className="border px-4 py-2">الدور</th>
                  <th className="border px-4 py-2">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="user">مشرف</option>
                        <option value="moderator">مدير</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
