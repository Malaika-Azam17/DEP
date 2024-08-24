import express from "express"; 
import {registerController, loginController, testController, forgotPasswordController, updateProfileController} from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../Middleware/authMiddleware.js";
const router=express.Router()
// register
router.post("/register",registerController)
// login
router.post("/login",loginController)

// protected user route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

// protected admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

// forgot password
router.post("/forgot-password",forgotPasswordController)

router.get("/test",requireSignIn,isAdmin,testController)

router.put("/profile",requireSignIn,updateProfileController)

export default router
