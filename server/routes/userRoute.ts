import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { signup,login,getUser,logout } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/get-user', authMiddleware,getUser);


export default router;
