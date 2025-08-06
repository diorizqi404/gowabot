const axios = require('axios');
const logger = require('../../logger');

const client = axios.create({
  baseURL: process.env.GOWA_API_URL,
  auth: {
    username: process.env.GOWA_USERNAME,
    password: process.env.GOWA_PASSWORD,
  },
})

async function sendMessage(phone, message, duration = 0) {
  try {
    const res = await client.post('/send/message', {
      phone,
      message,
      duration,
    })

    logger.log(`Message sent: ${message} to ${phone}`);
    return res.data
  } catch (e) {
    logger.error(`Failed to send message: ${e.message}`);
  }
}

module.exports = { sendMessage }