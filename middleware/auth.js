const jwt = require('jsonwebtoken')
const CustomerAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomerAPIError('No token provided', StatusCodes.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        throw new CustomerAPIError('Not authorized to access this route', StatusCodes.UNAUTHORIZED)
    }
}

module.exports = authenticate