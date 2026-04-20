import express from 'express';
import { getAiInsights, getChatHistory } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, getAiInsights);
router.get('/history', protect, getChatHistory);

export default router;
