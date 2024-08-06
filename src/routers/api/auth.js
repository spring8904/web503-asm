import express from 'express'
import { loginWithAPI, registerWithAPI } from '../../controllers/api/auth'

const router = express.Router()

router.post('/auth/register', registerWithAPI)
router.post('/auth/login', loginWithAPI)

export default router
