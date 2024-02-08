const express = require('express')
const useController = require('../controllers/userController')

const router = express.Router()

router.post('/api/users', userController.createUser)
router.post('/api/users/login', userController.loginUser)
router.get('api/users.profile', userController.getUserProfile)
router.put('/api/users/profile', userController.updateUserProfile)


module.exports = router