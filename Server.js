import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'
import passportConfig from './configurations/passport-config.js'
import Configuration from './configurations/Configurations.js'
import {RouteController} from './src/Routes.js'
import { notFound } from './src/middlewares/notFound.js'
import { errorHandler } from './src/middlewares/errorHandler.js'
import path from 'path'

const application = express()
application.use(passport.initialize())
application.use(cors({ credentials: true }))
application.use(express.json())
application.use(helmet())
application.use(morgan('common'))

RouteController(application)

passportConfig.registerUserini()
passportConfig.login()

application.use('/public', express.static(path.join(__dirname, 'public')))

application.use(notFound)
application.use(errorHandler)

Configuration.connectToDatabase()
Configuration.connectToPort(application)
