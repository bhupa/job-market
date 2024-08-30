const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    about_company: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    is_verify: {
      type: Number,
      required: false,
    },
    status: {
      type: Number,
      required: false,
    },

    // Add other company-specific fields here
  },
  { timestamps: true },
);

module.exports = mongoose.model("Company", companySchema);
