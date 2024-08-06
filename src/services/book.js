import Book from '../models/Book'

export const getAllBooks = async () => await Book.find()

export const addBook = async (data) => await Book.create(data)

export const editBook = async ({ id, ...data }) =>
  await Book.findByIdAndUpdate(id, data, { new: true })

export const searchBook = async (q = '') =>
  await Book.find({
    $or: [
      { isbn: { $regex: q, $options: 'i' } },
      { title: { $regex: q, $options: 'i' } },
      { author: { $regex: q, $options: 'i' } },
    ],
  })

export const getBook = async (id) => await Book.findById(id)

export const deleteBook = async (id) => await Book.findByIdAndDelete(id)

export const getBookAndCategory = async (id) =>
  await Book.findById(id).populate('category')
