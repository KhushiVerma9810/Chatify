const router = require("express").Router();
const {register}=require("../controllers/usersControllers");
const {login} = require("../controllers/usersControllers")

router.post("/register" , register);
router.post("/login" , login);

module.exports = router;