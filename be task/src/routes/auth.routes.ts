import { Router } from 'express';
import { 
  register, 
  login, 
  validateRegisterInput, 
  validateLoginInput 
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

export default router;
