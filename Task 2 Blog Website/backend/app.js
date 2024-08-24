import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import cors from "cors";
const app=express();
app.use(cors());

app.use(express.json())
app.use("/api/user",router);
app.use("/api/blog",blogRouter);

// for connecting to db
// create your db in moongo and then add db name Blog rest code is same only add your username and password
mongoose.connect('mongodb+srv://AddYourUsername:AddYourPassword@cluster0.7l7vcbv.mongodb.net/AddYourDatabaseName?retryWrites=true&w=majority&appName=Cluster0').then(()=>app.listen(5000)).then(()=>console.log("connectedto db")).catch((err)=>console.log(err));

