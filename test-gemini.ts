import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy to use API
    console.log("Attempting to list models...");
    // The SDK doesn't have a direct listModels, but we can try to generate a tiny content
    const result = await models.generateContent("test");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("Diagnostic Error:", error);
  }
}

listModels();
