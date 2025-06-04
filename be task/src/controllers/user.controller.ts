import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { body, validationResult } from 'express-validator';

const userRepository = AppDataSource.getRepository(User);

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = userRepository.create(req.body);
    const result = await userRepository.save(newUser);
    
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    
    return res.json(result);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Partially update user
export const patchUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    
    return res.json(result);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await userRepository.remove(user);
    
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Validation middleware
export const validateUserInput = [
  body('name').notEmpty().withMessage('Name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('address').isObject().withMessage('Address must be an object'),
  body('address.street').notEmpty().withMessage('Street is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.zipcode').notEmpty().withMessage('Zipcode is required'),
  body('address.geo').isObject().withMessage('Geo must be an object'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('website').notEmpty().withMessage('Website is required'),
  body('company').isObject().withMessage('Company must be an object'),
  body('company.name').notEmpty().withMessage('Company name is required')
];
