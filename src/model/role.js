const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: {
        type: String,
    },
    status: { 
        type: Boolean
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);