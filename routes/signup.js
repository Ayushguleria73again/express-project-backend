const express = require('express');
const sign = express.Router();
const schema = require("../schema/schema");

sign.post('/users', async (req, res) => {
    try {
        const { name, last, age, userClass, email, phone } = req.body;
        if (!name || !last || !age || !userClass || !email || !phone) {
            return res.status(500).json({
                success: false,
                message: "please fill all the feilds"
            })
        }
        const existUser = await schema.find({ $or: [{ email: email }, { phone: phone }] })
        if (existUser.length > 0) {
            return res.status(409).json({
                sucsess: false,
                message: "email or phone allready exist"
            })
        }
        const userData = new schema({
            name,
            last,
            age,
            userClass,
            email,
            phone
        })
        const saveUserData = await userData.save()
        res.status(201).json({
            message: "User Created Successfully.",
            data: saveUserData
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = sign;
