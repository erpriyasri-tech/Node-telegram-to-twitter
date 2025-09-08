# Telegram to Twitter Bot 
# Telegram → AI → Twitter Automation (Node.js)

## Features
- Fetches messages from a private Telegram channel
- Uses OpenAI API to rewrite text
- Posts rewritten text to Twitter (X) automatically
- Node Queue Jobs for async processing

## Requirements
- Node.js (>=16)
- MySQL (>=5.7 or MariaDB 10+)
- Git
- Twitter Developer Account (API keys)
- OpenAI API Key
- Telegram Bot Token

1. **Clone the repository**
   git clone https://github.com/your-username/telegram-to-twitter.git
   cd telegram-to-twitter

2.  **Install Dependencies**
Main packages used:

- npm install 
- npm install express  - Express (web server)
- npm install sequelize  - Sequelize (ORM for MySQL)
- npm install mysql2   -  MySQL2 (MySQL driver for Sequelize)
- npm install dotenv   -  Dotenv (environment variables loader)
- npm install axios – HTTP requests
- npm install openai – OpenAI API (to call GPT models)
- npm install twitter-api-v2 – Twitter API client
- npm install --save-dev nodemon    – Auto-restart during development

3.  **Create a .env file in the project root**

Update the following keys in .env:

PORT=3000

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=telegram_to_twitter

TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=your_channel_id

OPENAI_API_KEY=your_openai_api_key
   
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret

4. **configure your DB in config/config.json**
{
  "development": {
    "username": "root",
    "password": "mypassword",
    "database": "telegram_to_twitter",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
It connects to MySQL with the given username + password

5. **Run below comman**
-  npx sequelize-cli db:create     (DB created)

6. **Run migrations**
-  npx sequelize-cli db:migrate

7. **Run Server**
-  npm start

If you don’t have a domain name yet, you can still test the API locally using Postman.
Send a POST request to:-
http://localhost:3000/api/v1/telegram/telegram-to-twitter

JSON Body Sample
{
  "ok": true,
  "result": [
    {
      "update_id": 89876505387,
      "channel_post": {
        "message_id": 3,
        "sender_chat": { 
          "id": -100123456890, 
          "title": "Cloudmail-AI", 
          "type": "channel" 
        },
        "chat": { 
          "id": -10012345690, 
          "title": "Cloudmail-AI", 
          "type": "channel" 
        },
        "date": 1756728646,
        "text": "Hi, This is my Node Js Project"
      }
    }
  ]
}

Click On Send Button 

https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://yourdomain.com/webhook/telegram



