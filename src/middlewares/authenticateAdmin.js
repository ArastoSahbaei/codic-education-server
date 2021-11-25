import jwt from 'jsonwebtoken'
import StatusCode from '../../configurations/StatusCode.js'
import UserModel from '../models/User.model.js'

export const authenticateAdmin = async (request, response, next) => {
    const header = request.headers['authorization']
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ')
        const token = bearer[1]
        const verified = jwt.verify(token, 'jwtSecret.secret')
        const isCorrectUser = request.body.id && request.body.id === verified.id
        const user = await UserModel.findById(request.body.id)
        const isAdminUser = user.role === 'admin'
        if (isCorrectUser && isAdminUser) {
            next()
        } else {
            response.sendStatus(StatusCode.FORBIDDEN)
        }
    } else {
        response.sendStatus(StatusCode.FORBIDDEN)
    }
}