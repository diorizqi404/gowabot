const gowaClient = require("../services/gowaClient");
const logger = require("../logger");
const routeMessage = require("./commandHandler");

async function messageHandler(data) {
  if (!data.message) {
    return;
  }

  const text = data.message.text?.toLowerCase();
  const senderPhone = data.sender_id;
  const senderName = data.pushname;
  const phone = data.from;

  if (text) {
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
