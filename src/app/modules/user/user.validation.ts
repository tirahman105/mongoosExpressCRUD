import { z } from 'zod';

// Define schemas for nested structures
const FullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(25),
});

const FullAddressValidationSchema = z.object({
  street: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
});

const OrderValidationSchema = z.object({
  productName: z.string().min(1).max(255),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

// Define the User schema using the nested schemas
const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(20),
  password: z.string().min(1).max(20),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1).max(255)),
  address: FullAddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
