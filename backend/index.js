const express = require('express');
const { createSignup } = require("./db");
const { signup } = require("./db");
const app = express();

app.use(express.json());

// Creating a user
app.post("/signup", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createSignup.safeParse(createPayload);

    if (!parsedPayload.success) {
        // Log the Zod validation errors for debugging
        console.log(parsedPayload.error.errors);
        
        res.status(400).json({
            msg: "These are wrong inputs",
            errors: parsedPayload.error.errors, // Provide detailed error information
        });
        return;
    }

    try {
        await signup.create({
            firstName: createPayload.firstName,
            lastName: createPayload.lastName,
            number: createPayload.number,
            username: createPayload.username,
            email: createPayload.email,
            password: createPayload.password,
        });
        res.json({
            msg: "Account signup successful!",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete a user
app.delete("/username/:username", async (req, res) => {
  const { username } = req.params;

  try{
    const deletedSignup = await signup.findOneAndDelete({ username });
  

    if (!deletedSignup) {
        return res.status(404).json({ message: "User does not exist"});
    }

    res.json({ message: "User deleted successfully!", deletedSignup });
} catch (error) {
    res.status(500).json({ message: error.message }); // Handling errors
}
});


app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
