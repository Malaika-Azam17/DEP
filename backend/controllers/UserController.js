
import User from "../model/User.js"; 
import bcrypt from 'bcryptjs';
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
    //    return console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
    if (!users) {
        return res.status(404).json({ message: "No users available" });
    }
    return res.status(200).json({ users });
};

// signup function

export const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }
    catch(error){
        return console.log(error);
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exist"});

    }
    const hashedpassword=bcrypt.hashSync(password);
    const user=new User({
        name,
        email,
        password:hashedpassword,
        blogs:[]
    });
    
    try{
await user.save();
    }
    catch(error){
       return  console.log(error);
    }
    return res.status(201).json({user})
}

// login function

export const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }
    catch(error){
        return console.log(error);
    }
    if(!existingUser){
        return res.status(404).json({message:"User Not Found By This Email"});

    }

    // password validation
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid Password!!"});
    }
    return res.status(200).json({message:"Login Successfully :)",user:existingUser});

}

