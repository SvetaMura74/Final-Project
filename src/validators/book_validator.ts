import joi from 'joi'
import { urlRegex } from './utils.js';
const bSchema = joi.object({
  book_id: joi.string().min(2).max(30).required(),
  position: joi.string().min(0).max(30).required(),
  name: joi.string().min(2).max(100).required(),
  author: joi.string().min(2).max(100).required(),
  cover: joi
    .string()
    .regex(urlRegex),
  rating: joi.number().min(0),
  description: joi.string().min(10).required(),
  genres: joi.string().min(5).max(40).required(),
});
export {bSchema}
