import mongoose from "mongoose";
const ConversationSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    imageAlt: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    latestMessageText: {
      type: String,
    },
    messages: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
