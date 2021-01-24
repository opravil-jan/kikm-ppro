import { Request, Response, NextFunction } from 'express'

export enum ErrorStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 400,
  CONFLICT = 409,
  UNSUPPORTED_MEDIA_TYPE = 415,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
}

// TODO: finish this function
export function errorHandler(
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error({ msg: err.message, stacktrace: err.stack })
  return res.status(err.code).json({ msg: err.message })
}

export default class ErrorHandler extends Error {
  public code: ErrorStatusCode

  constructor(message: string, code: ErrorStatusCode) {
    super()
    this.message = message
    this.code = code
  }
}
