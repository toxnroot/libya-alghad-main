import { useState } from 'react';
import { updateEmail, updatePassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/app/api/firebase';

export default function ChangeUserInfo() {
  const [emailChange, setEmailChange] = useState('');
  const [passwordChange, setPasswordChange] = useState('');
  const [emailSent, setEmailSent] = useState(false); // حالة لتتبع ما إذا كانت رسالة التحقق قد أرسلت أم لا

  const handleEmailChange = async () => {
    try {
      // إرسال رسالة تحقق إلى البريد الإلكتروني الجديد
      await sendEmailVerification(auth.currentUser);
      alert('تم إرسال رسالة التحقق إلى البريد الإلكتروني الجديد');
      setEmailSent(true); // عند إرسال الرسالة
    } catch (err) {
      alert('حدث خطأ: ' + err.message);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await updatePassword(auth.currentUser, passwordChange);
      alert('تم تغيير كلمة المرور بنجاح');
      setPasswordChange('');
    } catch (err) {
      alert('حدث خطأ: ' + err.message);
    }
  };

  const handleFinalEmailChange = async () => {
    try {
      // بعد التحقق من البريد الإلكتروني الجديد
      if (!emailSent) {
        alert('يجب أولاً إرسال رسالة التحقق إلى البريد الإلكتروني الجديد');
        return;
      }

      await updateEmail(auth.currentUser, emailChange);
      alert('تم تغيير البريد الإلكتروني بنجاح');
      setEmailChange('');
    } catch (err) {
      alert('حدث خطأ: ' + err.message);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">تعديل معلومات المستخدم</h2>

      <div className="mb-4">
        <input
          type="password"
          placeholder="كلمة المرور الجديدة"
          value={passwordChange}
          onChange={(e) => setPasswordChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={handlePasswordChange} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          تغيير كلمة المرور
        </button>
      </div>
    </div>
  );
}
