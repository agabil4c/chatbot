import Conversation from "../models/conversation.js";
import Message from "../models/messages.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation(req.body);

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const deleteConversation = async (req, res, next) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    res.status(200).json("Conversation has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  const { ...others } = req.query;
  try {
    const conversations = await Conversation.find({
      ...others,
    })
      .sort({ _id: -1 })
      .limit(req.query.limit);
    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};

export const getConversationMessages = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id).sort({
      _id: -1,
    });
    const list = await Promise.all(
      conversation.messages.map((message) => {
        return Message.findById(message);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
