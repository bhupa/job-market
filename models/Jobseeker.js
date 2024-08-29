const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobseekerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    // Add other jobseeker-specific fields here
}, { timestamps: true });

module.exports = mongoose.model('Jobseeker', jobseekerSchema);
