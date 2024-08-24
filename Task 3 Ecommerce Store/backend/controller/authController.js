import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../modal/userModal.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;

        // Validate input fields
        if (!name) return res.send({ message: "Name is required" });
        if (!email) return res.send({ message: "Email is required" });
        if (!password) return res.send({ message: "Password is required" });
        if (!phone) return res.send({ message: "Phone No is required" });
        if (!address) return res.send({ message: "Address is required" });
        if (!answer) return res.send({ message: "Answer is required" });
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already registered",
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);
        console.log("Hashed Password:", hashedPassword);

        // Create new user and save to database
        const user = await new userModel({
            name,
            email,
            password: hashedPassword, 
            phone,
            address,
            answer
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in registration"
        });
    }
};

// Login
export const loginController=async(req,res)=>{
try{
const {email,password}=req.body

if(!email || !password){
    return res.status(404).send({success:false,message:"Invalid Email or Password"})
}
// check user
const user=await userModel.findOne({email})
if(!user){
    return res.status(404).send({success:false,message:"Email is not Registererd"})
}
const match=await comparePassword(password,user.password)

if(!match){
    return res.status(200).send({success:false,message:"Invalid Password"})
}
// token
const token= JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",})
res.status(200).send({success:true,message:"Login successfully",user:{
  _id:user._id,
  name:user.name,
  email:user.email,
  phone:user.phone,
  address:user.address,
  role:user.role,

},token})
}

catch(error){
    console.log(error)
    res.status(500).send({success:false,message:"Error in Login"})
}
}

// forgot-password-controller
export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };


// test
export const testController=(req,res)=>{
    try{
res.send("Protected Routes")
    }
    catch(error){
        console.log(error)
}
}
// update profile
export const updateProfileController=async(req,res)=>{
  try {
    const { name, email, password, address, phone } = req.body; // Destructure req.body as an object

    const user = await userModel.findById(req.user._id);

    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and length must be at least 6 characters",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        email: email || user.email,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in updating profile",
      error,
    });
  }
}


