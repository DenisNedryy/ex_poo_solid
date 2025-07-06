const express = require("express");
const router = express.Router();
const ctrl_auth = require("../controllers/users_ctrl");
const { uploadAvatar } = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

router.get("/", ctrl_auth.getUsers);
router.get("/getOneUser/:id", ctrl_auth.getOneUser);
router.get("/myProfil", auth, ctrl_auth.getMyPfofil);
router.get("/isConnected", auth, ctrl_auth.isConnected);
router.post("/inscription", ctrl_auth.inscription);
router.post("/connection", ctrl_auth.connection);

module.exports = router;