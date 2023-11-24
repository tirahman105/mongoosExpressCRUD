import { User } from '../user.model';
import { TUser } from './user.interface';

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

const deleteUserFromDB = async (id: number) => {
  const result = await User.updateOne({ userId: id }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
