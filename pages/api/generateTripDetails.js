import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { trip } = req.body;

    if (!trip || !trip.selections || trip.selections.length === 0) {
        return res.status(400).json({ success: false, error: "Invalid trip data" });
    }

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // ✅ Ensure key is set
        });

        const prompt = `
        You are a travel assistant. Generate travel details **strictly in JSON format** based on the following trip:

        ${JSON.stringify(trip)}

        **Expected JSON output format:**
        {
            "packing": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
            "budget": [
                { "travel" : travel-total, "hotels" : hotels-total, "food" : food-total , "total" : total-total }
            ],
            "recommendations": [
                { "name": "Great Restaurant", "description": "Best food in town", "link": "https://example.com" }
            ]
        }

        Do **not** include any explanations, only raw JSON.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }],
            max_tokens: 400,
            temperature: 0.7,
        });

        let aiData;
        try {
            aiData = JSON.parse(response.choices[0]?.message?.content.trim());
        } catch (err) {
            console.error("AI response parsing error:", err);
            aiData = {
                packing: ["Error: Could not generate packing list."],
                budget: [{ travel: 0, hotels: 0, food: 0, total: 0 }],
                recommendations: [{ name: "No recommendations found", description: "", link: "" }]
            };
        }

        return res.status(200).json({ success: true, data: aiData });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
