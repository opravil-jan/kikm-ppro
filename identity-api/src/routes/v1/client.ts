import express, { Request, Response, NextFunction } from 'express'
import clientService from '../../services/client'
import {
  getClientByNameValidator,
  patchClientValidator,
  deleteClientByNameValidator,
  postClientByNameValidator,
} from './validators/client'
import { hasUserAccess } from '../../libs/auth'
import { validationResult } from 'express-validator'

const router = express.Router()

router.get(
  '/client',
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await clientService.getClients()
    return res.json(result)
  }
)

router.get(
  '/client/:name',
  getClientByNameValidator,
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next({ error: errors.array(), code: 400 })
    }

    const { name } = req.body
    const result = await clientService.getClientByName(name)
    return res.json(result)
  }
)

router.post(
  '/client',
  postClientByNameValidator,
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next({ error: errors.array(), code: 400 })
    }

    const { name, description, type } = req.body
    await clientService.createClient({ name, description, type })

    res.json({ message: 'created' })
  }
)

router.patch(
  '/client',
  patchClientValidator,
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next({ error: errors.array(), code: 400 })
    }

    const { name, description, id } = req.body
    await clientService.updateClient({ id, name, description })

    res.json({ message: 'updated' })
  }
)

router.delete(
  '/client/:id',
  deleteClientByNameValidator,
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next({ error: errors.array(), code: 400 })
    }

    const { id } = req.params
    await clientService.deleteClient(id)
    return res.json({ message: 'deleted' })
  }
)

export default router
