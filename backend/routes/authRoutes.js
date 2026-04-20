import express from 'express';
import { registerUser, loginUser, getUserProfile, deleteUserAccount, updateUserProfile, updateUserPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.delete('/profile', protect, deleteUserAccount);
router.put('/profile', protect, updateUserProfile);
router.put('/password', protect, updateUserPassword);

export default router;
