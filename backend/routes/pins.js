const router = require("express").Router()
const { addPin, getPins, updatePin, deletePin } = require("../controllers/PinController")

router.post("/", addPin)
router.get("/:userId", getPins)
router.put("/:pinId", updatePin)
router.delete("/:pinId", deletePin)

module.exports = router