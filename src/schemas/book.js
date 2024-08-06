import Joi from 'joi'

export const bookSchema = Joi.object({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  year: Joi.number()
    .greater(1800 - 1)
    .less(2024 + 1)
    .required(),
  quantity: Joi.number().greater(0).required(),
  status: Joi.string().required(),
  category: Joi.optional(),
  author: Joi.string().required(),
  description: Joi.optional(),
  thumbnail: Joi.string().required(),
})
