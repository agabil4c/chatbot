import mongoose from "mongoose";
const MessagesSchema = new mongoose.Schema(
  {
    conversationID: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    imageAlt: {
      type: String,
    },
    messageText: {
      type: String,
      required: true,
    },
    isMyMessage: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessagesSchema);
