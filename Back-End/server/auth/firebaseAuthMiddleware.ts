import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '.'
import { UserController } from '../controllers/mariaDB/user.controller'
import { User } from '../entity/mariaDB/user'

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const headerToken = request.headers.authorization
  const userController = new UserController()

  if (!headerToken) {
    return response.send({ message: 'No token provided' }).status(401)
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    return response.send({ message: 'Invalid token' }).status(401)
  }

  const token: string = headerToken.split(' ')[1]

  verifyToken(token)
    .then((claims: any) => {
      ;(request as any).currentUser = claims
      // Check the mail of the person who does the request
      var email = claims.email

      // Verify the mail in mariaDB and check Type to redirect the user to the correct page.
      userController.OneByEmailBackend(email).then((foundUser: any) => {
        if (foundUser.type == 'admin') {
          next()
        } else {
          if (request.url == '/all') {
            response
              .status(403)
              .send('Sorry, you have no acces to this information!')
          } else {
            next()
          }
        }
      })
    })
    .catch(error => {
      console.log(error)
      return response.send({ message: 'Could not authorize' }).status(403)
    })
}

export default authMiddleware
