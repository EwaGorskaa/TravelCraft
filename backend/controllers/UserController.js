const { User } = require("../models/User");

const getUser = async (req, res) => {
    try{
        const user = await User.findOne({_id: req.user._id});
        if(!user){
            return res.status(404).send({ message: "Nie znaleziono użytkownika" })
        }
        res.status(200).send({data: user, message: "Użytkownik"})
    }
    catch(error){
        return res.status(500).send({ message: error.message })
    }
}

module.exports = { getUser };