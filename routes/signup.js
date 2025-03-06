const express = require('express');
const sign = express.Router();
const schema = require("../schema/schema");
const bycrypt = require("bcryptjs")
sign.post('/users', async (req, res) => {
    try {
        const { name, last, age, userClass, email, phone, password } = req.body;
        if (!name || !last || !age || !userClass || !email || !phone || !password) {
            return res.status(500).json({
                success: false,
                message: "Please fill all the feilds"
            })
        }
        const existUser = await schema.find({ $or: [{ email: email }, { phone: phone }] })
        if (existUser.length > 0) {
            return res.status(409).json({
                sucsess: false,
                message: "Email or phone allready exist"
            })
        }
        const HashPasssword = await bycrypt.hash(req.body.password, 10)
        const userData = new schema({
            name,
            last,
            age,
            userClass,
            email,
            phone,
            password: HashPasssword
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