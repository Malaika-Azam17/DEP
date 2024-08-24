import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// get all blogs function
export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    }
    catch (error) {
        console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({ message: "NO BLOG AVAILABLE" });

    }
    return res.status(200).json({ blogs })
}


// for adding blog
export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try{
        existingUser=await User.findById(user);

    }
    catch(error){
        return console.log(error);
    }
    if(!existingUser){
        return res.status(400).json({message:"User is Not Found by this Id"});
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error});
    }
    return res.status(200).json({ blog })
};

// for updating blog
export const updateBlog=async(req,res,next)=>{
    const {title,description}=req.body;
    const blogID=req.params.id;
    let blog;
    if (!isValidObjectId(blogID)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }
    try{
        blog = await Blog.findByIdAndUpdate(blogID,{
            title,
            description
        })
    }catch(error){
        return console.log(error);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to Update the Blog :( "})
    }
   return res.status(200).json({blog});

}


export const getById=async(req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
        blog= await Blog.findById(id);
    }
    catch(error){
        return console.log(error);
    }
    if(!blog){
       return res.status(404).json({message:"Blog Not Found :("})
    }
    return res.status(200).json({blog})
}

// delete blog
export const deleteBlog=async(req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndDelete(id);
    }
    catch(error){
        return console.log(error);
    }
    if(!blog){
        return res.status(500).json({message:"Blog is Unable to Delete :( "})
    }
    return res.status(200).json({message:"Blog Successfully Deleted :) "})
}

export const getByUserId=async(req,res,next)=>{

    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");

    }
    catch(error){
        return console.log(error);
    }
    if(!userBlogs){
return res.status(404).json({message:"No Blog Available :( "});

    }
    return res.status(200).json({user:userBlogs})
}