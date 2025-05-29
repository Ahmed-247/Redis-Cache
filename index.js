import express from "express";
import mongoose from "mongoose";
import router from "./routes/notesRoutes.js";
import dotenv from "dotenv";
dotenv.config()


const app =express();
app.use(express.json());

mongoose.connect(process.env.mongourl);

mongoose.connection.once("connected", ()=> console.log("Connected"))
mongoose.connection.on("err", ()=> console.log("failed"))

app.use("/", router)

app.listen(process.env.port, ()=> console.log(`listeing on ${process.env.port}`))