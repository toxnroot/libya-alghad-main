import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrlEncoded = searchParams.get('url');

    if (!imageUrlEncoded) {
      return NextResponse.json(
        { success: false, message: 'لم يتم توفير رابط الصورة' },
        { status: 400 }
      );
    }

    // فك تشفير الرابط
    const decodedUrl = decodeURIComponent(imageUrlEncoded);
    console.log('🔗 Decoded URL:', decodedUrl);

    const baseUrl = decodedUrl.split('?')[0];

    // استخراج public_id من الرابط
    const regex = /\/v\d+\/(.+)\.\w{3,4}$/;
    const match = baseUrl.match(regex);

    if (!match) {
      return NextResponse.json(
        { success: false, message: 'تعذر تحليل الرابط لاستخراج public_id' },
        { status: 400 }
      );
    }

    const publicId = match[1];
    console.log('🆔 Extracted public_id:', publicId);

    const timestamp = Math.round(Date.now() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    const formData = new URLSearchParams();
    formData.append('public_id', publicId);
    formData.append('signature', signature);
    formData.append('api_key', process.env.CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp.toString());

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await cloudinaryResponse.json();
    console.log('📥 Cloudinary Response:', result);

    if (result.result === 'ok') {
      return NextResponse.json({ success: true, message: 'تم حذف الصورة بنجاح' });
    } else {
      return NextResponse.json(
        { success: false, message: 'فشل في حذف الصورة', error: result },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ خطأ أثناء حذف الصورة:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء المعالجة', error: error.message },
      { status: 500 }
    );
  }
}
