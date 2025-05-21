const router = require("express").Router()
const { getPlans, getPlan, addPlan, updatePlan, deletePlan } = require("../controllers/PlanController");
const tokenVerification = require("../middleware/tokenVerification");

router.use(tokenVerification);

router.get("/", getPlans);
router.get("/:planId", getPlan)
router.post("/", addPlan);
router.put("/:planId", updatePlan);
router.delete("/:planId", deletePlan);

module.exports = router