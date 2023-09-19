import { customPropNames } from "../constants.js"

export const inputTypes = {
    list: 'list',
    input: 'input'
}

export const messageHashMap = {
    [customPropNames.action]: 'Which action would you like to take next?',
    [customPropNames.route]: 'Specify the source endpoint route:',
    [customPropNames.response]: 'Choose response from one of the following JSON-files:'
}

export const actionChoicesHashMap = {
    configSubResponse: 'Configure endpoint subscription response',
    pushSse: 'Push Server Sent Event to the client',
    exit: 'Exit'
}

export const defaultResponseDir = '/responses'