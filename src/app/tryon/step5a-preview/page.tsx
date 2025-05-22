
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CatwalkPreviewPage() {
  const [avatar, setAvatar] = useState("");
  const [selfie, setSelfie] = useState("");
  const [outfit, setOutfit] = useState("");

  useEffect(() => {
    const storedAvatar = localStorage.getItem("selectedAvatar");
    const storedSelfie = localStorage.getItem("uploadedSelfie");
    const storedOutfit = localStorage.getItem("selectedOutfit");

    if (storedAvatar) setAvatar(storedAvatar);
    if (storedSelfie) setSelfie(storedSelfie);
    if (storedOutfit) setOutfit(storedOutfit);
  }, []);

  return (
    <main className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Your Catwalk Preview</h1>

      {/* Preview Section */}
      <div className="relative w-64 h-96 border mx-auto bg-gray-100 overflow-hidden rounded shadow">
        {avatar && (
          <Image
            src={`/avatars/${avatar}.png`}
            alt="Avatar"
            fill
            className="object-contain animate-walk"
          />
        )}
        {outfit && (
          <Image
            src={`/outfits/${outfit}.png`}
            alt="Outfit"
            fill
            className="object-contain absolute top-0 left-0 z-10 pointer-events-none"
          />
        )}
      </div>

      {/* Button */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => alert("Simulating video generation...")}
      >
        🎬 Generate Catwalk Video
      </button>
    </main>
  );
}
