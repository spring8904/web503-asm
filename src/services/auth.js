import bcrypt from 'bcryptjs'
import User from '../models/User'

export const getUserByEmail = async (email) => await User.findOne({ email })

export const register = async (data) => {
  const user = await getUserByEmail(data.email)
  if (user) return 'Email already exists'

  if (data.password.length < 6)
    return 'Password must be at least 6 characters long'

  const hashedPassword = await bcrypt.hash(data.password, 1)

  data.role = 'user'

  await User.create({ ...data, password: hashedPassword })
  return 'Register success'
}

export const login = async (data, res) => {
  const user = await getUserByEmail(data.email)
  if (!user) return 'Wrong email or password'
  if (!(await bcrypt.compare(data.password, user.password)))
    return 'Wrong email or password'

  res.cookie('user', {
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  })

  res.cookie('isLogin', true)

  if (user.role === 'admin') {
    res.cookie('isAdmin', true)
    res.redirect('/dashboard')
  } else res.redirect('/')
}
