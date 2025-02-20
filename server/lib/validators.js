import { body, validationResult, param, check, query } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");
  console.log(errorMessages);

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const newGroupValidator = () => [
  body("name", "Please Enter name").notEmpty(),
  body("members", "Please Enter Members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter chat Id").notEmpty(),
  body("members", "Please Enter Members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter chat Id").notEmpty(),
  body("userId", "Please Enter User Id ").notEmpty(),
];

const sendAttachmentsValidator = () => [
  param("id", "Please Enter chat Id").notEmpty()
];

const chatIdValidator = () => [param("id", "Please Enter chat Id").notEmpty()];

const renameValidator = () => [
  param("id", "Please Enter chat Id").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "please enter request ID").notEmpty(),
  body("accept")
    .notEmpty().withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];


const adminLoginValidator = () => [
  body("secretKey", "please enter Secret key").notEmpty(),
];



export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator
};
