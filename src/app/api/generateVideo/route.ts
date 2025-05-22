// src/app/api/generateVideo/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { selfie, avatar, outfit } = await req.json();

  try {
    const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "YOUR_MODEL_VERSION_ID", // from replicate.com
        input: {
          selfie,  // can be URL or base64 (if your model supports it)
          avatar,
          outfit
        }
      })
    });

    const result = await replicateResponse.json();
    return NextResponse.json({ status: "success", url: result?.output });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: "Video generation failed" }, { status: 500 });
  }
}
