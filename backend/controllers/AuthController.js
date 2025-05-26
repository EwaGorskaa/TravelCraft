const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        const user = await User.findOne({$or: [{email: emailOrUsername}, {username: emailOrUsername}]});

        if(!user){
            return res.status(401).send({message: "Niepoprawne dane logowania"})
        }

        const validPasswd = await bcrypt.compare(password, user.password);
        if(!validPasswd){
            return res.status(401).send({ message: "Niepoprawne dane logowania"})
        }
        const token = user.generateAuthToken();
        res.status(200).send({token, message: "zalogowano"})
    }
    catch (error){
        console.log(error)
        res.status(500).send({ message: "Błąd serwera"})
    }
}


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({
            $or: [{email: email}, {username: username}]
        })
        if(user){
            return res.status(409).send({message: "Użytkownik o danym emailu lub nazwie użytkownika już istnieje"})
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(password, salt)
        await new User({ ...req.body, password: hashPassword}).save()
        res.status(201).send({ message: "Konto zostało utworzone :)"})
    }
    catch(error){
        console.error("Błąd w rejestracji:", error)
        res.status(500).send({ message: "Błąd serwera" })
    }
}

module.exports = { login, register }

    
