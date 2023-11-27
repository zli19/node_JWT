const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')
const authenticate = require('../middleware/auth')

router.route('/dashboard').get(authenticate, dashboard)
router.route('/login').post(login)

module.exports = router