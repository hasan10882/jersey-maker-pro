'use client';

import { useEffect, useRef, useState } from 'react';

export default function Step6A() {
  const [designURL, setDesignURL] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const selected = localStorage.getItem('selectedOutfit');
    if (selected) {
      setDesignURL(`/outfits/${selected}.png`);
    }
  }, []);

  const handleDownload = () => {
    const video = videoRef.current;
    if (!video) return;
    const link = document.createElement('a');
    link.href = video.src;
    link.download = 'catwalk_preview.mp4';
    link.click();
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Try-On Preview</h1>
      <div className="relative w-full max-w-md">
        <video
          ref={videoRef}
          src="/catwalks/slim-female.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full rounded"
        />
        {designURL && videoLoaded && (
          <img
            ref={overlayRef}
            src={designURL}
            alt="Design Overlay"
            className="absolute top-24 left-1/3 w-24 opacity-80 pointer-events-none"
          />
        )}
      </div>
      <video autoPlay loop muted playsInline>
  <source src="/catwalks/slim-female.mp4" type="video/mp4" />
</video>

      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download Video
      </button>
    </main>
  );
}