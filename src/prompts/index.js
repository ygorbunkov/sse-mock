import {
  inputQuestionFactory,
  listQuestionFactory,
  listResponses,
  readJsonFile,
  promptFactory
} from './helpers.js'
import { actionChoicesHashMap, messageHashMap } from './constants.js'
import { customPropNames } from '../constants.js'
import { appConfig } from '../config/index.js'
import { eventBus } from '../events/eventBus.js'

const actionQuestion = listQuestionFactory({
  name: customPropNames.action,
  message: messageHashMap.action,
  choices: Object.values(actionChoicesHashMap)
})

const routeQuestion = inputQuestionFactory({
  name: customPropNames.route,
  message: messageHashMap.route,
  default: '/'
})

const responseQuestion = listQuestionFactory({
  name: customPropNames.response,
  message: messageHashMap.response,
  choices: listResponses
})

const actionPromptHandler = (choice) => {
  const chosenAction = choice[customPropNames.action]
  appConfig.setConfig(customPropNames.action, chosenAction)

  if (chosenAction === actionChoicesHashMap.configSubResponse) {
    routePrompt()
  } else if (chosenAction === actionChoicesHashMap.pushSse) {
    eventBus.triggerPushSse()

    actionPrompt()
  } else if (chosenAction === actionChoicesHashMap.exit) {
    eventBus.triggerAppShutdown()
  }
}

const routeSelectHandler = (choice) => {
  const routeToConfig = choice[customPropNames.route]
  appConfig.setConfig(customPropNames.route, routeToConfig)

  responsePrompt()
}

const responseSelectHandler = async (choice) => {
  const chosenResponseFile = choice[customPropNames.response]
  const responseJson = await readJsonFile(chosenResponseFile)

  appConfig.setConfig(customPropNames.response, responseJson)

  actionPrompt()
}

export const actionPrompt = promptFactory(actionQuestion, actionPromptHandler)

export const routePrompt = promptFactory(routeQuestion, routeSelectHandler)

export const responsePrompt = promptFactory(
  responseQuestion,
  responseSelectHandler
)
