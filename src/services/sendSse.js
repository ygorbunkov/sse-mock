import { appConfig } from '../config/index.js'
import { customPropNames } from '../constants.js'
import { sseDataDecorator } from './helpers.js'

export const sendSse = (req, res) => {
  const route = appConfig.getConfig(customPropNames.route)
  const response = appConfig.getConfig(customPropNames.response)
  const sseData = sseDataDecorator(response)

  if (req.url === route) {
    res.write(sseData)
  }
}
