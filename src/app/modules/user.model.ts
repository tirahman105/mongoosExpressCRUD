import { Schema, model } from 'mongoose';
import {
  TFullAddress,
  TFullName,
  TUser,
  UserMethods,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const fullAddressSchema = new Schema<TFullAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: { type: Number, required: [true, 'ID is required'], unique: true },
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: [true, 'ID is required'], unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: fullAddressSchema,
});

//pre save middleware /hook
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: will save data');
  // hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware / hook
userSchema.post('save', function () {
  console.log(this, 'post hook: saved the data');
});

userSchema.methods.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
