const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect("")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("Connection error:", err));

// Define the signup schema
const signupSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true }, // Use JavaScript's Number type here
  email: { type: String, required: true },
});

// Hash the password before saving the user
signupSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10); // Hash the password
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Method to compare passwords using bcrypt
signupSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compare the password using bcrypt
};

const Signup = mongoose.model('Signup', signupSchema);

module.exports = { Signup };
