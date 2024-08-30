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

userSchema.statics.fetchUserData = async function (id) {
    try {
      const user = await this.findById(id).lean();
  
      if (!user) throw new Error('User not found');
  
      let populatedUser;
  
      if (user.user_type === 'company') {
        populatedUser = await this.findById(id).populate('company').lean().exec();
      } else if (user.user_type === 'jobseeker') {
        populatedUser = await this.findById(id).populate('jobseeker').lean().exec();
      } else {
        populatedUser = user; // Return the plain user if no user_type matches
      }
  
      return populatedUser;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error; // Re-throw error for handling by the caller
    }
  };
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
