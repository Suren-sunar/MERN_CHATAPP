import bcrypt from "bcryptjs";
import User from "../Model/user.model.js";
import generateTokenAndSetCookies from "../Utils/JwtToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // check the password with confirmPassword

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password don't match" });
    }

    // check the user
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }

    // hasing the password bcryptjs

    const salt = await bcrypt.genSalt(10);

    const hasedPassword = await bcrypt.hash(password, salt);

    //  the avater to the user

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // if new user create

    const newUser = new User({
      fullName,
      userName,
      password: hasedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate jwt token

      generateTokenAndSetCookies(newUser._id, res);

      // save the new user

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    // Validate input
    if (!userName || !password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  
    // Generate token and set cookies
    generateTokenAndSetCookies(user._id, res);
  
    // Respond with user information (excluding password)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
};

export const logout = (req, res) => {

  try{
    // clear the jwt token and cookiee
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logout successfully"})

  }catch (error) {
    console.error("Error in Logout", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
