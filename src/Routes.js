import UserRoutes from './routes/User.routes.js'
import PaymentRoutes from './routes/e-commerce/Payment.routes.js'
import OrderRoutes from './routes/e-commerce/Order.routes.js'
import ProductRoutes from './routes/e-commerce/Product.routes.js'
import ProductCategoryRoutes from './routes/e-commerce/ProductCategory.routes.js'
import ProductBrandRoutes from './routes/e-commerce/ProductBrand.routes.js'
import ShoppingCartRoutes from './routes/e-commerce/ShoppingCart.routes.js'
import ContactRoutes from './routes/Contact.routes.js'
import NewsLetterSubscriptionRoutes from './routes/NewsLetterSubscription.routes.js'
import AdminRoutes from './routes/Admin.routes.js'
import CareerRoutes from './routes/Career.routes.js'
import ApplicantRoutes from './routes/Applicant.routes.js'

const RouteController = (application) => {
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
  }

  export {RouteController}