const telegram = require('../services/TelegramService');
const OpenAIService = require('../services/OpenAIService');
const TwitterService = require('../services/TwitterService');
const ProcessTelegramMessageJob = require('../jobs/ProcessTelegramMessageJob');
const { TelegramMessage } = require('../models');
const util = require('util');

class TelegramWebhookController {

  static async checkTelegram(req, res) {
    try {
      const result = await telegram.sendMessage(
        process.env.TELEGRAM_CHANNEL_ID,
        "Telegram Bot Connected!"
      );
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async checkOpenAI(req, res) {
    try {
      const rewritten = await OpenAIService.rewriteText("OpenAI API Working");
      res.json({ rewritten });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async checkTwitter(req, res) {
    try {
      const result = await TwitterService.post("Testing Twitter API Working");
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }


  }

  static async handle(req, res) {
    try {
      const payload = req.body;

      const updates = payload.result || [payload];
      // console.log('updates.length =', Array.isArray(updates) ? updates.length : 'N/A');

      for (const update of updates) {
        try {

          const post = update.channel_post || update.message || null;
          const data = {
            update_id: update.update_id || post.message_id || null,
            message_id: post.message_id || 0,
            chat_id: post.chat?.id || 0,
            chat_title: post.chat?.title || null,
            message_text: post.text || post.caption || null,
            message_date: post.date ? new Date(post.date * 1000) : null,
            raw_update: update,
          };

          const upsertResult = await TelegramMessage.upsert(data, { returning: true });
         
          let entity = Array.isArray(upsertResult) ? upsertResult[0] : upsertResult;
          if (entity && typeof entity.get === 'function') {
            entity = entity.get({ plain: true });
          }
          
          const envChannel = process.env.TELEGRAM_CHANNEL_ID;
          if (!envChannel) console.warn('TELEGRAM_CHANNEL_ID is not set in env');

          if (Number(entity.chat_id) === Number(envChannel)) {
           
            if (process.env.DEBUG_TELEGRAM_JOB === '1') {
              // console.log(entity.id);
            } else {
              ProcessTelegramMessageJob.dispatch(entity);
            }
          }
        } catch (updateErr) {
          console.error('Error processing update:', update.update_id ?? '', updateErr);
            
        }
      }

      return res.json({ ok: true });
    } catch (err) {
      console.error('Webhook top-level error:', err);
      return res.status(500).json({ error: err.message });
    }
  }


}

module.exports = TelegramWebhookController;
