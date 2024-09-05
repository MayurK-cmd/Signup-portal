
const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect("YOURMONGODBURL")

// Define the schema
const signupSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    number: Number,
    username: String,  
    email: String,
    password: String
});

// Create the model
const Signup = mongoose.model('Signup', signupSchema);

module.exports = {
   signup: Signup
};

