const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    // Add other company-specific fields here
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
