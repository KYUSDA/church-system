import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


const familySchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter the department name"],
  },
  elder: {
    type: String,
    required: [true, "please enter elder in charge"],
  },
  head: {
    type: String,
    required: [true, "please enter head in charge of the department"],
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const familyModel = model("family", familySchema);
export default familyModel;
