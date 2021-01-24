import express, { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { hasUserAccess } from '../../libs/auth'
import {
  postContactValidator,
  deleteContactValidator,
} from './validators/contact'
import contactService from '../../services/contact'

const router = express.Router()

router.post(
  '/contact',
  postContactValidator,
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next({ error: errors.array(), code: 400 })
    }

    const { name, contact, owner } = req.body
    await contactService.saveContact(name, contact, owner)

    return res.json({ message: 'created' })
  }
)

router.get(
  '/contact',
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const contacts = await contactService.getContacts()
    return res.json(contacts)
  }
)

router.delete(
  '/contact/:id',
  deleteContactValidator,
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next({ error: errors.array(), code: 400 })
    }

    const { id } = req.params
    const contacts = await contactService.deleteContact(id)
    return res.json(contacts)
  }
)

export default router
