import bcrypt from 'bcrypt'

export const encryptPassword = (password) => {
   const BCRYPT_SALT_ROUNDS = 12
   const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
   return hashedPassword
}