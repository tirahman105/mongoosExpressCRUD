import { Request, Response } from 'express';
import { UserServices } from './user.service';

import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // data validation using zod

    const zodParsedData = UserValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully ',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully ',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numaricUserId = parseInt(userId);
    const result = await UserServices.getSingleUserFromDB(numaricUserId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `User Data of id:${numaricUserId} is not found `,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Single User fetched successfully! ',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getUpdateUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const numaricUserId = parseInt(userId);
    const result = await UserServices.updateUserFromDB(numaricUserId, userData);
    res.status(200).json({
      success: true,
      message: 'Users updated successfully ',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numaricUserId = parseInt(userId);
    const result = await UserServices.deleteUserFromDB(numaricUserId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `User Data of id:${numaricUserId} is not found `,
      });
    }
    res.status(200).json({
      success: true,
      message: 'User deleted successfully! ',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUpdateUsers,
  deleteUser,
};
