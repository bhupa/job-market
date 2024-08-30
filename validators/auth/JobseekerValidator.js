const { body } = require("express-validator");
const User = require("../../models/User");

const jobseekerValidators = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Last name should be a string"),
  body("about_ja")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("About (Japanese) should be a string"),
  body("profile_img")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Profile image should be a string"),
  body("birthday")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage("Birthday should be a valid date"),
  body("gender")
    .optional({ checkFalsy: true })
    .isIn(["1", "2", "3"])
    .withMessage("Invalid gender value"),
  body("country")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Country should be a string"),
  body("current_country")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Current country should be a string"),
  body("occupation")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("Occupation should be an integer"),
  body("experience")
    .optional({ checkFalsy: true })
    .isIn(["1", "2", "3", "4"])
    .withMessage("Invalid experience value"),
  body("japanese_level")
    .optional({ checkFalsy: true })
    .isIn(["1", "2", "3", "4", "5"])
    .withMessage("Invalid Japanese level value"),
  body("about")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("About should be a string"),
  body("employment_status")
    .optional({ checkFalsy: true })
    .isIn(["1", "2", "3", "4"])
    .withMessage("Invalid employment status value"),
  body("job_type")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("Job type should be an integer"),
  body("living_japan")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("Living in Japan should be an integer"),
  body("is_verify")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("Is verify should be an integer"),
  body("start_when")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage("Start when should be a valid date"),
];

module.exports = { jobseekerValidators };
