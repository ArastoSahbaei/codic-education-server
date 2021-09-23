import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'
import path from 'path'

import Configuration from './configurations/Configurations.js'
import Middlewares from './src/middlewares/Middlewares.js'
import UserRoutes from './src/routes/User.routes.js'
import PaymentRoutes from './src/routes/Payment.routes.js'
import OrderRoutes from './src/routes/Order.routes.js'
import ProductRoutes from './src/routes/Product.routes.js'
import ProductCategoryRoutes from './src/routes/ProductCategory.routes.js'
import ProductBrandRoutes from './src/routes/ProductBrand.routes.js'
import ShoppingCartRoutes from './src/routes/ShoppingCart.routes.js'
import ContactRoutes from './src/routes/Contact.routes.js'
import NewsLetterSubscriptionRoutes from './src/routes/NewsLetterSubscription.routes.js'
import EmployeeRoutes from './src/routes/Employee.routes.js'
import passportConfig from './configurations/passport-config.js'
import CareerRoutes from './src/routes/Career.routes.js'

const application = express()
application.use(passport.initialize())
application.use(cors({ credentials: true }))
application.use(express.json())
application.use(helmet())
application.use(morgan('common'))
application.use('/static', express.static(path.join(process.cwd(), 'configurations')))

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
EmployeeRoutes.routes(application)

application.use(Middlewares.notFound)
application.use(Middlewares.errorHandler)




Configuration.connectToDatabase()
Configuration.connectToPort(application)
