import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
  updateMessage,
} from "../controllers/message.js";

const router = express.Router();
//CREATE
router.post("/:conversationid", createMessage);

//UPDATE
router.put("/:id", updateMessage);
//DELETE
router.delete("/:id/:conversationid", deleteMessage);
//GET

router.get("/:id", getMessage);
//GET ALL

router.get("/", getMessages);

export default router;
