// src/lib/aiClient.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

type OutputFormat = "text" | "json";

export async function runPrompt(
  prompt: string,
  output: "json" | "text" = "text"
) {
  const model = "gemini-2.5-flash";

  const result = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const text = await result.response.text(); // ✅ works

  return output === "json" ? JSON.parse(text) : text;
}
