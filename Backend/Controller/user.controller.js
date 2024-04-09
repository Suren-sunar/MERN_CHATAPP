import User from "../Model/user.model.js";

export const getUserForSlidebar = async (req, res) => {
  try {

    const loggedInUserId = req.user._id

    const allUser = await User.find().select("-password")


    res.status(200).json(allUser)


  } catch (error) {
    console.log("Error in getUserForSlidebar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
