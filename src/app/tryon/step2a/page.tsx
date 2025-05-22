'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function VirtualTryonPage() {
  const [selfie, setSelfie] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const router = useRouter();

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelfie(file);
    const url = file ? URL.createObjectURL(file) : null;
    setPreviewURL(url);
    if (url) localStorage.setItem('selfieUrl', url);
  };

  const handleAvatarSelect = (avatarId: string) => {
    setAvatar(avatarId);
    localStorage.setItem('avatarUrl', `/avatars/${avatarId}.png`);
  };

  return (
    <main className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Virtual Try-On</h1>

      {/* Selfie Upload */}
      <div>
        <label className="block mb-2 font-medium">Upload Your Selfie:</label>
        <input type="file" accept="image/*" onChange={handleSelfieChange} />
        {previewURL && (
          <div className="mt-4">
            <p className="text-sm mb-1">Preview:</p>
            <Image
              src={previewURL}
              alt="Selfie Preview"
              width={200}
              height={200}
              className="rounded border"
            />
          </div>
        )}
      </div>

      {/* Avatar Selection */}
      <div>
        <p className="font-medium mb-2">Choose a Body Type Avatar:</p>
        <div className="flex gap-4">
          {['slim', 'athletic', 'plus'].map((type) => (
            <button
              key={type}
              onClick={() => handleAvatarSelect(type)}
              className={`px-4 py-2 border rounded ${
                avatar === type ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div>
        <button
          onClick={() => router.push('/tryon/step2b')}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
          disabled={!selfie || !avatar}
        >
          Continue to Preview →
        </button>
      </div>

      {/* Debug Output */}
      <div className="text-sm text-gray-600 mt-4">
        <p>Selected Avatar: {avatar || 'None'}</p>
        <p>Selfie File: {selfie?.name || 'None'}</p>
      </div>
    </main>
  );
}
