const express = require("express");
const router = express.Router();
const ctrl_auth = require("../controllers/users_ctrl");
const { uploadAvatar } = require("../middlewares/multer-config");

router.post("/signUp", uploadAvatar, ctrl_auth.signUp);
router.post("/logIn", uploadAvatar, ctrl_auth.logIn);



module.exports = router;