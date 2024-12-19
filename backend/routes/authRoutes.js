import express from 'express'
import { login, signout, signup } from '../controller/authController.js';

const router = express.Router();

router.post('/login',login);
router.post('/signup',signup)
router.post('/signout',signout)