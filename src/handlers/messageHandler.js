const gowaClient = require("../services/gowaClient");
const logger = require("../logger");
const routeMessage = require("./commandHandler");

// Store processed message IDs to prevent duplicate processing
const processedMessages = new Set();

async function messageHandler(data) {
  if (!data.message) {
    return;
  }

  // Get message ID for deduplication
  const messageId = data.message.id;
  
  // Check if message was already processed
  if (messageId && processedMessages.has(messageId)) {
    logger.warn(`Duplicate message detected: ${messageId}`);
    return;
  }

  const text = data.message.text?.toLowerCase();
  const senderPhone = data.sender_id;
  const senderName = data.pushname;
  const phone = data.from;

  if (text) {
    // Mark message as processed
    if (messageId) {
      processedMessages.add(messageId);

      // Clean up old message IDs (keep only last 10)
      if (processedMessages.size > 10) {
        const firstItem = processedMessages.values().next().value;
        processedMessages.delete(firstItem);
      }
    }

    logger.log(`Message from ${senderName} (${senderPhone}): ${text}`);

    await routeMessage({
      text,
      phone,
      senderName,
      gowaClient,
    });
  }

  // Uncomment and modify the following lines if you want to handle more events

  // else if (event === "message.ack") {
  //   console.log(`Message ${data.payload.receipt_type}:`, {
  //     chat_id: data.payload.chat_id,
  //     message_ids: data.payload.ids,
  //     description: data.payload.receipt_type_description,
  //   });
  // } else if (data.action === "message_deleted_for_me") {
  //   console.log("Message deleted:", data.deleted_message_id);
  // } else if (data.action === "message_revoked") {
  //   console.log("Message revoked:", data.revoked_message_id);
  // }
}

module.exports = messageHandler;
