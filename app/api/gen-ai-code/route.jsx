import { GenAiCode } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt } = await request.json();
  try {
    const result = await GenAiCode.sendMessage(prompt);

    console.log("Raw result:", result);

    // Adjust yeh dekhnay ke baad karo:
    const AIResp = result?.response?.text();

    console.log(new Date().toLocaleString(), "AI Response:", AIResp);
    return NextResponse.json({ result: JSON.parse(AIResp) });
  } catch (error) {
    console.error("Error in AI chat route:", error.message);
    return NextResponse.json({ error: error.message });
  }
}
