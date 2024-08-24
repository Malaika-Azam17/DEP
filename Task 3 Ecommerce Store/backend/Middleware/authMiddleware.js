import JWT from "jsonwebtoken";
import userModal from "../modal/userModal.js";

export const requireSignIn = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ success: false, message: "No token provided" });
      }
  
      const token = authHeader.split(" ")[1];
      const decode = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ success: false, message: "Invalid token" });
    }
  };

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};