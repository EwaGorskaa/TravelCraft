const router = require("express").Router()
const { addPin, getPins, updatePin, deletePin } = require("../controllers/PinController")
const tokenVerification = require("../middleware/tokenVerification")

router.use(tokenVerification)
router.post("/", addPin)
router.get("/", getPins)
router.put("/:pinId", updatePin)
router.delete("/:pinId", deletePin)

module.exports = router