const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);