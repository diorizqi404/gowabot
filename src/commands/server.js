module.exports = {
  ping: async ({ phone, gowaClient }) => {
    await gowaClient.sendMessage(phone, "pong");
  },
    status: async ({ phone, gowaClient }) => {
    await gowaClient.sendMessage(phone, "semua sistem normal");
  },

  stats: async ({ phone, gowaClient }) => {
    await gowaClient.sendMessage(phone, "CPU: 30%, RAM: 60%");
  },
}