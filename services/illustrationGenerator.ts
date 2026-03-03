import { GoogleGenAI } from "@google/genai";

async function generateCinematicIllustration() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const prompt = `A premium cinematic semi-3D illustration for a tech startup landing page card background. A stylized human silhouette stands in a dark futuristic digital workspace, looking at floating holographic UI panels and glowing dashboards. Modern minimal aesthetic, Apple keynote style. Deep blue and purple color palette with soft neon ambient glow. Layered depth with foreground and background elements. The bottom-left area is kept dark and empty for text overlay. High contrast, smooth gradients, cinematic shadows. No text, no logos, no watermarks. 4K resolution, sharp detail, futuristic education vibe.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:5",
        },
      },
    });

    for (const part of response.candidates![0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Error generating cinematic illustration:", error);
  }
  return null;
}
