const router = require("express").Router()
const { User } = require("../models/User")
const bcrypt = require("bcrypt")
const joi = require("joi")

router.post("/", async (req, res) => {
    try{
        const { error } = validate(req.body);

        if(error){
            return res.status(400).send({ message: error.details[0].message })
        }

        const user = await User.findOne({
            $or: [{ email: req.body.emailOrUsername }, { login: req.body.emailOrUsername }]}
        )

        if(!user){
            return  res.status(401).send({ message: "Niepoprawne dane logowania"})
        }
        console.log("req.body:", req.body);
        console.log("user from DB:", user);
        const validPasswd = await bcrypt.compare(req.body.password, user.password)
        if(!validPasswd){
            return res.status(401).send({ message: "Niepoprawne dane logowania"})
        }
        const token = user.generateAuthToken();
        res.status(200).send({ message: "zalogowano"})
    }
    catch (error){
        console.log(error)
        res.status(500).send({ message: "Błąd serwera"})
    }
})

const validate = (data) => {
    const schema = joi.object({
        emailOrUsername: joi.string().required().label("Email or Username"),
        password: joi.string().required().label("Password")
    })

    return schema.validate(data);
}

module.exports = router;