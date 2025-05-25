const Plan = require("../models/Plan")

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


module.exports = {getPlans, getPlan, addPlan, updatePlan, deletePlan}