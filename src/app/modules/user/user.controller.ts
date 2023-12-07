/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';

import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

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

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
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

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numericUserId = parseInt(userId);
    const orders = await UserServices.getAllOrdersForUser(numericUserId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
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

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `User Data  is not found `,
      });
    }

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
    const userIdParam = req.params.userId;
    const userId = Number(userIdParam);
    await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (err: any) {
    if (err.status) {
      res.status(err.status).json({
        success: false,
        message: err.message,
        error: err.error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};

// const addProductToOrder = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const orderData = req.body;

//     const numericUserId = parseInt(userId);
//     const result = await UserServices.addProductToOrders(
//       numericUserId,
//       orderData,
//     );

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: `User Data of id:${numericUserId} is not found `,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Product added to orders successfully ',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const orderData = req.body;

    await UserServices.addProductToOrders(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    if (err.status) {
      res.status(err.status).json({
        success: false,
        message: err.message,
        error: err.error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  }
};
const totalPriceOfSingleUserOrdersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    const numericUserId = parseInt(userId);
    const result =
      await UserServices.totalPriceOfSingleUserOrders(numericUserId);

    res.status(200).json({
      success: true,
      message: 'Total price of orders fetched successfully',
      data: result.data,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  getAllOrdersForUser,
  getUpdateUsers,
  deleteUser,
  addProductToOrder,
  totalPriceOfSingleUserOrdersController,
};
