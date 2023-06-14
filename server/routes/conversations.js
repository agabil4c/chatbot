import {
  createConversation,
  deleteConversation,
  getConversation,
  getConversationMessages,
  getConversations,
  updateConversation,
} from "../controllers/conversation.js";
import express from "express";
const router = express.Router();

//CREATE
router.post("/", createConversation);

//UPDATE
router.put("/:id", updateConversation);
//DELETE
router.delete("/:id", deleteConversation);
//GET

router.get("/find/:id", getConversation);
//GET ALL

router.get("/", getConversations);

router.get("/conversation/:id", getConversationMessages);

export default router;
