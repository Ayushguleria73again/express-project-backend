const express = require('express');
const sign = express.Router();
const schema = require("../schema/schema");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

sign.post('/users', async (req, res) => {
    try {
        const { name, last, age, userClass, email, phone, password , gender } = req.body;
        
        // Validate if all fields are present
        if (!name || !last || !age || !userClass || !email || !phone || !password || !gender) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        
        const validateUser = Joi.object({
            name: Joi.string().required(),
            last: Joi.string().required(),
            age: Joi.number().min(5).max(19).required(),
            userClass: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            gender: Joi.string().valid('male', 'female', 'others').required(),
            password: Joi.string().min(6).required(),
        });


        const { error } = validateUser.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

       
        const existUser = await schema.find({ $or: [{ email: email }, { phone: phone }] });
        if (existUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email or phone already exists"
            });
        }

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error hashing password"
            });
        }

        // Create new user
        const userData = new schema({
            name,
            last,
            age,
            userClass,
            email,
            phone,
            gender,
            password: hashedPassword
        });

        // Save user to the database
        const savedUserData = await userData.save();

        // Return success response
        res.status(201).json({
            message: "User Created Successfully.",
            data: savedUserData
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = sign;
