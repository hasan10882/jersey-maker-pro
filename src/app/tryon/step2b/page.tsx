'use client';

import { useEffect, useRef } from 'react';

export default function Step2BPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const context = canvasRef.current?.getContext('2d');
    const selfieUrl = localStorage.getItem('selfie');
    const avatarUrl = localStorage.getItem('selectedAvatar');

    if (!context || !selfieUrl || !avatarUrl) return;

    const selfieImg = document.createElement('img');
    const avatarImg = document.createElement('img');

    let imagesLoaded = 0;

    const tryDraw = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        // Draw avatar first
        context.drawImage(avatarImg, 0, 0, 300, 500);
        // Then overlay selfie (small and centered)
        context.drawImage(selfieImg, 100, 100, 100, 100);
      }
    };

    avatarImg.src = avatarUrl;
    selfieImg.src = selfieUrl;

    avatarImg.onload = tryDraw;
    selfieImg.onload = tryDraw;
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Step 2B: Preview</h1>
      <canvas ref={canvasRef} width={300} height={500} className="border" />
    </main>
  );
}
