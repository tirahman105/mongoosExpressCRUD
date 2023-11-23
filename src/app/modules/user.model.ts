import { Schema, model, connect } from 'mongoose';
import { FullAddress, FullName, User } from './user/user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const fullAddressSchema = new Schema<FullAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: fullAddressSchema,
});

export const UserModel = model<User>('User', userSchema);
