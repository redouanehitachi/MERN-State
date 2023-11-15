import User from "../models/UserModel.js";
import bcryptjs from 'bcrypt'
export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const HashedPassword = bcryptjs.hashSync(password, 10)

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // If username already exists, send an error response
            return res.status(400).json({ error: "Username already exists. Please choose a different username." });
        }

        // If the username is unique, create a new user
        const newUser = new User({ username, email, password: HashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // Handle other potential errors
        console.error("Error during signup:", error);
        res.status(500).json({ error: "An error occurred during signup. Please try again later." });
    }
};
