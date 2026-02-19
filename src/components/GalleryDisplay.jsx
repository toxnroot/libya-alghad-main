"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/api/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";

export default function GalleryDisplay() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // جلب الصور من Firestore باستخدام onSnapshot للاستماع للتغييرات
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "gallery"),
      (querySnapshot) => {
        const imagesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imagesData);
        setLoading(false);
      },
      (err) => {
        setError("حدث خطأ أثناء جلب الصور: " + err.message);
        setLoading(false);
      }
    );

    // تنظيف المستمع عند إلغاء تحميل المكون
    return () => unsubscribe();
  }, []);

  // حذف صورة من Cloudinary و Firestore
  const handleDelete = async (id, imageUrl) => {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;

    try {
      // حذف الصورة من Cloudinary
      const response = await fetch(`/api/delete-image?url=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "فشل في حذف الصورة من Cloudinary");
      }

      // حذف الصورة من Firestore
      await deleteDoc(doc(db, "gallery", id));

      // تحديث القائمة محليًا
      setImages(images.filter((image) => image.id !== id));
      alert("تم حذف الصورة بنجاح!");
    } catch (err) {
      setError("حدث خطأ أثناء الحذف: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#d4af37]">
        صور نبذة عن الشركة
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-600">جارٍ التحميل...</p>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-600">لا توجد صور لعرضها</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={image.url}
                alt="Gallery Image"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(image.id, image.url)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
