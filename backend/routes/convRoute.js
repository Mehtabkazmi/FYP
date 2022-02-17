const router = require("express").Router();
const {
  newConv,
  getConv,
  getusersConv,
} = require("../controllers/convController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/admin/messenger").post(isAuthenticatedUser, authorizeRoles("admin"),newConv);
router.route("/admin/messenger/:userId").get(isAuthenticatedUser, authorizeRoles("admin"),getConv);
router.route("/admin/messenger//find/:firstUserId/:secondUserId").get(isAuthenticatedUser, authorizeRoles("admin"),getusersConv);
module.exports = router;
