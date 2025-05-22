'use client';

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const outfits = [
  { id: "shirt1", label: "Shirt 1", src: "/outfits/shirt1.png" },
  { id: "shirt2", label: "Shirt 2", src: "/outfits/shirt2.png" },
  { id: "jacket1", label: "Jacket 1", src: "/outfits/jacket1.png" },
];

export default function Step3OutfitSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (id: string) => {
    setSelected(id);
    localStorage.setItem("selectedOutfit", id);
  };

  return (
    <main className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select Your Outfit</h1>
      <div className="grid grid-cols-2 gap-4">
        {outfits.map((outfit) => (
          <div
            key={outfit.id}
            onClick={() => handleSelect(outfit.id)}
            className={`border rounded p-2 cursor-pointer ${
              selected === outfit.id ? "border-blue-600" : "border-gray-300"
            }`}
          >
            <Image
              src={outfit.src}
              alt={outfit.label}
              width={150}
              height={150}
            />
            <p className="text-center mt-2">{outfit.label}</p>
          </div>
        ))}
      </div>
      <button
        disabled={!selected}
        onClick={() => router.push("/tryon/step4")}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-6 disabled:opacity-50"
      >
        Preview Final Look →
      </button>
    </main>
  );
}
