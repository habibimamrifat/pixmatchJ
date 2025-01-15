import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<Tuser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  const existingUser = await userModel.findOne({ email: user.email });
  if (existingUser) {
    const error = new Error("Email already exists");
    return next(error);
  }
  next();
});

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.BcryptSalt));

  next();
});

const userModel = model("User", userSchema);
export default userModel;
