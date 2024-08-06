import express from 'express'
import {
  handleLogin,
  handleLogout,
  handleRegister,
  renderAuthPage,
} from '../../controllers/ejs/auth'

const router = express.Router()

// ejs
router.get('/register', renderAuthPage)
router.post('/register', handleRegister)

router.get('/login', renderAuthPage)
router.post('/login', handleLogin)

router.get('/logout', handleLogout)

export default router
