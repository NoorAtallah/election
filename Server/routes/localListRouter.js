const express = require("express");
const router = express.Router();
const {
  getLocalLists,
  increaseVoteCounter,
  createLocalList,
} = require("../controllers/localListController");

router.get("/get", getLocalLists);
router.post("/increase-vote/:name", increaseVoteCounter);
router.post("/create", createLocalList);

module.exports = router;
