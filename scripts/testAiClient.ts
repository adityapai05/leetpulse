//AI calls works!!!

import { Type } from "@google/genai";
import { runPrompt } from "@/lib/aiClient";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("API key loaded?", process.env.GEMINI_API_KEY?.slice(0, 8));
  const schema = {
    type: Type.OBJECT,
    properties: {
      message: { type: Type.STRING },
    },
    propertyOrdering: ["message"],
  };

  const result = await runPrompt("Say hello in JSON", schema);
  console.log("AI response:", result);
}

main().catch(console.error);
