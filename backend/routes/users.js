const router = require("express").Router()
const { getUser } = require("../controllers/UserController")
const tokenVerification = require("../middleware/tokenVerification")

router.get("/", tokenVerification, getUser );

module.exports = router;

