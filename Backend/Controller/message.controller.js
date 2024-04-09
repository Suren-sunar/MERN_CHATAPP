import conversation from "../Model/conversation.model.js";
import Message from "../Model/message.model.js";

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

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      Conversation.message.push(newMessage._id);
    }

    // await Conversation.save();
    // await newMessage.save();


    // this will run in parallel
    await Promise.all([Conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getMessage = async (req, res)=>{
  try{

    const {id: userToChatID} = req.params
    const senderId = req.user._id

    const Conversation = await conversation.findOne({
      participates :{$all : [senderId, userToChatID]}
    }).populate("message") //Not reference but actuall message
    
    if(!Conversation) return res.status(200).json([])

      const message = Conversation.message
    
    
    res.status(200).json(message)

  }catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}