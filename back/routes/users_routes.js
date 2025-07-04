const express = require("express");
const router = express.Router();
const ctrl_auth = require("../controllers/users_ctrl");
const { uploadAvatar } = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

router.post("/inscription", ctrl_auth.inscription);
router.post("/connection", ctrl_auth.connection);
router.get("/isConnected", auth, ctrl_auth.isConnected);

module.exports = router;