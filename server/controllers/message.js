import Conversation from "../models/conversation.js";
import Message from "../models/messages.js";

export const createMessage = async (req, res, next) => {
  const conversationId = req.params.conversationid;
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    try {
      await Conversation.findByIdAndUpdate(conversationId, {
        $push: { messages: savedMessage._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMessage);
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  const conversationId = req.params.conversationid;
  try {
    await Message.findByIdAndDelete(req.params.id);
    try {
      await Conversation.findByIdAndUpdate(conversationId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Message has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
