const router = require("express").Router();
const {
  newConv,
  getConv,
  getusersConv,
} = require("../controllers/convController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/manager/messenger").post(isAuthenticatedUser, authorizeRoles("manager"),newConv);
router.route("/manager/messenger/:userId").get(isAuthenticatedUser, authorizeRoles("manager"),getConv);
router.route("/manager/messenger//find/:firstUserId/:secondUserId").get(isAuthenticatedUser, authorizeRoles("manager"),getusersConv);
// user chat route
router.route("/user/messenger").post(isAuthenticatedUser, newConv);
router.route("/user/messenger/:userId").get(isAuthenticatedUser,getConv);
router.route("/user/messenger//find/:firstUserId/:secondUserId").get(isAuthenticatedUser,getusersConv);
// chef chat route
router.route("/chef/messenger").post(isAuthenticatedUser, authorizeRoles("chef"), newConv);
router.route("/chef/messenger/:userId").get(isAuthenticatedUser, authorizeRoles("chef"),getConv);
router.route("/chef/messenger//find/:firstUserId/:secondUserId").get(isAuthenticatedUser, authorizeRoles("chef"),getusersConv);
module.exports = router;
