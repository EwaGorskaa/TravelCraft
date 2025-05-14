const router = require("express").Router()
const bcrypt = require("bcrypt")
const { User, validate } = require("../models/User")

router.post("/", async (req, res) => {
    try{
        const { error } = validate(req.body)
        if(error){
            return res.status(400).send({ message: error.details[0].message })
        }
        const user = await User.findOne(
            { $or: [ {email: req.body.email},{username: req.body.username }]})
        if(user){
            return res.status(409).send({message: "Użytkownik o danym emailu lub nazwie użytkownika już istnieje"})
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new User({ ...req.body, password: hashPassword}).save()
        res.status(201).send({ message: "Konto zostało utworzone :)"})
    }
    catch(error){
        console.error("Błąd w rejestracji:", error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})

module.exports = router