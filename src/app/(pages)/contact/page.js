"use client";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage("");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitMessage("تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.");
        reset();
      } else {
        throw new Error("فشل الإرسال");
      }
    } catch (error) {
      setSubmitMessage("حدث خطأ أثناء الإرسال، حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-t from-[#131313] to-black text-white min-h-screen font-['Cairo']">
      {/* Meta Tags and Schema */}
      <Head>
        <title>تواصل معنا | ليبيا الغد الرائدة - خدمات ودعم في طرابلس</title>
        <meta
          name="description"
          content="تواصل مع ليبيا الغد الرائدة في طرابلس للاستفسار عن خدماتنا أو طلب الدعم. أرسل رسالتك عبر النموذج، اتصل بنا، أو راسلنا عبر واتساب الآن!"
        />
        <meta
          name="keywords"
          content="تواصل معنا, ليبيا الغد الرائدة, خدمات دعم, طرابلس ليبيا, دعم فني ليبيا"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ليبيا الغد الرائدة",
              url: "https://www.yourwebsite.com",
              logo: "https://www.yourwebsite.com/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+218926386290",
                  contactType: "Customer Service",
                  email: "Alhamaliabdalmajed@gmail.com",
                  areaServed: "LY",
                  availableLanguage: ["Arabic"],
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "طرابلس",
                addressLocality: "طرابلس",
                addressCountry: "LY",
              },
            }),
          }}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/do88eynar/image/upload/v1744003848/contact_ugcupe.webp"
            alt="تواصل مع ليبيا الغد الرائدة للخدمات والدعم في طرابلس"
            fill
            className="object-cover opacity-30"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-center mb-6 tracking-tight text-[#d4af37]"
          >
            تواصل معنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto"
          >
            في ليبيا الغد الرائدة، نحن هنا لدعمكم. تواصلوا معنا للاستفسار عن{" "}
            <Link href="/services" className="text-[#d4af37] hover:underline">
              خدماتنا
            </Link>{" "}
            أو طلب الدعم الفني في طرابلس، ليبيا.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="w-40 h-1 bg-[#d4af37] mx-auto mt-6"
          ></motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-6 text-center">
              معلومات التواصل مع ليبيا الغد
            </h2>
            <div className="relative mb-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#d4af37]"></div>
            </div>
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 bg-[#272727] rounded-lg p-4 shadow-md hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <span
                  className="w-12 h-12 flex items-center justify-center bg-[#d4af37] rounded-full text-black font-bold text-xl"
                  aria-label="أيقونة الهاتف"
                >
                  📞
                </span>
                <a
                  href="tel:+218926386290"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors text-lg"
                >
                  00+218926386290
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4 bg-[#272727] rounded-lg p-4 shadow-md hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <span
                  className="w-12 h-12 flex items-center justify-center bg-[#d4af37] rounded-full text-black font-bold text-xl"
                  aria-label="أيقونة واتساب"
                >
                  💬
                </span>
                <a
                  href="https://wa.me/218926386290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors text-lg"
                >
                  تواصلوا عبر واتساب
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4 bg-[#272727] rounded-lg p-4 shadow-md hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <span
                  className="w-12 h-12 flex items-center justify-center bg-[#d4af37] rounded-full text-black font-bold text-xl"
                  aria-label="أيقونة البريد الإلكتروني"
                >
                  ✉️
                </span>
                <a
                  href="mailto:Alhamaliabdalmajed@gmail.com"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors text-lg"
                >
                  Alhamaliabdalmajed@gmail.com
                </a>
              </motion.div>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/services"
                className="inline-block bg-[#d4af37] text-black py-2 px-6 rounded-lg hover:bg-[#b89630] transition-colors"
              >
                اكتشف خدماتنا
              </Link>
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-6 text-center">
              أرسل استفسارك الآن
            </h2>
            <div className="relative mb-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#d4af37]"></div>
            </div>
            <motion.form
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#1a1a1a] p-8 rounded-xl shadow-lg border border-[#d4af37]/20"
              aria-label="نموذج التواصل مع ليبيا الغد الرائدة"
            >
              <p className="text-gray-300 mb-6 text-center">
                املأ النموذج أدناه وسيتم الرد عليك خلال 24 ساعة.
              </p>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 text-lg"
                >
                  الاسم
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "الاسم مطلوب" })}
                  className="w-full p-3 rounded-lg bg-[#272727] text-white border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none"
                  aria-required="true"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-300 mb-2 text-lg"
                >
                  البريد الإلكتروني (اختياري)
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "البريد الإلكتروني غير صالح",
                    },
                  })}
                  className="w-full p-3 rounded-lg bg-[#272727] text-white border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-300 mb-2 text-lg"
                >
                  الرسالة
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: "الرسالة مطلوبة" })}
                  className="w-full p-3 rounded-lg bg-[#272727] text-white border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none h-32 resize-none"
                  aria-required="true"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#d4af37] hover:bg-[#b89630] text-black"
                }`}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
              </button>
              {submitMessage && (
                <p
                  className={`text-center mt-4 ${
                    submitMessage.includes("نجاح")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
            </motion.form>
            <div className="mt-6 text-center">
              <a
                href="https://wa.me/218926386290"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white py-2 px-6 rounded-lg hover:bg-[#1EBE56] transition-colors"
              >
                راسلنا عبر واتساب الآن
              </a>
            </div>
          </section>
        </div>
      </div>

،
      {/* Google Maps Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16" dir="rtl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-6 text-center">
          زورونا في طرابلس، ليبيا
        </h2>
        <p className="text-gray-300 text-center mb-8">
          تفضلوا بزيارة مقر ليبيا الغد الرائدة في طرابلس لمناقشة احتياجاتكم أو
          التعرف على{" "}
          <Link href="/about" className="text-[#d4af37] hover:underline">
            قصتنا
          </Link>
          .
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3350.726820413839!2d13.142146624616547!3d32.87894657877039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1744004600238!5m2!1sar!2seg"
          className="w-[90%] h-96 mt-16 rounded-lg shadow-lg m-auto"
          title="موقع شركة ليبيا الغد الرائدة في طرابلس، ليبيا"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}