import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import StatusCode from './StatusCode.js'

dotenv.config()
const {
	DEV_DATABASE_URL,
	PROD_DATABASE_URL,
	PORT,
	EMAIL,
	CLIENT_ID,
	CLIENT_SECRET,
	REFRESH_TOKEN,
	ENVIROMENT
} = process.env

const connectToDatabase = async () => {
	const DATABASE_URL = ENVIROMENT === 'DEVELOPMENT' ? DEV_DATABASE_URL : PROD_DATABASE_URL
	try {
		await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
		console.log('✔️  SUCESSFULLY CONNECTED TO DATABASE..')
	} catch (error) {
		console.log('❌  ERROR OCCURED WHILE TRYING TO CONNECT TO THE DATABASE..')
		process.exit()
	}
}

const connectToPort = async (app) => {
	try {
		await app.listen(PORT || 3001, () => {
			console.log(`✔️  SERVER IS RUNNING ON PORT: ${PORT || 3001}`)
		})
	} catch (error) {
		console.log('❌  ERROR OCCURED WHILE TRYING TO CONNECT TO THE PORT..')
	}
}

const buildFrontendInProduction = () => {
	if (process.env.ENVIROMENT === "PRODUCTION") {
		application.use(express.static('client/build'))
	}
}

const sendEmail = async (databaseResponse, token) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: EMAIL,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN
		}
	})

	const mailOptions = {
		from: 'developmentwitharre@gmail.com',
		to: `${databaseResponse.email}`,
		subject: 'Link To Reset Password',
		text:
			'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
			+ 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
			+ `http://localhost:3000/reset/${token}\n\n`
			+ 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
	}

	console.log(`SENDING EMAIL TO: ${databaseResponse.email}`)

	transporter.sendMail(mailOptions, (error, response) => {
		if (error) {
			console.error('there was an error: ', error)
		} else {
			console.log('here is the response: ', response)
			response.status(StatusCode.OK).send(response)
		}
	})
}

const sendContactEmail = async (name, email, subject, message) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: EMAIL,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN
		}
	})

	const mailOptions = {
		from: 'developmentwitharre@gmail.com',
		to: 'developmentwitharre@gmail.com',
		subject: `${subject}`,
		text:
			`Name: ${name}\n\n`
			+ `Email: ${email}\n\n`
			+ `Message: ${message}\n\n`
	}

	transporter.sendMail(mailOptions, (error, response) => {
		if (error) {
			console.error('there was an error: ', error)
		} else {
			console.log('here is the response: ', response)
			response.status(StatusCode.OK).send(response)
		}
	})

}

export default {
	connectToDatabase,
	connectToPort,
	sendEmail,
	buildFrontendInProduction,
	sendContactEmail
}