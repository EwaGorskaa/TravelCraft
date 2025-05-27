const router = require("express").Router()
const { getPlans, getPlan, addPlan, updatePlan, deletePlan } = require("../controllers/PlanController");
const tokenVerification = require("../middleware/tokenVerification");
const { validationResult } = require("express-validator");
const { PlanValidator } = require("../validators/PlanValidator");

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


router.use(tokenVerification);

router.get("/", getPlans);
router.get("/:planId", getPlan)
router.post("/", PlanValidator, handleValidationErrors, addPlan);
router.put("/:planId", PlanValidator, handleValidationErrors, updatePlan);
router.delete("/:planId", deletePlan);

module.exports = router