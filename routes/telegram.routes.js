const express = require("express");
const route = express.Router();

const TelegramWebhookController = require('../controllers/telegramWebhook.controller');


route.get("/check-telegram", TelegramWebhookController.checkTelegram);
route.get("/check-openai", TelegramWebhookController.checkOpenAI);
route.get("/check-twitter", TelegramWebhookController.checkTwitter);

route.post('/telegram-to-twitter',TelegramWebhookController.handle);

module.exports = route;