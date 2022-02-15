import { getAuth } from 'firebase-admin/auth'

export const verifyToken = (token: string) => {
  return new Promise(function (resolve, reject) {
    getAuth()
      .verifyIdToken(token)
      .then((decodedToken: any) => {
        resolve(decodedToken)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}
