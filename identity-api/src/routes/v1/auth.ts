import express, { NextFunction, Request, Response } from 'express'
import { getAccessTokenValidator } from './validators/stream'
import { validationResult } from 'express-validator'
import userService from '../../services/user'
import authService from '../../services/auth'

const router = express.Router()

router.post(
  '/auth/get-access-token',
  getAccessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next({ error: errors.array(), code: 400 })
    }

    const { login, password } = req.body
    try {
      const user = await userService.getUserByLogin(login)
      if (user.length !== 1) {
        throw new Error('User not found')
      }

      const token = await authService.generateToken(
        {
          login: user[0].login,
          hashPassword: user[0].password,
        },
        password
      )

      return res.json({ token })
    } catch (err) {
      next({ error: 'Access denial', code: 401 })
    }
  }
)

export default router
