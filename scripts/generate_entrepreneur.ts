import { GoogleGenAI } from "@google/genai";

async function generate() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: "Cinematic 3D illustration of a futuristic founder standing in front of floating analytics dashboards and glowing startup interfaces. Dark cinematic environment, futuristic atmosphere, high contrast lighting with soft blue neon glow. Negative space at bottom-left. 4K, sharp, no text." }],
    },
    config: {
      imageConfig: {
        aspectRatio: "4:5",
      },
    },
  });

  for (const part of response.candidates![0].content.parts) {
    if (part.inlineData) {
      console.log("IMAGE_DATA_START");
      console.log(part.inlineData.data);
      console.log("IMAGE_DATA_END");
    }
  }
}

generate();
