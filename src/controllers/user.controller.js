import { User } from "../models/user.js";

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        
        // בדיקה אם כל השדות חובה קיימים
        if (!first_name || !last_name || !birthday || !marital_status) {
            return res.status(400).json({ message: "All fields are required: first_name, last_name, birthday, marital_status." });
        }
        
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { getUsers, createUser };
