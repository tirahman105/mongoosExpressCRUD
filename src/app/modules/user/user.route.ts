import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.getUpdateUsers);
router.delete('/:userId', UserControllers.deleteUser);
router.put('/:userId/orders', UserControllers.addProductToOrder);
router.get('/:userId/orders', UserControllers.getAllOrdersForUser);
router.get(
  '/:userId/orders/total-price',
  UserControllers.totalPriceOfSingleUserOrdersController,
);

export const UserRoutes = router;
