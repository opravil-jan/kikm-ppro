import express, { Request, Response, NextFunction } from 'express'
import typeService from '../../services/type'
import { hasUserAccess } from '../../libs/auth'

const router = express.Router()

router.get(
  '/types',
  hasUserAccess(),
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await typeService.getClientTypes()
    return res.json(result)
  }
)

export default router
