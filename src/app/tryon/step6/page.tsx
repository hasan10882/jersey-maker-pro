
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Step6Preview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [avatarVideo, setAvatarVideo] = useState('');
  const [designOverlay, setDesignOverlay] = useState<string | null>(null);

  useEffect(() => {
    const avatarType = localStorage.getItem('selectedAvatar') || 'slim-female';
    const outfit = localStorage.getItem('selectedOutfit') || '';
    const design = localStorage.getItem('uploadedDesign');

    setAvatarVideo(`/catwalks/${avatarType}.mp4`);
    setDesignOverlay(design || null);
  }, []);

  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = avatarVideo;
    link.download = 'catwalk-preview.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Your Catwalk Preview</h1>

      <div className="relative w-full max-w-md mx-auto">
        <video
          ref={videoRef}
          src={avatarVideo}
          autoPlay
          loop
          muted
          className="w-full rounded shadow"
        />

        {designOverlay && (
          <img
            src={designOverlay}
            alt="Design Overlay"
            className="absolute top-[30%] left-[30%] w-[40%] opacity-90 pointer-events-none"
          />
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Video: {avatarVideo}</p>
        <p>Design: {designOverlay ? 'Loaded' : 'None'}</p>
      </div>

      <button
        onClick={downloadVideo}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        ⬇️ Download Video
      </button>
    </main>
  );
}
