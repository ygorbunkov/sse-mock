import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { defaultPort, defaultSseRoot, networkParams } from './constants.js'
import { actionPrompt } from './prompts/index.js'
import { headerDecorator } from './middlewares/headerDecorator.js'
import { sseRouter } from './routers/sseRouter.js'
import { eventBus } from './events/eventBus.js'
import { shutdownApp } from './helpers.js'
import { appConfig } from './config/index.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT ?? defaultPort
const SSE_ROOT = process.env.SSE_ROOT ?? defaultSseRoot
const START_BANNER = `Listening on port ${PORT}`

appConfig.setConfig(networkParams.port, PORT)
appConfig.setConfig(networkParams.root, SSE_ROOT)

app.use(cors())
app.use(json())
app.use(headerDecorator)

app.use(SSE_ROOT, sseRouter)

eventBus.handleAppShutdown(shutdownApp)

app.listen(PORT, () => {
  console.log(START_BANNER)

  actionPrompt()
})
