// src/lib/aiClient.ts
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function runPrompt(prompt: string, responseSchema: object) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  return response.text;
}

/*
example response schema

responseSchema: {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      recipeName: {
        type: Type.STRING,
      },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
    },
    propertyOrdering: ["recipeName", "ingredients"],
  },
},
*/
