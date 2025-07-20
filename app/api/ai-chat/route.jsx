import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    const result = await chatSession.sendMessage(prompt);
    const AIResp = result.response.text();
    console.log("AI Response:", AIResp);
    return NextResponse.json({ result: AIResp });
  } catch (error) {
    console.error("Error in AI chat route:", error.message);
    return NextResponse.json({ error: error.message });
  }
}
