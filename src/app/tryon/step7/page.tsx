'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TryOnSummaryPage() {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedOutfit, setSelectedOutfit] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const router = useRouter();

  useEffect(() => {
    const avatar = localStorage.getItem('selectedAvatar') || '';
    const outfit = localStorage.getItem('selectedOutfit') || '';
    setSelectedAvatar(avatar);
    setSelectedOutfit(outfit);
    setVideoURL(`/catwalks/${avatar || 'slim'}-catwalk.mp4`);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoURL;
    link.download = 'tryon-catwalk.mp4';
    link.click();
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Try-On Summary</h1>

      <div className="bg-white shadow rounded p-4 space-y-2">
        <p><strong>Selected Avatar:</strong> {selectedAvatar || 'N/A'}</p>
        <p><strong>Selected Outfit:</strong> {selectedOutfit || 'N/A'}</p>
      </div>

      <div className="aspect-video bg-black mt-4">
        <video src={videoURL} controls className="w-full h-full" />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ⬇️ Download Catwalk Video
        </button>
        <button
          onClick={() => router.push('/tryon/step1')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          🔁 Start Over
        </button>
      </div>
    </main>
  );
}
