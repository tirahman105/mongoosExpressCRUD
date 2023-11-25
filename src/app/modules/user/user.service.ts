/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../user.model';
import { TOrders, TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  // built in static method
  //   const result = await UserModel.create(user);

  const user = new User(userData); // create an instance

  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await user.save(); //   built in instance method

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password: string, ...withOutPassword } = result.toObject();
  const responseData = {
    data: withOutPassword,
  };
  return responseData;
};

// const getAllUsersFromDB = async () => {
//   const result = await User.find();
//   return result;
// };

const getAllUsersFromDB = async () => {
  try {
    const result = await User.aggregate([
      {
        $project: {
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          address: 1,
        },
      },
    ]);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to fetch users: ${error.message}`,
      error: error,
    };
  }
};

const getSingleUserFromDB = async (id: number) => {
  // const result = await User.findOne({ userId: id });

  const result = await User.aggregate([
    { $match: { userId: id } },
    {
      $project: {
        password: 0,
      },
    },
  ]);

  if (!result || result.length === 0) {
    throw new Error(`User with id ${id} not found`);
  }

  return result;
};

const getAllOrdersForUser = async (userId: number) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const orders = user.orders || [];

    return orders;
  } catch (error: any) {
    throw new Error(`Failed to get orders for the user: ${error.message}`);
  }
};

const updateUserFromDB = async (id: number, userData: TUser) => {
  const result = await User.findOneAndUpdate({ userId: id }, userData, {
    new: true,
    runValidators: true,
    select: { password: 0 },
  });
  return result;
};

const deleteUserFromDB = async (id: number) => {
  const result = await User.updateOne({ userId: id }, { isDeleted: true });
  return result;
};

const addProductToOrders = async (userId: number, order: TOrders) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    // Check if the 'orders' property already exists for the user
    if (!user.orders) {
      user.orders = [] as TOrders[];
    }

    const result = await User.updateOne({ userId }, [
      {
        $set: {
          orders: {
            $concatArrays: ['$orders', [order]],
          },
        },
      },
    ]);
    return result;
  } catch (error: any) {
    throw new Error(`Failed to add product to orders: ${error.message}`);
  }
};

// cost of single user orders
const totalPriceOfSingleUserOrders = async (userId: number) => {
  const existingUser = await User.findOne({ userId });
  if (!existingUser) {
    throw new Error('User ID not exists');
  }

  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $addFields: {
        'orders.totalPrice': {
          $multiply: ['$orders.price', '$orders.quantity'],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$orders.totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getAllOrdersForUser,
  deleteUserFromDB,
  updateUserFromDB,
  addProductToOrders,
  totalPriceOfSingleUserOrders,
};
