const { where } = require("sequelize");
const db = require("../models");

const getLocalLists = async (req, res) => {
  try {
    const localLists = await db.LocalList.findAll({
      where: { is_approved: true },
    });
    res.json({ localLists });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const increaseVoteCounter = async (req, res) => {
  try {
    const localList = await db.LocalList.findOne({
      where: { name: req.params.name },
    });

    if (!localList) {
      return res.status(404).json({ message: "localList not found" });
    }
    console.log("localList", localList);
    localList.votes += 1;
    await localList.save();

    res.json({
      message: "votes increased",
      blankVotes: localList.votes,
    });
  } catch (error) {
    console.error("Error increasing votes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createLocalList = async (req, res) => {
  try {
    const localList = await db.LocalList.create(req.body);
    res.json({ localList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getLocalLists, increaseVoteCounter, createLocalList };
