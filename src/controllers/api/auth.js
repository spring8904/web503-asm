import bcrypt from 'bcryptjs'
import User from '../../models/User'
import { getUserByEmail } from '../../services/auth'
import { loginSchema, registerSchema } from '../../schemas/auth'
import jwt from 'jsonwebtoken'

export const registerWithAPI = async (req, res) => {
  try {
    const { email, password } = req.body

    const { error } = registerSchema.validate(req.body, { abortEarly: false })
    if (error) {
      const message = error.details.map((err) => err.message)
      return res.status(400).json(message)
    }

    const existUser = await getUserByEmail(email)
    if (existUser) {
      return res.status(400).json('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 1)

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    })

    user.password = undefined

    return res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const loginWithAPI = async (req, res) => {
  try {
    const { email, password } = req.body

    const { error } = loginSchema.validate(req.body, { abortEarly: false })
    if (error) {
      const message = error.details.map((err) => err.message)
      return res.status(400).json(message)
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json('Incorrect email or password')
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(404).json('Incorrect email or password')
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' })

    return res.status(200).json({ accessToken: token })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
