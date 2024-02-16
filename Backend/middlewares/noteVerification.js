const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, async (error, decode) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Token not verified Login Again",
      });
    }
    if (decode) {
      req.body.user = decode.userId;
      console.log("greate", req.body.user);
      next();
    } else {
      return res.status(500).send({
        success: false,
        message: "Token not verified Login Again",
      });
    }
  });
};

const validateBody = (req, res, next) => {
  const { title, content } = req.body;

  // Check if title and content are provided
  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  // Check title length
  if (title.length < 5 || title.length > 100) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Title must be between 5 and 100 characters long",
      });
  }
  if (content.length < 10 || content.length > 1000) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Content must be between 10 and 1000 characters long",
      });
  }

  next();
};

module.exports = { authenticator ,validateBody};
