const router = require('express').Router();
const { login, register} = require("../controllers/AuthController");
const { validationResult } = require("express-validator")
const { loginValidator, registerValidator} = require("../validators/AuthValidator")

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = {};
        errors.array().forEach(error => {
            errorMessages[error.path] = error.msg;
        })
        return res.status(400).send({message: errorMessages}); 
    }
    next();
}

router.post("/login", loginValidator, handleValidationErrors, login);
router.post("/register", registerValidator, handleValidationErrors, register);

module.exports = router;