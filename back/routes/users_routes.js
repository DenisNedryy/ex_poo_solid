const express = require("express");
const router = express.Router();
const ctrl_auth = require("../controllers/users_ctrl");
const { uploadAvatar } = require("../middlewares/multer-config");

router.post("/inscription", uploadAvatar, ctrl_auth.inscription);
router.post("/connection", uploadAvatar, ctrl_auth.connection);



module.exports = router;