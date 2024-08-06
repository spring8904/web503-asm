import Category from '../models/Category'

export const getAllCategories = async () => await Category.find()

export const getCategory = async (id) => await Category.findById(id)

export const addCategory = async (data) => await Category.create(data)

export const editCategory = async ({ id, ...data }) =>
  await Category.findByIdAndUpdate(id, data, { new: true })

export const deleteCategory = async (id) => await Category.findByIdAndDelete(id)
