import express from 'express'
import { verifyToken } from '../middleware/verifyUser.js';
import { deleteUser, getUsers } from '../controller/userController.js';
const router = express.Router()

router.get('/getusers',verifyToken,getUsers);
router.delete('/delete/:userId',verifyToken,deleteUser)
export default router;