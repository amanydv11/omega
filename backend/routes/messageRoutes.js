import express from 'express'
import { verifyToken } from '../middleware/verifyUser.js'
import { getMessage, sendMessage} from '../controller/messageController.js'
import upload from '../middleware/multer.js'

const router = express.Router()
router.post('/send/:id',upload.single('file'),verifyToken,sendMessage)
router.get('/:id',verifyToken,getMessage)

export default router