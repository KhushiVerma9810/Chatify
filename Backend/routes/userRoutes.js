const router = require("express").Router();
const {register}=require("../controllers/usersControllers");
const {login , setAvatar} = require("../controllers/usersControllers")

router.post("/register" , register);
router.post("/login" , login);
router.post("/setavatar/:id", setAvatar);
module.exports = router;