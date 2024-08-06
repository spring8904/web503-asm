import express from 'express'
import {
  createCategoryWithAPI,
  deleteCategoryWithAPI,
  getCategoryByIdWithAPI,
  getCategoriesWithAPI,
  updateCategoryWithAPI,
} from '../../controllers/api/category'

const router = express.Router()

router.get('/categories', getCategoriesWithAPI)

router.get('/categories/:id', getCategoryByIdWithAPI)

router.post('/categories', createCategoryWithAPI)

router.put('/categories/:id', updateCategoryWithAPI)

router.delete('/categories/:id', deleteCategoryWithAPI)

export default router
