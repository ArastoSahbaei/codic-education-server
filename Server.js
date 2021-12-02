import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'
import passportConfig from './configurations/passport-config.js'
import Configuration from './configurations/Configurations.js'
import UserRoutes from './src/routes/User.routes.js'
import PaymentRoutes from './src/routes/e-commerce/Payment.routes.js'
import OrderRoutes from './src/routes/e-commerce/Order.routes.js'
import ProductRoutes from './src/routes/e-commerce/Product.routes.js'
import ProductCategoryRoutes from './src/routes/e-commerce/ProductCategory.routes.js'
import ProductBrandRoutes from './src/routes/e-commerce/ProductBrand.routes.js'
import ShoppingCartRoutes from './src/routes/e-commerce/ShoppingCart.routes.js'
import ContactRoutes from './src/routes/Contact.routes.js'
import NewsLetterSubscriptionRoutes from './src/routes/NewsLetterSubscription.routes.js'
import AdminRoutes from './src/routes/Admin.routes.js'
import CareerRoutes from './src/routes/Career.routes.js'
import ApplicantRoutes from './src/routes/Applicant.routes.js'
import { notFound } from './src/middlewares/notFound.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

const application = express()
application.use(passport.initialize())
application.use(cors({ credentials: true }))
application.use(express.json())
application.use(helmet())
application.use(morgan('common'))

passportConfig.registerUserini()
passportConfig.login()

UserRoutes.routes(application)
PaymentRoutes.routes(application)
OrderRoutes.routes(application)
ProductRoutes.routes(application)
ContactRoutes.routes(application)
ProductCategoryRoutes.routes(application)
ProductBrandRoutes.routes(application)
ShoppingCartRoutes.routes(application)
NewsLetterSubscriptionRoutes.routes(application)
CareerRoutes.routes(application)
AdminRoutes.routes(application)
ApplicantRoutes.routes(application)

application.use(notFound)
application.use(errorHandler)

Configuration.connectToDatabase()
Configuration.connectToPort(application)
