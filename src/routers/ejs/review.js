import express from 'express'
import { handleAddReview } from '../../controllers/ejs/review'

const router = express.Router()

router.post('/review', handleAddReview)

export default router
