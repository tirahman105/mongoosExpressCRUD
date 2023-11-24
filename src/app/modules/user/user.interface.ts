// import { Schema, model, connect } from 'mongoose';

import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TFullAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TFullAddress;
};

export type UserMethods = {
  isUserExists(userId: number): Promise<TUser | null>;
};

export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
