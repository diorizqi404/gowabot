const axios = require('axios');
const logger = require('../logger');

const client = axios.create({
  baseURL: process.env.GOWA_API_URL,
  auth: {
    username: process.env.GOWA_USERNAME,
    password: process.env.GOWA_PASSWORD,
  },
})

async function sendMessage(phone, message, duration = 0) {
  try {
    await sendPresence(phone, 'start')
    await new Promise(resolve => setTimeout(resolve, 1000));
    await sendPresence(phone, 'stop');

    const res = await client.post('/send/message', {
      phone,
      message,
      duration,
    })

    logger.msg(`Message sent: ${message} to ${phone}`);
    return res.data
  } catch (e) {
    logger.error(`Failed to send message: ${e.message}`);
  }
}

async function sendPresence(phone, presence) {
  try {
    const res = await client.post('/send/chat-presence', {
      phone,
      action: presence
    })
    return res.message
  } catch (e) {
    logger.error(`Failed to send presence: ${e.message}`);
  }
}

module.exports = { sendMessage, sendPresence }