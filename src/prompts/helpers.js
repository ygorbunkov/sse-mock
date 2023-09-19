import inquirer from 'inquirer'
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { inputTypes, defaultResponseDir } from './constants.js'


const currentDir = fileURLToPath(import.meta.url)
const responseDirPath = path.join(
  currentDir,
  '../..',
  process.env.RESPONSES_DIR ?? defaultResponseDir
)

export const questionFactory =
  (type) =>
  ({ name, message, choices }) => ({
    type,
    name,
    message,
    ...(choices && { choices })
  })

export const listQuestionFactory = questionFactory(inputTypes.list)

export const inputQuestionFactory = questionFactory(inputTypes.input)

export const promptFactory = (question, callback) => async () => {
  const choice = await inquirer.prompt(question)

  callback(choice)
}

export const listResponses = async () => {
  let responseFilesList = []

  try {
    responseFilesList = await readdir(responseDirPath)
  } catch (err) {
    console.error('Error reading response directory: ', err)
  }

  return responseFilesList
}

export const readJsonFile = async (fileName) => {
    const responseFilePath = path.join(responseDirPath, fileName)
    let responseFileContent = null

    try {
        const rawFileContent = await readFile(responseFilePath)

        responseFileContent = JSON.parse(rawFileContent)
    } catch (err) {
        console.error('Error reading file content: ', err)
    }

    return responseFileContent
}
