const Pin = require("../models/Pin")

const getPins = async (req, res) => {
    try{
        const { types } = req.query;
        const userId = req.user._id;

        if(!userId){
            return res.status(404).send({ message: "Błąd przy pobieraniu użytkownika :(" });
        }

        const filter = {userId, ...(types ? {type: {$in: types.split(',')}} : {})}; 
        const pins = await Pin.find(filter);

        res.status(200).send({ data: pins, message: "Pomyślnie pobrano pinezki użytkownika "});
    }
    catch(error){
        res.status(500).send({ message: error.message })
    }
}


const addPin = async (req, res) => {
    try{
        const newPin = new Pin(req.body);
        const savedPin = await newPin.save();
        res.status(201).send({ message: "Pinezka dodana pomyślnie :) ", data: savedPin});
    }
    catch(error){
        res.status(500).send({ message: error.message })
    }
}


const updatePin = async (req, res) => {
    try{
        const updatedPin = Pin.findByIdAndUpdate(req.params.pinId, req.body, { new: true });
        if(!updatedPin){
            return res.status(404).send({ message: "Nie znaleziono pinezki " })
        }
        res.status(200).send({ message: "Pinezka zaktualizowana pomyślnie :) ", data: updatedPin});
    }
    catch(error){
        res.status(500).send({ message: error.message })
    }
}


const deletePin = async (req, res) => {
    try{
        const deletedPin = await Pin.findByIdAndDelete(req.params.pinId);
        if(!deletedPin){
            return res.status(404).send({ message: "Nie znaleziono pinezki :(" })
        }
        res.status(200).send({ message: "Pinezka usunięta pomyślnie :)" })
    }
    catch(error){
        res.status(500).send({ message: error.message })
    }
}



module.exports = { getPins, addPin, updatePin, deletePin}