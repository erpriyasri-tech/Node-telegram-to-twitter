const { TwitterApi } = require("twitter-api-v2");
// const keys = require("../config/keys");

class TwitterService {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
  }

  async post(text) {
    try {
      const tweet = await this.client.v2.tweet(text);
      return tweet.data;
    } catch (err) {
      console.error("Twitter post failed:", err.message);
      return { error: err.message };
    }
  }
}

module.exports = new TwitterService();
