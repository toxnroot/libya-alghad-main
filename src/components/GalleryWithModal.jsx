"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/api/firebase"; 

export default function GalleryWithModal() {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const imageList = querySnapshot.docs.map((doc) => doc.data().url);
        setImages(imageList);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب الصور:", error);
      }
    };

    fetchImages();
  }, []);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full text-white py-16 font-['Cairo']">
      <h2 className="text-3xl text-[#d4af37] text-center mb-12">نبذة عن الشركة</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-16">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="group overflow-hidden rounded-xl shadow-lg bg-[#111] hover:shadow-[#d4af37]/40 transition duration-300"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedImg(img)}
          >
            <Image
              src={img}
              alt={`صورة ${index + 1}`}
              width={1200}
              height={800}
              className="object-cover w-full h-[250px] group-hover:opacity-80 transition duration-300"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              className="relative bg-black rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg}
                alt="صورة مكبرة"
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-3 right-3 p-2 bg-[#d4af37] rounded-full text-black hover:bg-yellow-500 transition"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-4">
                <button
                  onClick={() => handleDownload(selectedImg)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-black rounded-lg hover:bg-yellow-500 transition"
                >
                  <Download size={18} />
                  تحميل الصورة
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
