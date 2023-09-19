import { Router } from 'express'
import { sseController } from '../controllers/sseController.js'

export const sseRouter = Router()

sseRouter.get('*', sseController)