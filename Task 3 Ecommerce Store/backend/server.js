import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./route/authRoute.js"
import categoryRoutes from "./route/categoryRoutes.js"
import productRoutes from "./route/productRoutes.js"
dotenv.config();
const app=express();

connectDB();

app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)

app.get("/",(req,res)=>{
res.send("<h1>welcome to ecommerce store</h1>")
})



const PORT=process.env.PORT || 8000;


app.listen(PORT,()=>{
    console.log("Server Running")
});