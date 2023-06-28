import { Schema } from "mongoose";
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Roles",
        },
    ],
});
export { userSchema };
