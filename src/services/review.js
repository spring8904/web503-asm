import Review from '../models/Review'

export const addReview = async (data) => await Review.create(data)

export const getReviewAndReviewer = async (id) =>
  await Review.find({ book: id }).populate('user')

export const getReviewByBookIdAndReviewerId = async (bookId, reviewerId) =>
  await Review.find({ bookId, reviewerId })

export const getAverageRating = async (id) => {
  const reviews = await getReviewAndReviewer(id)
  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0)
  return Math.round(totalRating / reviews.length)
}
