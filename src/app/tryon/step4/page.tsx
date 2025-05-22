'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TryOnPreviewPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [outfit, setOutfit] = useState<string | null>(null);
  const [selfieURL, setSelfieURL] = useState<string | null>(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    const storedOutfit = localStorage.getItem('selectedOutfit');
    const storedSelfie = localStorage.getItem('uploadedSelfie');

    setAvatar(storedAvatar);
    setOutfit(storedOutfit);
    setSelfieURL(storedSelfie);
  }, []);

  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Preview Your Look</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Avatar + Outfit Preview */}
        <div className="relative w-64 h-64 border rounded overflow-hidden mx-auto">
          {avatar && (
            <Image
              src={`/avatars/${avatar}.png`}
              alt="Selected Avatar"
              layout="fill"
              objectFit="cover"
            />
          )}
          {outfit && (
            <Image
              src={`/outfits/${outfit}.png`}
              alt="Selected Outfit Overlay"
              layout="fill"
              objectFit="cover"
              className="absolute top-0 left-0 z-10 opacity-90"
            />
          )}
        </div>

        {/* User's Selfie */}
        <div className="text-center">
          <p className="font-medium mb-2">Your Selfie</p>
          {selfieURL ? (
            <Image
              src={selfieURL}
              alt="Your Selfie"
              width={200}
              height={200}
              className="rounded border mx-auto"
            />
          ) : (
            <p className="text-sm text-gray-500">No selfie uploaded</p>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => router.push('/tryon/step5')}
          className="bg-green-600 text-white px-6 py-2 rounded mt-6 hover:bg-green-700"
        >
          🎬 Generate Catwalk Video
        </button>
      </div>
    </main>
  );
}