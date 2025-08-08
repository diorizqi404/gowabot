const svCommands = require('../commands/server')
const dcCommands = require('../commands/docker')

async function routeMessage({text, phone, senderName, gowaClient}) {
  if (!text) return

  const [cmd, subcmd, ...args] = text.split(' ')

  if (cmd === 'sv') {
    const cmdKey = subcmd
    const handler = svCommands[cmdKey]

    if (handler) {
      return handler({phone, gowaClient, args})
    } else {
      return await gowaClient.sendMessage(phone, `Command not found: sv ${cmdKey}`)
    }
  } else if (cmd === 'dc') {
    const cmdKey = subcmd
    const handler = dcCommands[cmdKey]

    if (handler) {
      return handler({phone, gowaClient, args})
    } else {
      return await gowaClient.sendMessage(phone, `Command not found: dc ${cmdKey}`)
    }
  }
}

module.exports = routeMessage