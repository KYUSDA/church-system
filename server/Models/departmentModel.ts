import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


const departmentDetails = new Schema({
  name: {
    type: String,
    required: [true, "please enter the department name"],
  },
  elder: {
    type: String,
    required: [true, "please enter elder in charge"],
  },
  event: {
    type: String,
  },
  head: {
    type: String,
    required: [true, "please enter head in charge of the department"],
  },
  project: {
    type: String,
  },
});

const departmentModel = model("department", departmentDetails);
export default departmentModel;
