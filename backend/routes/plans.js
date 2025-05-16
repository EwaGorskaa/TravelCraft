const router = require("express").Router()
const { getPlans, getPlan, addPlan, updatePlan, deletePlan } = require("../controllers/PlanController")

router.get("/:userId", getPlans);
router.get(":planId", getPlan)
router.post("/", addPlan);
router.put("/:planId", updatePlan);
router.delete("/:planId", deletePlan);

module.exports = router