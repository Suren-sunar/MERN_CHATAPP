import Jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
  const Token = Jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "15d",
  });

  res.cookie("jwt", Token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //ms
    httpOnly: true, // prevent xxs attack crosssite scripting attack
    sameSite: "strict", //CSRF attack cross site  request forgery attack
  });
};

export default generateTokenAndSetCookies;
