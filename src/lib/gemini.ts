"use server";
import { GoogleGenAI } from "@google/genai";
import JSON5 from "json5";
import systemInstruction from "@/lib/systemInstruction";
import type { Chats, FormFields, FormSetting } from "@/types/form-types";
import { tivoraAiResponseSchema } from "@/schema/formSchema";
import updateIdInResponse from "@/utils/updateIdInResponse";

async function runGemini(
  prompt: string,
  chats: Chats,
  data: { fields: FormFields[]; setting: FormSetting }
) {
  "use server";

  const formData = JSON.stringify(data);

  const additionalSystemInstruction = `
--------------------------------
Current form data:

${formData}

IMPORTANT: Respond **only with valid JSON**, using double quotes for all keys and strings. Do not include extra text or comments.
--------------------------------
`;

  const API_KEYS_STORAGE = process.env.GEMINI_API_KEY;
  if (!API_KEYS_STORAGE) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  const API_KEYS = API_KEYS_STORAGE.split(",");

  const GEMINI_API_KEY = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];

  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  const config = {
    thinkingConfig: {
      thinkingBudget: 4322,
    },
    systemInstruction: [
      { text: `${systemInstruction + additionalSystemInstruction}` },
    ],
  };

  const model = "gemini-2.5-pro";
  let finalResponse = "";

  try {
    const stream = await ai.models.generateContentStream({
      model,
      config,
      contents: chats,
    });

    for await (const chunk of stream) {
      // Prefer candidate content part text if available
      const partText =
        chunk?.candidates?.[0]?.content?.parts?.[0]?.text ?? chunk.text;
      if (typeof partText === "string") {
        finalResponse += partText;
      }
    }

    // --- Clean & extract JSON ---

    // Trim whitespace
    let cleaned = finalResponse.trim();

    // Remove Markdown fences, code blocks etc.
    cleaned = cleaned.replace(/```json|```/g, "");

    // Replace new lines with space (so JSON doesn’t break)
    cleaned = cleaned.replace(/(\r\n|\n|\r)/gm, " ");

    // Optionally collapse multiple spaces
    cleaned = cleaned.replace(/\s+/g, " ");

    // Extract substring that looks like JSON object
    const jsonMatch = cleaned.match(/\{.*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in AI response");
    }

    const jsonString = jsonMatch[0];
    const parsed = JSON5.parse(jsonString);
    const newParsedResponse = updateIdInResponse(parsed);
    const parsedResponse = tivoraAiResponseSchema.parse(newParsedResponse);
    return parsedResponse;
  } catch (err) {
    console.error("Error in runGemini:", err);
    console.log("Raw finalResponse:", finalResponse);
    return {
      userMessage:
        "I'm sorry, I encountered an error processing your request. Please try again.",
    };
  }
}

export default runGemini;
