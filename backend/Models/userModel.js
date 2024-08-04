const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // password hasing used in Node.js

const userSchema = new mongoose.Schema ({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true,}

}, { timestamps: true });

// Pre-save the hook to hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Compare the password entered by the user with the hashed password stored in the database
userSchema.methods.comparePassword = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model('userModel', userSchema);