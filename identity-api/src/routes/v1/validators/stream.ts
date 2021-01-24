import { checkSchema } from 'express-validator'

export const getAccessTokenValidator = checkSchema({
  login: { isString: true },
  password: { isString: true, isLength: { options: { min: 6 } } },
})
