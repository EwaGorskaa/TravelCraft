const Plan = require("../models/Plan")
const Pin = require("../models/Pin")

const getPlans = async (req, res) => {
    try{
        const plans = await Plan.find({ userId: req.user._id })
        res.status(200).send({ data: plans, message: "Pobrano plany podróży" })
    }
    catch(error){
        return res.status(500).send({ message: error.message })
    }
}

const getPlan = async (req, res) => {
    try{
        const plan = await Plan.findById(req.params.planId);
        if(!plan){
            return res.status(404).send({ message: "Nie znaleziono planu podróży :(" })
        }
        res.status(200).send({ message: "Pobrano plan podróży" })
    }
    catch(error){
        res.status(500).send({ message: error.message })
    }
}


const addPlan = async (req, res) => {
    try{
        const newPlan = new Plan({...req.body, userId: req.user._id });
        const savedPlan = await newPlan.save();

        const coords = await fetchCoordinates(savedPlan.mainDestination);
        if (coords && !isNaN(coords.lat) && !isNaN(coords.lng)) {
            const now = new Date();
            const type = new Date(savedPlan.startDate) < now ? "Visited" : "Upcoming";

            const newPin = new Pin ({
                userId: req.user._id,
               title: savedPlan.mainDestination,
               type: type,
               lat: coords.lat,
               lng: coords.lng
            })
            await newPin.save();
        }
        
        res.status(201).send({ message: "Plan dodany pomyślnie :)" })
    }
    catch(error){
        res.status(500).send({ message: error.message  })
    }
}

const updatePlan = async (req, res) => {
    try{
        const updatedPlan = await Plan.findByIdAndUpdate(
            req.params.planId, req.body, {new: true}
        );
        if(!updatedPlan){
            return res.status(404).send({ message: "Nie znaleziono planu" })
        }
        res.status(200).send({ message: "Plan zaktualizowany pomyślnie :)" })
    }
    catch(error){
        res.status(500).send({ message: error.message  })
    }
}

const deletePlan = async (req, res) => {
    try{
        const planToDelete = await Plan.findByIdAndDelete(req.params.planId)
        if(!planToDelete){
            return res.status(404).send({ message: "Nie znaleziono planu" })
        }
        res.status(200).send({ message: "Plan usunięty pomyślnie :)" })
    }
    catch(error){
        res.status(500).send({ message: error.message  })
    }
}


const fetchCoordinates = async (locationName) =>{
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`);
    const data  = await response.json();

    if(data && data.length > 0) {
        const {lat, lng} = data[0];
        return {lat: parseFloat(lat), lng: parseFloat(lng)}
    }
    return null
}

module.exports = {getPlans, getPlan, addPlan, updatePlan, deletePlan}