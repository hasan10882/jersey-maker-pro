'use client';

import { useRouter } from 'next/navigation';

export default function Step5aPage() {
  const router = useRouter();

  const handlePreview = () => {
    const designUrl = localStorage.getItem('uploadedSelfie') || '';
    router.push(`/tryon?age=20&gender=girl&bodyType=slim&design=${encodeURIComponent(designUrl)}`);
  };

  return (
    <button onClick={handlePreview}>
      🎬 Generate Catwalk Video
    </button>
  );
}