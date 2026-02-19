import { useState } from 'react';
import axios from 'axios';
import { db } from '@/app/api/firebase'; // تأكد من أن المسار صحيح
import { collection, addDoc } from 'firebase/firestore'; // استيراد addDoc و collection من Firebase

export default function AddProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('completed');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'toxnroot');

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/do88eynar/image/upload',
      formData,
      {
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(percent);
        },
      }
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);
    setError('');

    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await handleImageUpload(image);
      }

      const collectionName = status === 'completed' ? 'completedProjects' : 'ongoingProjects';
      await addDoc(collection(db, collectionName), {
        title,
        description,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      });

      setTitle('');
      setDescription('');
      setImage(null);
      setStatus('completed');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">إضافة مشروع جديد</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <input
        type="text"
        placeholder="عنوان المشروع"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        placeholder="الوصف"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="completed">منجز</option>
        <option value="ongoing">قيد الإنجاز</option>
      </select>
      {uploadProgress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-[#d4af37] h-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center mt-1 text-gray-700">{uploadProgress}%</p>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#d4af37] text-white p-3 rounded-lg hover:bg-[#b8932f] transition duration-300 disabled:bg-gray-400"
      >
        {loading ? 'جارٍ الإضافة...' : 'إضافة المشروع'}
      </button>
    </form>
  );
}
