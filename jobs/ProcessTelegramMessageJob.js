const { TelegramMessage } = require("../models");
const ai = require("../services/OpenAIService");
const twitter = require("../services/TwitterService");

class ProcessTelegramMessageJob {

  static async handle(messageId) {
    const message = await TelegramMessage.findByPk(messageId);
    if (!message || message.posted_to_x) return;

    const src = message.message_text || "";
    if (src === "") return;

    const rewritten = await ai.rewriteText(src);
    message.rewritten_text = rewritten;
    await message.save();

    const resp = await twitter.post(rewritten);
    const tweetId = resp.id || resp.id_str;

    if (tweetId) {
      await message.update({
        posted_to_x: true,
        posted_at: new Date(),
        tweet_id: tweetId,
      });
    } else {
      console.warn("Tweet not confirmed", resp);
    }
  }


  static async dispatch(entity) {
    try {
      await this.handle(entity.id);
    } catch (err) {
      console.error("Job dispatch failed:", err);
    }
  }
}

module.exports = ProcessTelegramMessageJob;
