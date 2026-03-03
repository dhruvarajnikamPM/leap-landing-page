import { GoogleGenAI } from "@google/genai";

async function generatePathImages() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const prompts = [
    {
      id: "creator",
      prompt: "Cinematic 3D illustration of a digital creator workspace with cameras, editing screens, and creative tools blending into startup visuals. Dark cinematic environment, futuristic atmosphere, high contrast lighting with soft pink and purple neon glow. Negative space at bottom-left. 4K, sharp, no text."
    },
    {
      id: "entrepreneur",
      prompt: "Cinematic 3D illustration of a futuristic founder standing in front of floating analytics dashboards and glowing startup interfaces. Dark cinematic environment, futuristic atmosphere, high contrast lighting with soft blue neon glow. Negative space at bottom-left. 4K, sharp, no text."
    },
    {
      id: "ai",
      prompt: "Cinematic 3D illustration of holographic AI neural networks, glowing brain structures, and digital code streams in a dark futuristic space. Dark cinematic environment, futuristic atmosphere, high contrast lighting with soft purple neon glow. Negative space at bottom-left. 4K, sharp, no text."
    },
    {
      id: "marketer",
      prompt: "Cinematic 3D illustration of holographic marketing dashboards, analytics charts, and campaign visuals floating in digital space. Dark cinematic environment, futuristic atmosphere, high contrast lighting with soft green neon glow. Negative space at bottom-left. 4K, sharp, no text."
    }
  ];

  const results: Record<string, string> = {};

  for (const item of prompts) {
    console.log(`Generating image for: ${item.id}...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: item.prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "4:5",
          },
        },
      });

      for (const part of response.candidates![0].content.parts) {
        if (part.inlineData) {
          results[item.id] = `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    } catch (error) {
      console.error(`Error generating ${item.id}:`, error);
    }
  }

  return results;
}

// This is a utility script to be used in the component or a separate task.
// For now, I will generate the first one to show the user and then update the component.
