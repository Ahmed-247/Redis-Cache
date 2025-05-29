import express from "express";
import notesModel from "../models/notesModel.js";
import {cache, clearCache} from "../middleware/redisMiddleware.js";

const router = express.Router();

router.get("/notes", cache((req)=> req.originalUrl), async(req, res)=>{
    
    res.json(await notesModel.find())
})

router.get("/notes/:id", cache((req)=> req.originalUrl), async(req, res)=>{
    res.json(await notesModel.findById(req.params.id))
})

router.post("/notes", clearCache, async(req, res)=>{
  
    res.json(await notesModel.create(req.body))
})

router.put("/notes/:id", clearCache, async(req, res)=>{
    res.json(await notesModel.findByIdAndUpdate(req.params.id, req.body, {new:true}))
})

export default router