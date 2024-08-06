import fs from 'fs'
import {
  deleteBook,
  getAllBooks,
  getBook,
  getBookAndCategory,
  addBook,
  editBook,
} from '../../services/book'
import { getAllCategories } from '../../services/category'
import { formatDate } from '../../services/default'
import { getAverageRating, getReviewAndReviewer } from '../../services/review'

const authCheck = (req, res) => {
  if (!req.cookies.isAdmin) {
    if (req.cookies.isLogin) res.redirect('/')
    else res.redirect('/login')
    return false
  }
  return true
}

export const renderBookPage = async (req, res) => {
  if (!authCheck(req, res)) return

  const route = req.route.path
  const books = await getAllBooks()

  const allAverageRating = {}

  for (const book of books) {
    allAverageRating[book.id] = await getAverageRating(book.id)
  }

  res.render('admin/books/tableBook', {
    title: 'List Book',
    route,
    books,
    allAverageRating,
  })
}

export const renderAddBookPage = async (req, res) => {
  if (!authCheck(req, res)) return

  const route = req.route.path
  const categories = await getAllCategories()
  res.render('admin/books/addBook', { title: 'Add Book', route, categories })
}

export const handleAddBook = async (req, res) => {
  const data = req.body

  if (!data.category) data.category = null

  if (req.file) data.thumbnail = req.file.filename
  else data.thumbnail = 'blank-image.png'

  await addBook(data)

  res.redirect('/dashboard/books')
}

const deleteThumbnailBook = async (id) => {
  const book = await getBook(id)

  if (
    fs.existsSync('src/uploads/admin/books/' + book.thumbnail) &&
    book.thumbnail !== 'blank-image.png'
  ) {
    fs.unlink('src/uploads/admin/books/' + book.thumbnail, (err) => {
      if (err) throw err
    })
  }
}

export const renderEditBookPage = async (req, res) => {
  if (!authCheck(req, res)) return

  const route = req.route.path
  const categories = await getAllCategories()
  const book = await getBookAndCategory(req.params.id)

  res.render('admin/books/editBook', {
    title: 'Edit Book',
    route,
    categories,
    book,
  })
}

export const handleEditBook = async (req, res) => {
  const data = {
    ...req.body,
    id: req.params.id,
  }

  if (!data.category) data.category = null

  if (req.file) {
    data.thumbnail = req.file.filename
    deleteThumbnailBook(req.params.id)
  }

  await editBook(data)
  res.redirect('/dashboard/books')
}

export const handleDeleteBook = async (req, res) => {
  if (!authCheck(req, res)) return

  deleteThumbnailBook(req.params.id)
  await deleteBook(req.params.id)
  res.redirect('/dashboard/books')
}

export const renderSingleBookPage = async (req, res) => {
  if (!req.cookies.isLogin) return res.redirect('/login')

  const book = await getBookAndCategory(req.params.id)
  const averageRating = await getAverageRating(book.id)
  const reviews = await getReviewAndReviewer(book.id)
  const isReviewed = reviews.find(
    (review) => review.user?.email === req.cookies.user?.email,
  )
  res.render('customer/singleBook', {
    title: book.title,
    book,
    averageRating,
    isLogin: req.cookies.isLogin,
    isAdmin: req.cookies.isAdmin,
    reviews,
    formatDate,
    isReviewed,
  })
}
