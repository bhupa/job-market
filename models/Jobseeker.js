const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobseekerSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    current_country: {
      type: String,
      required: true,
    },
    occupation: {
      type: Schema.Types.ObjectId,
      ref: "JobCategory",
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    japanese_level: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    is_verify: {
      type: Number,
      required: false,
    },
    profile_img: {
      type: String,
      required: true,
    },
    job_type: {
      type: Number,
      required: true,
    },
    longterm: {
      type: Number,
      required: true,
    },
    start_when: {
      type: Date,
      required: true,
    },
    intro_video: {
      type: String,
      required: false,
    },

    // Add other jobseeker-specific fields here
  },
  { timestamps: true },
);

module.exports = mongoose.model("Jobseeker", jobseekerSchema);
