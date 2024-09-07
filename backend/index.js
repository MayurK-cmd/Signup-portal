const express = require('express');
const { createSignup } = require('./types'); // Import Zod schema
const { Signup } = require('./db'); // Import Mongoose model

const app = express();

app.use(express.json());


// Signup route
app.post('/signup', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createSignup.safeParse(createPayload);

    if (!parsedPayload.success) {
        console.log("Validation errors:", parsedPayload.error.errors);
        return res.status(400).json({
            msg: "These are wrong inputs",
            errors: parsedPayload.error.errors
        });
    }

    try {
        const user = new Signup(createPayload);
        await user.save();
        res.json({ msg: "Account signup successful!" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "Username and password are required" });
    }

    try {
        // Find the user by username
        const user = await Signup.findOne({ username });
        if (!user) {
            // Username not found
            return res.status(404).json({ msg: "Username does not match" });
        }

        // Compare provided password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            // Incorrect password
            return res.status(400).json({ msg: "Incorrect password" });
        }

        // Successful login
        res.json({ msg: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error); // Log detailed error
        res.status(500).json({ message: error.message });
    }
});


// Delete a user
app.delete('/username/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const deletedSignup = await Signup.findOneAndDelete({ username });

        if (!deletedSignup) {
            return res.status(404).json({ message: "User does not exist" });
        }

        res.json({ message: "User deleted successfully!", deletedSignup });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: error.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
