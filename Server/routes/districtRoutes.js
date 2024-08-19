const express = require("express");
const router = express.Router();
const { getDistrictByName } = require("../controllers/districtController");

// Route to get districts, optionally filtered by name
router.get("/districts", getDistrictByName);

module.exports = router;
