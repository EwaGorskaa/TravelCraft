const { body } = require("express-validator");

const loginValidator = [
    body("emailOrUsername").notEmpty().withMessage("Podaj email lub nazwę użytkownika"),
    body("password").notEmpty().withMessage("Podaj hasło")
];

const registerValidator = [
    body("username").notEmpty().withMessage("Podaj nazwę użytkownika").isLength({min: 3}).withMessage("Nazwa użytkownika musi mieć co najmniej 3 znaki"),
    body("email").isEmail().withMessage("Podaj poprawny adres email"),
    body("password").notEmpty().withMessage("Podaj hasło").isLength({min: 8}).withMessage("Hasło musi mieć co najmniej 8 znaków")
];

module.exports = {
    loginValidator,
    registerValidator
};