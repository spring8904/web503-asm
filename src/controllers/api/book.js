import { bookSchema } from '../../schemas/book'
import {
  addBook,
  deleteBook,
  editBook,
  getAllBooks,
  getBookAndCategory,
  searchBook,
} from '../../services/book'

export const getBooksWithAPI = async (req, res) => {
  try {
    const data = await getAllBooks()
    if (data.length <= 0) {
      return res.status(404).json('No book found')
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getBookByIdWithAPI = async (req, res) => {
  try {
    const data = await getBookAndCategory(req.params.id)
    if (!data) {
      return res.status(404).json('Book not found')
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const createBookWithAPI = async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body, { abortEarly: false })

    if (error) {
      const message = error.details.map((err) => err.message)
      return res.status(400).json(message)
    }

    const data = await addBook(req.body)
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const updateBookWithAPI = async (req, res) => {
  try {
    const data = await editBook({ ...req.body, id: req.params.id })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const deleteBookWithAPI = async (req, res) => {
  try {
    const data = await deleteBook(req.params.id)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const searchBookWithAPI = async (req, res) => {
  try {
    const data = await searchBook(req.query.q)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
