const db = require("../models");
const getPartyList = async (req, res) => {
  try {
    const partyLists = await db.PartyList.findAll({
      where: { is_approved: true },
    });
    res.json({ partyLists });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const increaseVoteCounter = async (req, res) => {
  try {
    const partyList = await db.PartyList.findOne({
      where: { name: req.params.name },
    });

    if (!partyList) {
      return res.status(404).json({ message: "partyList not found" });
    }
    console.log("partyList", partyList);
    partyList.votes += 1;
    await partyList.save();

    res.json({
      message: "votes increased",
      blankVotes: partyList.votes,
    });
  } catch (error) {
    console.error("Error increasing votes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createPartyList = async (req, res) => {
  try {
    const newPartyList = await db.PartyList.create(req.body);
    res.json(newPartyList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPartyList, increaseVoteCounter, createPartyList };
