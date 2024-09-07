const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Connect to mongodb
mongoose.connect("YOURMONGODBURI/signup")

// Define the schema
const signupSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    number: Number,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});

// Hash password before saving
signupSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare password method
signupSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Signup = mongoose.model('Signup', signupSchema);

module.exports = {
    Signup // Ensure this is exported
};
