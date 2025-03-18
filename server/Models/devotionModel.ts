import { model, Schema } from "mongoose";
import validator from 'validator'


const devotionSchema = new Schema({
    email:{
        type: String,
        required: [true, "please enter your email"],
        validate: [validator.isEmail, "please enter a valid email"],
        lowerCase: true,
        unique: true,
    },
    subscribed:{
        type: Boolean,
        default: true
    }
},{timestamps: true});


// model
export const devotionModel = model('devotion', devotionSchema);