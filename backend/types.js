const zod = require("zod");

const createSignup = zod.object({
    firstName: zod.string().nonempty("First name is required"),
    lastName: zod.string().nonempty("Last name is required"),
    contactNumber: zod.string().nonempty("Number must be a positive integer"),
    username: zod.string().nonempty("Used to display your name for other users"),
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long")
});

module.exports = {
    createSignup,
    
};