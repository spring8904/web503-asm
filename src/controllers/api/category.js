import { categorySchema } from '../../schemas/category'
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategory,
} from '../../services/category'

export const getCategoriesWithAPI = async (req, res) => {
  try {
    const data = await getAllCategories()
    if (data.length <= 0) {
      return res.status(404).json('No book found')
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getCategoryByIdWithAPI = async (req, res) => {
  try {
    const data = await getCategory(req.params.id)
    if (!data) {
      return res.status(404).json('Category not found')
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const createCategoryWithAPI = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body, { abortEarly: false })

    if (error) {
      const message = error.details.map((err) => err.message)
      return res.status(400).json(message)
    }

    const data = await addCategory(req.body)
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const updateCategoryWithAPI = async (req, res) => {
  try {
    const data = await editCategory({ ...req.body, id: req.params.id })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const deleteCategoryWithAPI = async (req, res) => {
  try {
    const data = await deleteCategory(req.params.id)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
