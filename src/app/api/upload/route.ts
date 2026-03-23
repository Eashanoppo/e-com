import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Please check your environment variables." },
      { status: 500 }
    );
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "ridy-hena-art",
          resource_type: "image",
          transformation: [{ quality: "auto:good", fetch_format: "auto" }],
        },
        (error: Error | undefined, result: { secure_url: string } | undefined) => {
          if (error || !result) reject(error || new Error("Upload failed"));
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
