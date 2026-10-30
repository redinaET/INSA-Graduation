import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

// 1. የፎቶ ትንተና (ሰውነት፣ የቆዳ ቶን፣ የፊት ቅርጽ እና ምክሮች)
export async function analyzeStyleAndFace(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        {
          text: `Analyze this user's photo and return ONLY a valid JSON object with these exact keys:
          - bodyShape: (e.g., "Rectangle", "Hourglass", "Triangle", "Round")
          - skinTone: (e.g., "Fair", "Medium", "Dark", and undertone like Warm/Cool)
          - faceShape: (e.g., "Oval", "Round", "Square", "Heart")
          - clothingAdvice: (Short styling advice for their body shape)
          - makeupAndJewelry: (Suggested makeup colors and Jewelry choice: Gold or Silver based on undertone)
          - hairAndGlasses: (Best matching hairstyles and glasses frames for their face shape)
          Do not include any markdown formatting like \`\`\`json, just return raw JSON.`,
        },
      ],
    });

    const textResult = response.text;
    if (!textResult) throw new Error("No response from Gemini");

    const cleanedJson = textResult
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    return null;
  }
}

// 2. የአዲስ ልብስ ግዢ አማካሪ (Shopping Advisor)
export async function getShoppingAdvice(
  userProfile: any,
  shoppingQuery: string,
) {
  try {
    const prompt = `
    You are an expert personal AI fashion stylist.
    User Shopping Request: "${shoppingQuery}"

    Task:
    Provide expert shopping advice. Tell them what specific clothing types, cuts, colors, and fabrics they should buy.
    Return ONLY a valid JSON object in this exact format, with no other text or markdown:
    {
      "recommendedItemTypes": "e.g., A-line dress, V-neck, Tailored blazer",
      "bestColors": "Colors that match well",
      "shoppingTips": "Brief expert shopping advice."
    }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [{ text: prompt }],
    });

    const textResult = response.text;
    if (!textResult) throw new Error("No response from Gemini");

    const cleanedJson = textResult
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("Error in shopping advisor:", error);
    return null;
  }
}
