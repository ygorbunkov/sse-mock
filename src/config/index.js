import { customPropNames, networkParams } from '../constants.js'

const validConfigParams = {
  ...customPropNames,
  ...networkParams
}

const configManager = () => {
  const globalConfig = new Map()
  const getConfig = (key) => globalConfig.get(key)
  const setConfig = (key, value) => {
    if (!(key in validConfigParams)) return

    globalConfig.set(key, value)

    return { key, value }
  }

  return {
    getConfig,
    setConfig
  }
}

export const appConfig = configManager()
