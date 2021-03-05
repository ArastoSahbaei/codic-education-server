import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import passport from 'passport'

import Configuration from './configurations/Configurations.js'
import Middlewares from './src/middlewares/Middlewares.js'
import UserRoutes from './src/routes/User.routes.js'
import ProductRoutes from './src/routes/Product.routes.js'
import ProductCategoryRoutes from './src/routes/ProductCategory.routes.js'
import ProductBrandRoutes from './src/routes/ProductBrand.routes.js'
import ShoppingCartRoutes from './src/routes/ShoppingCart.routes.js'
import NewsLetterSubscriptionRoutes from './src/routes/NewsLetterSubscription.routes.js'
import passportConfig from './configurations/passport-config.js'

const application = express()
application.use(passport.initialize())
application.use(bodyParser.urlencoded({ extended: true }))
application.use(bodyParser.json())
application.use(helmet())
application.use(morgan('common'))

passportConfig.registerUserini()
passportConfig.login()

UserRoutes.routes(application)
ProductRoutes.routes(application)
ProductCategoryRoutes.routes(application)
ProductBrandRoutes.routes(application)
ShoppingCartRoutes.routes(application)
NewsLetterSubscriptionRoutes.routes(application)
application.use(Middlewares.notFound)
application.use(Middlewares.errorHandler)

if (process.env.NODE_ENV === "PRODUCTION") {
	application.use(express.static('client/build'))
}

Configuration.connectToDatabase()
Configuration.connectToPort(application)