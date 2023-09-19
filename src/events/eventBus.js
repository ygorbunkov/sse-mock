import { EventEmitter } from 'events'
import { eventTypes } from '../constants.js'

const eventManager = () => {
    const globalEventEmitter = new EventEmitter()

    const triggerAppShutdown = () => globalEventEmitter.emit(eventTypes.shutdownApp)
    const handleAppShutdown = onAppShutdown => globalEventEmitter.on(eventTypes.shutdownApp, onAppShutdown)

    const triggerPushSse = () => globalEventEmitter.emit(eventTypes.pushSse)
    const handlePushSse = onPushSse => globalEventEmitter.on(eventTypes.pushSse, onPushSse)
    const unsubscribePushSse = onDisconnect => globalEventEmitter.off(eventTypes.pushSse, onDisconnect)

    return {
        triggerAppShutdown,
        handleAppShutdown,
        triggerPushSse,
        handlePushSse,
        unsubscribePushSse
    }
}

export const eventBus = eventManager()
