import mongoose from "mongoose";

const conversationModel = new mongoose.Schema(
  {
    participates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  // created AT and update AT
  { timestamps: true }
);

const conversation = mongoose.model("Conversation", conversationModel);

export default conversation;
