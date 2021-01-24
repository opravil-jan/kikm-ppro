import { checkSchema } from 'express-validator'

export const getClientByNameValidator = checkSchema({
  name: { isString: true },
})

export const patchClientValidator = checkSchema({
  id: { isString: true },
  name: { isString: true },
  description: { isString: true },
})

export const deleteClientByNameValidator = checkSchema({
  id: { isString: true },
})

export const postClientByNameValidator = checkSchema({
  name: { isString: true },
  description: { isString: true },
  type: { isNumeric: true },
})
