import newsLetterSubscription from "../../src/models/NewsLetterSubscription.model.js"
import UserModel from "../../src/models/User.model.js"
import ProductModel from "../../src/models/Product.model.js"
import ShoppingCartModel from '../../src/models/ShoppingCart.model.js'

export const userList = 
[
    {
        username: 'Miss94',
        email: 'miss94@gmail.com',
        password: '123456',
        personalDetails: {
            firstName: 'Anna',
            lastName: 'Jonasson',
            gender: true,
            country: 'Sweden',
            adress: 'Göteborgsvägen 178',
            secondaryAdress: '',
            zipCode: '456 97' ,
            county:'Västra Götaland',
            postOffice: '' ,
            phone: '123 456 78 90' ,
            secondaryPhone:'',
            
        },
        
        creditCard: {
                method: 'Visa',
                number: '1524 1526 1527 1528'
        },

        newsLetterSubscription: new newsLetterSubscription({
            email: 'miss94@gmail.com',
            receiveNewsLetters: false,
            }
            
        )
        
        

           
    },

    {
        username: 'Miss94',
        email: 'miss94@gmail.com',
        password: '123456',
        personalDetails: {
            firstName: 'Anna',
            lastName: 'Jonasson',
            gender: true,
            country: 'Sweden',
            adress: 'Göteborgsvägen 178',
            secondaryAdress: '',
            zipCode: '456 97' ,
            county:'Västra Götaland',
            postOffice: '' ,
            phone: '123 456 78 90' ,
            secondaryPhone:'',
            
        },
        
        creditCard: {
                method: 'Visa',
                number: '1524 1526 1527 1528'
        },

        newsLetterSubscription: new newsLetterSubscription({
            email: 'miss94@gmail.com',
            receiveNewsLetters: false,
            }
            
        )
    }
]