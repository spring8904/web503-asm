import { getUserByEmail } from '../../services/auth'
import { getReviewAndReviewer, addReview } from '../../services/review'

export const handleAddReview = async (req, res) => {
  const user = await getUserByEmail(req.cookies.user.email)

  const data = {
    book: req.body.bookId,
    user: user.id,
    rating: req.body.rating,
    comment: req.body.comment,
  }

  const reviews = await getReviewAndReviewer(req.body.bookId)
  const isReviewed = reviews.find(
    (review) => review.email === req.cookies.user.email,
  )

  if (data.rating && !isReviewed) {
    addReview(data)
  }

  res.redirect('/single-book/' + req.body.bookId)
}
