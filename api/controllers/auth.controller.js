import User from "../models/UserModel.js";
import bcryptjs from 'bcrypt'
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const HashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({ username, email, password: HashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // Handle other potential errors
        next(error)
    }
};
