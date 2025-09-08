'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const TelegramMessage = sequelize.define("TelegramMessage", {
    update_id: { type: DataTypes.BIGINT, unique: true },
    message_id: DataTypes.BIGINT,
    chat_id: DataTypes.BIGINT,
    chat_title: DataTypes.STRING,
    message_text: DataTypes.TEXT,
    raw_update: DataTypes.JSON,
    rewritten_text: DataTypes.TEXT,
    posted_to_x: { type: DataTypes.BOOLEAN, defaultValue: false },
    posted_at: DataTypes.DATE,
    tweet_id: DataTypes.STRING,
    message_date: DataTypes.DATE,
  }, {
    tableName: 'telegram_messages',  
    underscored: true,               
    timestamps: true                 
  });

  return TelegramMessage;                               
};
