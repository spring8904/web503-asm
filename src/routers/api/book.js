import express from 'express'
import {
  createBookWithAPI,
  deleteBookWithAPI,
  getBookByIdWithAPI,
  getBooksWithAPI,
  searchBookWithAPI,
  updateBookWithAPI,
} from '../../controllers/api/book'

const router = express.Router()

router.get('/books', getBooksWithAPI)

router.get('/books/search', searchBookWithAPI)

router.get('/books/:id', getBookByIdWithAPI)

router.post('/books', createBookWithAPI)

router.put('/books/:id', updateBookWithAPI)

router.delete('/books/:id', deleteBookWithAPI)

export default router
