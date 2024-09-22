import { v4 as uuidv4 } from "uuid";
import mongoose, { Document, Schema } from "mongoose";

interface IEmployee extends Document {
  f_Id: string;
  f_image: string;
  f_name: string;
  f_email: string;
  f_mobile_no: string;
  f_designation: string;
  f_gender: string;
  f_course: string[];
  f_created_date: Date;
}

const EmployeeSchema: Schema = new Schema({
  f_Id: {
    type: String,
    unique: true,
    default: uuidv4, // Autogenerate unique ID using uuid
  },
  f_image: {
    type: String,
    required: false,
  },
  f_name: {
    type: String,
    required: true,
    trim: true,
  },
  f_email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  f_mobile_no: {
    type: String,
    required: true,
    trim: true,
  },
  f_designation: {
    type: String,
    required: true,
    trim: true,
  },
  f_gender: {
    type: String,
    required: true,
    trim: true,
  },
  f_course: {
    type: [String],
    required: true,
    trim: true,
  },
  f_created_date: {
    type: Date,
    default: Date.now, // Set default to the current date
  },
});

// Export the model
const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
export default Employee;
