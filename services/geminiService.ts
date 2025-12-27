
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Correct initialization using named parameter and process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiRecommendations = async (userTaste: string) => {
  const ai = getAI();
  const prompt = `Based on a user who likes "${userTaste}", recommend 5 books with titles, authors, and brief descriptions. Format as JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              description: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "author", "description", "tags"]
          }
        }
      }
    });

    // Fix: Access .text property directly and handle potential undefined value
    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return [];
  }
};

export const generateImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K") => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size
        }
      },
    });

    // Fix: Iterate through parts to find the image part per guidelines
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from model");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string) => {
  const ai = getAI();
  try {
    // Fix: Ensure we send only the base64 content, stripping data URI prefix if present
    const cleanData = base64ImageData.includes(',') ? base64ImageData.split(',')[1] : base64ImageData;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanData,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
    });

    // Fix: Iterate through parts to find the image part per guidelines
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No edited image data returned from model");
  } catch (error) {
    console.error("Image editing error:", error);
    throw error;
  }
};
