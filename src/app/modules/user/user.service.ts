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
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  // const result = await User.findOne({ userId: id });

  const result = await User.aggregate([{ $match: { userId: id } }]);
  return result;
};

const updateUserFromDB = async (id: number, userData: TUser) => {
  const result = await User.findOneAndUpdate({ userId: id }, userData, {
    new: true,
    runValidators: true,
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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addProductToOrders,
};
