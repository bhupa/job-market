const { body } = require("express-validator");
const User = require("../../models/User");
const { companyValidators } = require("./CompanyValidator");
const { jobseekerValidators } = require("./JobseekerValidator");
const validate = require("../../middleware/validate");

const registerUserValidators = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body("user_type")
    .isIn(["company", "jobseeker"])
    .withMessage("Invalid user type")
    .custom(async (value, { req }) => {
      if (value === "company") {
        for (const validator of companyValidators) {
          const result = await validator.run(req);
          if (!result.isEmpty()) throw result.array()[0];
        }
      }
      if (value === "jobseeker") {
        for (const validator of jobseekerValidators) {
          const result = await validator.run(req);
          if (!result.isEmpty()) throw result.array()[0];
        }
      }
    }),
  // body('user_type')
  //     .isIn(['company', 'jobseeker'])
  //     .withMessage('Invalid user type'),
  //Conditionally apply additional validators based on user_type
  // async (req, res, next) => {
  //     if (req.body.user_type === 'company') {
  //         await validate(companyValidators)(req, res, next);
  //     } else if (req.body.user_type === 'jobseeker') {
  //         await validate(jobseekerValidators)(req, res, next);
  //     } else {

  //         next();
  //     }
  // }
];

module.exports = { registerUserValidators };
