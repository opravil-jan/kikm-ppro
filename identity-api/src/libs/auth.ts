import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import moment from 'moment'
import { Request, Response, NextFunction } from 'express'

export function generateJsonWebToken(
  user: string,
  altSec: string = ''
): string {
  let secret = process.env.JWT_SECRET || ''

  if (altSec.length > 0) {
    secret = altSec
  }

  if (secret.length < 1) {
    throw new Error('Invalid JWT secret')
  }

  const token = jwt.sign({ user, expiration: moment().add(1, 'h') }, secret)
  return token
}

export async function validateByBcrypt(
  text: string,
  hash: string
): Promise<boolean> {
  const res = await bcrypt.compare(text, hash)
  return res
}

export function hasUserAccess(): any {
  return function (req: Request, res: Response, next: NextFunction) {
    const secret = process.env.JWT_SECRET || ''
    if (secret.length < 1) {
      throw new Error('Invalid JWT secret')
    }

    const token = req.header('Authorization')
    if (typeof token !== 'string') {
      next('Unauthorized')
    } else {
      try {
        const res = jwt.verify(token, secret)
      } catch (err) {
        next('Unauthorized')
      }
    }

    next()
  }
}
