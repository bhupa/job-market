const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ["company", "jobseeker"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Virtuals for related documents
userSchema.virtual("company", {
  ref: "Company",
  localField: "_id",
  foreignField: "user_id",
  justOne: true,
});

userSchema.virtual("jobseeker", {
  ref: "Jobseeker",
  localField: "_id",
  foreignField: "user_id",
  justOne: true,
});
// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
