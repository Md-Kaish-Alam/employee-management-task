import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  f_sno: number;
  f_username: string;
  f_password: string;
}

// Schema for the user model
const UserSchema: Schema<IUser> = new Schema({
  f_sno: {
    type: Number,
    unique: true,
    required: false,
    auto: true,
  },
  f_username: {
    type: String,
    required: true,
    unique: true,
  },
  f_password: {
    type: String,
    required: true,
  },
});

// Add a pre-save hook to auto-generate f_sno if not present
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.f_sno) {
    const lastUser = await User.findOne({}, {}, { sort: { f_sno: -1 } });
    this.f_sno = lastUser ? lastUser.f_sno + 1 : 1; // Auto increment f_sno
  }
  next();
});

// Create and export the user model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
