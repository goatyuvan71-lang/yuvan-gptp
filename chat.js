export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "The site owner needs to add the free OpenRouter API key in the hosting settings." });
  }

  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const safeMessages = messages
      .filter(m => ["user", "assistant"].includes(m?.role) && typeof m?.content === "string")
      .slice(-20)
      .map(m => ({ role: m.role, content: m.content.slice(0, 6000) }));

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Title": "YUVAN GPT"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "system", content: "You are Yuvan GPT, a friendly, helpful AI assistant. Be clear, kind, and concise." },
          ...safeMessages
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return res.status(response.status).json({
        error: data?.error?.message || "The free AI service is busy or its limit was reached. Please try again later."
      });
    }

    const reply = data?.choices?.[0]?.message?.content;
    return res.status(200).json({ reply: typeof reply === "string" ? reply : "I couldn't make a reply just now." });
  } catch (error) {
    console.error("Yuvan GPT API error:", error);
    return res.status(500).json({ error: "The AI could not reply just now. Please try again in a moment." });
  }
}
