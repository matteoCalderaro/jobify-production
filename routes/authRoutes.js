import express from 'express';
const router = express.Router();

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

import { register, login, updateUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import testUser from '../middleware/testUser.js';

// public
router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
// protected
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);

export default router;
