const OpenAI = require("openai");
// const keys = require("../config/keys");

class OpenAIService {
  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  }

  async rewriteText(text) {
    try {
      const system = "Rewrite Telegram posts into concise, engaging tweets.";

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: text },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (err) {
      console.error("OpenAI failed:", err.message);
      return this.fallbackRewrite(text);
    }
  }

  fallbackRewrite(text) {
    let t = text.replace(/\s+/g, " ").trim();
    return t.length > 270 ? t.substring(0, 267) + "..." : t;
  }
}

module.exports = new OpenAIService();
