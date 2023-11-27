const jwt = require('jsonwebtoken')
const CustomerAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => {
    const { username, password } = req.body

    // mongoose validation
    // Joi
    // check in the controller(following)
    if (!username || !password) {
        throw new CustomerAPIError('Please provide username and password', StatusCodes.BAD_REQUEST)
    }

    // just for simplification, normally provided by DB!!
    const id = new Date().getDate()

    // try to keep payload small, better experience for user
    // for secret key, use long, complex and unguessable string value in production
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(StatusCodes.OK).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(StatusCodes.OK).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = {
    login,
    dashboard
}