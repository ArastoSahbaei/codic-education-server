import bcrypt from 'bcrypt'
import passport from 'passport'
import passportLocal from 'passport-local'
import UserModel from '../src/models/User.model.js'
import passportJWT from 'passport-jwt'

const localStrategy = passportLocal.Strategy
const JWTstrategy = passportLocal.Strategy
const { ExtractJwt } = passportJWT
const BCRYPT_SALT_ROUNDS = 12

const registerUserini = async () => {
	passport.use('register',
		new localStrategy(async (username, password, done) => {
			try {
				const user = await UserModel.findOne({ where: { username: username } })
				if (user != null) {
					return done(null, false, { message: 'username already taken' })
				} else {
					/* const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS) */
					/* const createdUser = await UserModel.create({ username: username, password: hashedPassword }) */
					done(null, true)
				}
			} catch (error) {
				done(error)
			}
		},
		),
	)
}

const login = () => {
	passport.use('login',
		new localStrategy((username, password, done) => {
			try {
				UserModel.findOne({ username: username })
					.then(user => {
						if (!user) {
							return done(null, false, { message: 'bad username' })
						} else {
							bcrypt.compare(password, user.password)
								.then(response => {
									if (response !== true) {
										return done(null, false, { message: 'passwords do not match' })
									}
									console.log('user found & authenticated:', user)
									// note the return needed with passport local - remove this return for passport JWT
									done(null, user)
								})
						}
					})
			} catch (err) {
				done(err)
			}
		},
		),
	)
}

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
	secretOrKey: 'jwtSecret.secret',
}

passport.use(
	'jwt',
	new JWTstrategy(opts, (jwt_payload, done) => {
		try {
			UserModel.findOne({ username: jwt_payload.id })
				.then(user => {
					if (user) {
						console.log('user found in db in passport')
						// note the return removed with passport JWT - add this return for passport local
						done(null, user)
					} else {
						console.log('user not found in db')
						done(null, false)
					}
				})
		} catch (err) {
			done(err)
		}
	}),
)

export default {
	login,
	registerUserini
}