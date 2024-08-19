const {
  getPartyList,
  increaseVoteCounter,
  createPartyList,
} = require("../controllers/partyListController");
const express = require("express");
const partyListRouter = express.Router();
partyListRouter.get("/get", getPartyList);
partyListRouter.put("/increase/:name", increaseVoteCounter);
partyListRouter.post("/create", createPartyList);

module.exports = partyListRouter;
