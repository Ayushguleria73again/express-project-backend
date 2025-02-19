const express = require('express');
const routes = express.Router();
const schema = require("../schema/schema")


routes.get("/data", async (req, res) => {
    try {
        const data = await schema.find()
    res.status(200).json({
        success: true,
        message: "here is the user data",
        data: data
    })
    } catch (error) {
        console.log(error);
    }
}).get("/user/:id",async (req,res)=>{
    const {id} = req.params
    try {
        const data = await schema.findById({_id:id})
        if (!data._id) {
            res.status(404).json({
                success:false,
                message:"no data found"
            })
        }
    res.status(200).json({
        success: true,
        message: "here is the user data",
        data: data
    })
    } catch (error) {
        console.log({msg:"server errorrrrrrrrrrr"});
    }
}).get("/name/:name",async (req,res)=>{
    const {name} = req.params
    try {
        const data = await schema.find({name:name})
        if (!data.name) {
            res.status(404).json({
                success:false,
                message:"no data found"
            })
        }
    res.status(200).json({
        success: true,
        message: "here is the user data",
        data: data
    })
    } catch (error) {
        console.log({msg:"server error"});
    }
}).get("/email/:email",async (req,res)=>{
    const {email} = req.params
    try {
        const data = await schema.find({email:email})
        if (!data.email) {
            res.status(404).json({
                success:false,
                message:"no data found"
            })
        }
    res.status(200).json({
        success: true,
        message: "here is the user data",
        data: data
    })
    } catch (error) {
        console.log({msg:"server error"});
    }
}).get("/Class/:userClass",async (req,res)=>{
    const {userClass} = req.params
    try {
        const data = await schema.find({userClass:userClass})
        if (!data.userClass) {
            res.status(404).json({
                success:false,
                message:"no data found"
            })
        }
    res.status(200).json({
        success: true,
        message: "here is the user data",
        data: data
    })
    } catch (error) {
        console.log({msg:"server error"});
    }
}).delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const data = await schema.findByIdAndDelete({_id:id})
        res.status(200).json({
            success:true,
            message:"user delete successfully",
            data:data
        })
    } catch (error) {
        console.log({msg:"server error"});
    }
})

module.exports = routes;