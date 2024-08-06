import { login, register } from '../../services/auth'

export const renderAuthPage = (req, res) => {
  if (req.cookies.isLogin) handleLogout(req, res)
  else
    res.render('customer/loginRegister', {
      title: 'Login/Register',
      result: '',
      isLogin: req.cookies.isLogin,
      isAdmin: req.cookies.isAdmin,
    })
}

export const handleRegister = async (req, res) => {
  const result = await register(req.body)
  res.render('customer/loginRegister', {
    title: 'Login/Register',
    result,
    isLogin: req.cookies.isLogin,
    isAdmin: req.cookies.isAdmin,
  })
}

export const handleLogin = async (req, res) => {
  const result = await login(req.body, res)
  if (result === 'Wrong email or password')
    res.render('customer/loginRegister', {
      title: 'Login/Register',
      result,
      isLogin: req.cookies.isLogin,
      isAdmin: req.cookies.isAdmin,
    })
}

export const handleLogout = (req, res) => {
  res.clearCookie('user')
  res.clearCookie('isLogin')
  res.clearCookie('isAdmin')
  res.redirect('/')
}
