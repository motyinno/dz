import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  patchUser, 
  deleteUser,
  validateUserInput
} from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Protected routes (require authentication)
router.post('/', authMiddleware, validateUserInput, createUser);
router.put('/:id', authMiddleware, validateUserInput, updateUser);
router.patch('/:id', authMiddleware, patchUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
