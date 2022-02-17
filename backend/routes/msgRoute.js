const router = require("express").Router();
const {
  addMsg,
  getMsg,
} = require("../controllers/msgController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/admin/message").post(isAuthenticatedUser, authorizeRoles("admin"),addMsg);
router.route("/admin/message/:conversationId").get(isAuthenticatedUser, authorizeRoles("admin"),getMsg);
module.exports = router;
