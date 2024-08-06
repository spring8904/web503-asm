import express from 'express'
import {
  handleAddBook,
  handleDeleteBook,
  handleEditBook,
  renderAddBookPage,
  renderBookPage,
  renderEditBookPage,
  renderSingleBookPage,
} from '../../controllers/ejs/book'
import createStorage from '../../services/createStorage'
import { renderSearchPage } from '../../controllers/ejs/search'

const router = express.Router()

router.get('/', (req, res) => {
  if (req.cookies.isLogin) res.redirect('/search')
  else res.redirect('/login')
})

// ejs
router.get('/dashboard', (req, res) => {
  res.redirect('/dashboard/books')
})

router.get('/dashboard/books', renderBookPage)

router.get('/dashboard/books/add', renderAddBookPage)

const uploadBookThumbnail = createStorage('src/uploads/books')
router.post(
  '/dashboard/books/add',
  uploadBookThumbnail.single('thumbnail'),
  handleAddBook,
)
router.get('/dashboard/books/edit/:id', renderEditBookPage)

router.post(
  '/dashboard/books/edit/:id',
  uploadBookThumbnail.single('thumbnail'),
  handleEditBook,
)

router.get('/dashboard/books/delete/:id', handleDeleteBook)

router.get('/search', renderSearchPage)

router.get('/single-book/:id', renderSingleBookPage)

export default router
