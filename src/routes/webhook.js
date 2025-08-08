const express = require('express')
const router = express.Router()
const verifySignature = require('../utils/verifySignature')
const messageHandler = require('../handlers/messageHandler')
const logger = require('../logger')

router.post('/', async (req, res) => {
  const signature = req.headers['x-hub-signature-256']
  const payload = req.body
  const secret = process.env.WHATSAPP_WEBHOOK_SECRET

  if (!verifySignature(signature, payload, secret)) {
    return res.status(401).send('Unauthorized')
  }

  const data = JSON.parse(payload)
  
  // move response status to avoid duplicate webhooks
  
  try {
    await messageHandler(data)
    res.status(200).send('OK')
  } catch (error) {
    logger.error(`Error handling message: ${error.message}`)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router