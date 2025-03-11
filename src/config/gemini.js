import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";



const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("Missing Gemini API key. Check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);

        console.log("Full API Response:", result); // ✅ Changed: Debug full API response

        if (result.response?.candidates?.[0]?.content) {
            // Extract just the text from the content
            const responseText = result.response.candidates[0].content.parts?.[0]?.text ||
                result.response.candidates[0].content.text ||
                JSON.stringify(result.response.candidates[0].content);

            console.log("Gemini Response:", responseText);

            return responseText;
        } else {
            console.error("Unexpected response format:", result);
            return "Error: Unexpected response format";
        }
    } catch (error) {
        console.error("Error in Gemini API request:", error);
        return "Error: API request failed";
    }
}



export default run;
