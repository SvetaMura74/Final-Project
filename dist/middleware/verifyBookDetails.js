import _ from "underscore";
import { bookDetailsValidationSchema } from "../validators/book_validator.js";
const validateBookDetails = (req, res, next) => {
    const body = _.pick(req.body, "book_id", "position", "name", "author", "cover", "rating", "description", "genres");
    const { error } = bookDetailsValidationSchema.validate(body);
    if (error) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: error.details.map((ed) => ed.message),
        });
    }
    next();
};
export { validateBookDetails };
