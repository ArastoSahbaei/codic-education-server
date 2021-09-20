import User from "../src/models/User.model";
import newsLetterSubscription from "../src/models/NewsLetterSubscription.model";
import { Mongoose } from "mongoose";



	const subScription = new newsLetterSubscription ({
		receiveNewsLetters: true
	})
	
	subScription.save()
	
	const user = new User({
		username: 'steffy',
		email: 'steph.tronier.vip@gmail.com',
		password: '1234567',
	
		personalDetails:{
			firstName: 'Stephanie Tronier',
			lastName: 'Nörager',
			gender: true,
			country: 'Sweden',
			adress: 'Bergskroken 7',
			zipCode: '431 37',
			phone: '070-234 07 39'
		},
	
		creditCard: {
			method: 'masterCard',
			number: '0123 4567 8910 1112'
		},
	
		newsLetterSubscription: newsLetterSubscription._id
	})
	
	user.save()