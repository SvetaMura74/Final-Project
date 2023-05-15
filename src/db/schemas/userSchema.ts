import mongoose, { Schema} from "mongoose";
const userSchema=new Schema({
   
    firstName:String,
    lastName:String,
    userName:String,
    email:String,
    password:String,
    roles:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Roles"
        },
    ]
})

export {userSchema}