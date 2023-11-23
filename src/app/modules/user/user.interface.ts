// import { Schema, model, connect } from 'mongoose';

export type FullName = {
  firstName: string;
  lastName: string;
};

export type FullAddress = {
  street: string;
  city: string;
  country: string;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: FullAddress;
};
