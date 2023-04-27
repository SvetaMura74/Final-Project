import joi from 'joi'
import { emailRegex } from './utils.js';

const uSchema = joi.object({
  firstName: joi.string().min(2).max(30).required(),
  lastName: joi.string().min(2).max(30).required(),
  email:joi.string().regex(emailRegex).required()

});
export {uSchema}