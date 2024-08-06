import { searchBook } from '../../services/book'
import { getAverageRating } from '../../services/review'

export const renderSearchPage = async (req, res) => {
  if (!req.cookies.isLogin) return res.redirect('/login')

  const q = req.query.q || ''

  const books = await searchBook(q)

  const allAverageRating = {}

  for (const book of books) {
    allAverageRating[book.id] = await getAverageRating(book.id)
  }

  res.render('customer/search', {
    title: 'Search',
    isLogin: req.cookies.isLogin,
    isAdmin: req.cookies.isAdmin,
    books,
    allAverageRating,
    q,
  })
}
