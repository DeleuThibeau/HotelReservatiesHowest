// app.ts
import cors from 'cors'
import 'reflect-metadata'

import express, { Request, Response, Router } from 'express'
import { createDatabase } from 'typeorm-extension'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'

import { graphqlHTTP } from 'express-graphql'
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'

import { LogRequest } from './middleware/logRequest'
import { ReviewResolver } from './resolvers/reviewResolver'

// import seedDatabase from './seeders/seeder'
import {
  IUserController,
  UserController,
} from './controllers/mariaDB/user.controller'
import {
  IBookingController,
  BookingController,
} from './controllers/mariaDB/booking.controller'
import {
  IRoomController,
  RoomController,
} from './controllers/mariaDB/room.controller'
import {
  IServiceController,
  ServiceController,
} from './controllers/mariaDB/service.controller'
import {
  IRoomServiceController,
  RoomServiceController,
} from './controllers/mariaDB/roomService.controller'
// import {
//   IReviewController,
//   ReviewController,
// } from './controllers/mongoDB/review.controller'

import { IController } from './controllers/crud.controller'
import seedDatabase from './seeders/seeder'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import authMiddleware from './auth/firebaseAuthMiddleware'

dotenv.config({ path: 'firebase.env' }) // This will load in the GOOGLE_APPLICATION_CREDENTIALS
;(async () => {
  const connectionOptionsMariaDB: ConnectionOptions =
    await getConnectionOptions('default')
  const connectionOptionsMongoDB: ConnectionOptions =
    await getConnectionOptions('connection2')

  // Create the database before we make the connection. This will also add the tables
  createDatabase({ ifNotExist: true }, connectionOptionsMariaDB)
    .then(() => console.log('Database has been created!'))
    .then(createConnection)
    .then(async (connection: Connection) => {
      seedDatabase(connection)

      const mongoConnection: Connection = await createConnection(
        connectionOptionsMongoDB,
      ).then(connection => {
        return connection
      })

      let schema: GraphQLSchema = {} as GraphQLSchema

      await buildSchema({
        resolvers: [ReviewResolver],
      }).then(_ => {
        schema = _
      })

      // APP SETUP
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      })
      const app = express(),
        port = process.env.PORT || 3000

      // MIDDLEWARE
      app.use(express.json()) // for parsing application/json
      //app.use(middlewareDemo)
      app.use(LogRequest)

      app.use(
        cors({
          origin: 'http://localhost:30901',
        }),
      )

      // ROUTES
      app.get('/', (request: Request, response: Response) => {
        response.send(`The backend is up and running ;)`)
      })

      interface AppControllers {
        booking: IBookingController
        user: IUserController
        room: IRoomController
        service: IServiceController
        roomService: IRoomServiceController
      }

      const controllers: AppControllers = {
        booking: new BookingController(),
        user: new UserController(),
        room: new RoomController(),
        service: new ServiceController(),
        roomService: new RoomServiceController(),
      }

      Object.entries(controllers).forEach((entry: any) => {
        const key = entry[0] as string,
          controller = entry[1] as IController
        app.use(`/${key}`, controller.router)
      })

      // app.use(authMiddleware)
      app.use(
        '/v1/', // Url, do you want to keep track of a version?
        graphqlHTTP((request, response) => ({
          schema: schema,
          context: { request, response },
          graphiql: true,
        })),
      )

      // APP START
      app.listen(port, () => {
        console.info(`\nServer 👾 \nListening on http://localhost:${port}/`)
      })
    })
    .catch(error => console.error(error))
})()
