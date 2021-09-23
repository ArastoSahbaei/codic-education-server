import NewsLetterSubscriptionModel from "../../../src/models/NewsLetterSubscription.model.js"

export const newsLetterSubscriptionData = [
	{
		email: 'ac@felis.net',
		receiveNewsLetters: true
	},
	{
		email: 'lorem@massavestibulum.co.uk',
		receiveNewsLetters: true
	},
	{
		email: 'quisque.fringilla@orci.net',
		receiveNewsLetters: true
	},
	{
		email: 'orci.luctus.et@maurisut.ca',
		receiveNewsLetters: true
	},
	{
		email: 'fringilla.ornare@cursusluctus.co.uk',
		receiveNewsLetters: true
	},
	{
		email: 'donec@ipsumprimis.ca',
		receiveNewsLetters: true
	},
	{
		email: 'dui.nec@laoreetposuere.edu',
		receiveNewsLetters: true
	},
	{
		email: 'integer.eu.lacus@feugiatplacerat.org',
		receiveNewsLetters: true
	},
	{
		email: 'lectus.nullam.suscipit@vulputate.com',
		receiveNewsLetters: true
	},
	{
		email: 'laoreet.libero@duisdignissim.com',
		receiveNewsLetters: true
	},
]

export const populateNewsLetterSubscriptions = () => {
	newsLetterSubscriptionData.forEach(newsLetterSubscription => {
		try {
			NewsLetterSubscriptionModel.insertMany(newsLetterSubscription)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
}