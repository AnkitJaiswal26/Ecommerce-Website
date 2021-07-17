const express = require("express");
const {
  registerController,
  activationController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/auth.controller");
const router = express.Router();
const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("username", "Username is required")
      .notEmpty()
      .isLength({
        min: 6,
        max: 20,
      })
      .withMessage("Username must be between 6 to 20 characters"),
    check("email").isEmail().withMessage("Email is not valid"),
    check("password", "password is required").notEmpty(),
    check("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must contain atleast 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],
  registerController
);

router.post("/activation", activationController);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email is not valid"),
    check("password", "Password is required").notEmpty(),
  ],
  loginController
);

router.put(
  "/forgotPassword",
  [check("email").not().isEmpty().isEmail().withMessage("Email is not valid")],
  forgotPasswordController
);

router.put(
  "/resetPassword",
  [
    check("newPassword")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Password must be at least  6 characters long"),
  ],
  resetPasswordController
);

module.exports = router;
