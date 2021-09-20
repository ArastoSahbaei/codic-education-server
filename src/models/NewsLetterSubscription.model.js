import mongoose from 'mongoose'
const { Schema } = mongoose

const newsLetterSubscription = Schema({
	email: {
		type: String,
		unique: true,
		allowNull: false,
		//required: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true,
		sparse: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		/* required: true */
	},
	receiveNewsLetters: {
		type: Boolean,
		required: true
	}
}, { timestamps: true })

const NewsLetterSubscriptionModel = mongoose.model('newslettersubscription', newsLetterSubscription)
export default NewsLetterSubscriptionModel