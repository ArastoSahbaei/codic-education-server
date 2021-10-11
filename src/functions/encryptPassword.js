import bcrypt from 'bcrypt'

export const encryptPassword = (password) => {
	const BCRYPT_SALT_ROUNDS = 12 //TODO: Change this for secret variable
	const hashedPassword = bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
	return hashedPassword
}