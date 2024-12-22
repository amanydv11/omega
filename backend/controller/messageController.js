import Conversation from '../models/conversatationModel.js';
import Message from '../models/messageModel.js';
import { getReceiverSocketId } from '../socket/socket.js';
import multer from 'multer';

// Configure multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Controller to send message
export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const file = req.file ? `/uploads/${req.file.filename}` : null;

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      file, 
    });

    await Promise.all([
      newMessage.save(),
      Conversation.updateOne(
        { _id: conversation._id },
        { $push: { message: newMessage._id } } // Push the message ID into the conversation
      ),
    ]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { id: userToMessage } = req.params;
    const senderId = req.user.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToMessage] },
    }).populate("message");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.message.map((msg) => ({
      ...msg._doc,
      file: msg.file ? `${req.protocol}://${req.get("host")}${msg.file}` : null, // Attach full file URL
    }));

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
