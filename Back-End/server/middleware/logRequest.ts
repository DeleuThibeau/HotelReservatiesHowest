import { NextFunction, Request, Response } from 'express'

// This middleware functionality, looks from where certain requests come from.
export const LogRequest = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const method = request.method
    const userAgent = request.get('User-Agent')
    const date = new Date()
    const convertedDate =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()

    console.log(
      convertedDate +
        ' - new ' +
        method +
        ' request to my API from ' +
        userAgent,
    )

    console.log('User Agent', userAgent)
    next()
  } catch (ex) {
    response.status(400)
  }
}
