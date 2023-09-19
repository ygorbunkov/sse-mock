import { eventBus } from '../events/eventBus.js'
import { sendSse } from '../services/sendSse.js'

export const sseController = (req, res) => {
  const _sendSse = sendSse.bind(null, req, res)

  eventBus.handlePushSse(_sendSse)

  req.on('close', () => eventBus.unsubscribePushSse(_sendSse))
}
