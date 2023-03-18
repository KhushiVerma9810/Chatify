const router = require("express").Router();
const {register}=require("../controllers/usersControllers");
const {login , setAvatar , getAllUsers} = require("../controllers/usersControllers")

router.post("/register" , register);
router.post("/login" , login);
router.post("/setavatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);
module.exports = router;