import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { RHA_KNOWLEDGE_BASE } from "@/lib/knowledge/rha-knowledge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
    }

    const { message, history } = await req.json();
    
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 500,
      },
      history: [
        { role: "user", parts: [{ text: RHA_KNOWLEDGE_BASE }] },
        { role: "model", parts: [{ text: "Understood. I am ready to assist Ridy's Hena Art customers." }] },
        ...history
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response.text();

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return NextResponse.json({ error: error.message || "Failed to connect to assistant" }, { status: 500 });
  }
}
