import conversation from "../Model/conversation.model.js";
import message from "../Model/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let Conversation = await conversation.findOne({
      participates: { $all: [senderId, receiverId] },
    });

    if (!Conversation) {
      Conversation = await conversation.create({
        participates: [senderId, receiverId],
      });
    }

    const newMessage = new message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      Conversation.message.push(newMessage._id);
    }

    await Conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
