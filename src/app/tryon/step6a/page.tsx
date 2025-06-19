'use client';

import { useRouter } from 'next/navigation';

export default function Step6aPage() {
  const router = useRouter();

  const handlePreview = () => {
    const designOverlay = localStorage.getItem('uploadedSelfie') || '';
    router.push(`/tryon?age=40&gender=boy&bodyType=plus&design=${encodeURIComponent(designOverlay)}`);
  };

  return (
    <button onClick={handlePreview}>
      ▶️ Preview in TryOn Page
    </button>
  );
}