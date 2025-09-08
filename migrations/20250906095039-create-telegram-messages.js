'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('telegram_messages', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      update_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      },
      message_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      chat_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      chat_title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      message_text: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      raw_update: {
        type: Sequelize.JSON,
        allowNull: true
      },
      rewritten_text: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      posted_to_x: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      posted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      tweet_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      message_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('telegram_messages');
  }
};
