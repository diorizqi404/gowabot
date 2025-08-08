module.exports = {
  ping: async ({ phone, gowaClient }) => {
    await gowaClient.sendMessage(phone, "pong");
  }
};