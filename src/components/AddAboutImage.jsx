"use client";
import { useState } from "react";
import axios from "axios";
import { db } from "@/app/api/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddAboutImage() {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "toxnroot"); // preset تبع Cloudinary

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/do88eynar/image/upload",
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
    setError("");
    setSuccess("");
    setUploadProgress(0);
    setLoading(true);

    try {
      if (!image) {
        setError("الرجاء اختيار صورة");
        setLoading(false);
        return;
      }

      const imageUrl = await handleImageUpload(image);

      await addDoc(collection(db, "gallery"), {
        url: imageUrl,
        createdAt: new Date().toISOString(),
      });

      setImage(null);
      setSuccess("تمت إضافة الصورة بنجاح!");
    } catch (err) {
      setError("حدث خطأ أثناء الإضافة: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-[#d4af37]">إضافة صورة إلى نبذة عن الشركة</h2>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-600 text-center mb-2">{success}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 mb-3 border rounded"
      />

      {uploadProgress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#d4af37] h-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center text-gray-600 mt-1">{uploadProgress}%</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#d4af37] text-white p-3 rounded-lg hover:bg-[#b8932f] transition duration-300 disabled:bg-gray-400"
      >
        {loading ? "جارٍ الرفع..." : "إضافة الصورة"}
      </button>
    </form>
  );
}
