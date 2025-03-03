// pages/api/generateTripDetails.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { trip } = req.body;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env.local
    });

    // Construct a stricter prompt for JSON output
    const prompt = `
      You are a travel assistant. Based on the trip details provided, generate a response **strictly in valid JSON format**. 
      Ensure that your response contains ONLY a valid JSON object with three fields: 

      {
        "packing": ["Item 1", "Item 2", "Item 3"],
        "budget": "Estimated budget details in one short sentence.",
        "recommendations": [
          { "name": "Recommendation 1", "description": "Short description", "link": "https://example.com" }
        ]
      }

      DO NOT include any explanation, preamble, or formatting instructions—ONLY return raw JSON.
      
      Here are the trip details: ${JSON.stringify(trip)}
    `;

    // Request AI response
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo"
      messages: [{ role: "system", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Extract text from response
    const aiResponse = response.choices[0]?.message?.content?.trim() || "{}";

    // Validate and parse JSON response
    let aiData;
    try {
      // Ensure response starts with '{' to avoid non-JSON text
      const jsonStartIndex = aiResponse.indexOf("{");
      const jsonEndIndex = aiResponse.lastIndexOf("}");
      if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        const cleanJson = aiResponse.substring(jsonStartIndex, jsonEndIndex + 1);
        aiData = JSON.parse(cleanJson);
      } else {
        throw new Error("Malformed AI response.");
      }
    } catch (err) {
      console.error("AI response parsing error:", err);
      aiData = {
        packing: ["Could not generate packing list."],
        budget: "Could not estimate budget.",
        recommendations: [],
      };
    }

    return res.status(200).json({ success: true, data: aiData });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
