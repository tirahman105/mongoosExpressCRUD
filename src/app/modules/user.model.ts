import { Schema, model } from 'mongoose';
import {
  TFullAddress,
  TFullName,
  TUser,
  UserMethods,
  UserModel,
} from './user/user.interface';

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

userSchema.methods.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
