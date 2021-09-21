import shoppingCart from '../../src/models/ShoppingCart.model.js'
import newsLetterSubscription from "../../src/models/NewsLetterSubscription.model.js"
import user from '../../src/models/User.model.js'

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
            state:'Västra Götaland',
            city: 'Gothenburg',
            postOffice: '' ,
            phone: '123 456 78 90' ,
            secondaryPhone:'',
            
        },

        shoppingCart: new shoppingCart(),

        
        creditCard: {
                method: 'Visa',
                number: '1524 1526 1527 1528'
        },

        newsLetterSubscription: newsLetterSubscription()
       
    },

    {
        username: 'steph',
        email: 'steph.tronier.vip@gmail.com',
        password: '123456',
        personalDetails: {
            firstName: 'Stephanie',
            lastName: 'Norager',
            gender: true,
            country: 'Sweden',
            adress: 'Brandtvägen 8',
            secondaryAdress: '',
            zipCode: '456 97' ,
            state:'Västra Götaland',
            city: 'Mölndal',
            postOffice: '' ,
            phone: '123 456 78 90' ,
            secondaryPhone:'',
            
        },

        shoppingCart: new shoppingCart(),

        
        creditCard: {
                method: 'Visa',
                number: '1524 1526 1527 1528'
        },

        newsLetterSubscription: newsLetterSubscription()
    },


    {
        username: 'eliseo.nikolaus',
        email: 'eliseo.nikolaus@email.com',
        password: '',
        personalDetails: {
            firstName: 'Eliseo',
            lastName: 'Nikolaus',
            gender: true,
            country: 'United States',
            adress: 'Sanford Mews, 14434 Cronin Estates',
            secondaryAdress: '',
            zipCode: '46938-6436' ,
            state:'Wisconsin',
            city: 'Mardellburgh',
            postOffice: '' ,
            phone: '+1-441 (901) 763-7183 x270' ,
            secondaryPhone:'',
            
        },

        shoppingCart: new shoppingCart(),

        
        creditCard: {
                method: 'Visa',
                number: '6771-8970-9405-9667'
        },

        
        newsLetterSubscription: newsLetterSubscription()

    },
        {
        username: 'denver.huel',
        email: 'denver.huel@email.com',
        password: 'HLUP1OqaJZ',
        personalDetails: {
            firstName: 'Denver',
            lastName: 'Huel',
            gender: true,
            country: 'United States',
            adress: 'Morton Spurs, ',
            secondaryAdress: '70226 Jaskolski Avenue',
            zipCode: '15379-4913' ,
            state:'Virginia',
            city: 'New Maximina',
            postOffice: '' ,
            phone: '+504 753-281-7271 x1734' ,
            secondaryPhone:'',
            
        },

        shoppingCart: new shoppingCart(),
        
        creditCard: {
                method: 'Mastercard',
                number: '4387-7387-8313-5114'
        },

        newsLetterSubscription: new newsLetterSubscription()
    },

    
    {
        username: 'stacey.considine',
        email: 'stacey.considine@email.com',
        password: 'jTLSxMzauW',
        personalDetails: {
            firstName: 'Stacey',
            lastName: 'Considine',
            gender: true,
            country: 'United States',
            adress: 'Julio Squares, 5258 Dusty Fort ',
            secondaryAdress: '',
            zipCode: '43267-2245' ,
            state:'Rhode Island',
            city: 'Vinnieborough',
            postOffice: '' ,
            phone: '+967 1-328-741-6594 x0361' ,
            secondaryPhone:'',
            
        },

    shoppingCart: new shoppingCart(),

        
        creditCard: {
                method: 'Mastercard',
                number: '4557-4378-4123-7879'
        },

        newsLetterSubscription: new newsLetterSubscription()
    }
]




// {
//     username: '',
//     email: '',
//     password: '',
//     personalDetails: {
//         firstName: '',
//         lastName: '',
//         gender: true,
//         country: '',
//         adress: '',
//         secondaryAdress: '',
//         zipCode: '' ,
//         state:'',
//         city: '',
//         postOffice: '' ,
//         phone: '' ,
//         secondaryPhone:'',
        
//     },

//    shoppingCart: new shoppingCart(),

    
//     creditCard: {
//             method: 'Mastercard',
//             number: '4387-7387-8313-5114'
//     },

//     newsLetterSubscription: new newsLetterSubscription()
// }