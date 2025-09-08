const axios = require("axios");
// const keys = require("../config/keys");

class TelegramService {
  constructor() {
    this.token = process.env.TELEGRAM_BOT_TOKEN;
    this.baseUrl = `https://api.telegram.org/bot${this.token}/`;
  }

  async setWebhook(url) {
    const res = await axios.get(this.baseUrl + "setWebhook", { params: { url } });
    return res.data;
  }

  async getUpdates() {
    const res = await axios.get(this.baseUrl + "getUpdates");
    return res.data;
  }

  async sendMessage(chatId, text) {
    const res = await axios.post(this.baseUrl + "sendMessage", {
      chat_id: chatId,
      text,
    });
    return res.data;
  }
}

module.exports = new TelegramService();
