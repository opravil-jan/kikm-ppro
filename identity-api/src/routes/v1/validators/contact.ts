import { checkSchema } from 'express-validator'

export const postContactValidator = checkSchema({
  name: { isString: true },
  contact: { isString: true },
  owner: { isString: true },
})

export const deleteContactValidator = checkSchema({
  id: { isString: true },
})
