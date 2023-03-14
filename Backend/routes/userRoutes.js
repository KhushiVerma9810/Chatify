const router = require("express").Router();
const {register}=require("../controllers/usersControllers");
router.post("/register" , register);
module.exports = router;