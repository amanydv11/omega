import express from 'express'
import { google, login, signout, signup } from '../controller/authController.js';

const router = express.Router();

router.post('/login',login);
router.post('/signup',signup)
router.post('/signout',signout)
router.post('/google',google)
export default router;