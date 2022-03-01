const router = require("express").Router();
const {
  addMsg,
  getMsg,
} = require("../controllers/msgController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// manager message
router.route("/manager/message").post(isAuthenticatedUser, authorizeRoles("manager"),addMsg);
router.route("/manager/message/:conversationId").get(isAuthenticatedUser, authorizeRoles("manager"),getMsg);
// user message
router.route("/user/message").post(isAuthenticatedUser,addMsg);
router.route("/user/message/:conversationId").get(isAuthenticatedUser,getMsg);
// admin message
router.route("/admin/message").post(isAuthenticatedUser, authorizeRoles("admin"),addMsg);
router.route("/admin/message/:conversationId").get(isAuthenticatedUser, authorizeRoles("admin"),getMsg);
module.exports = router;
