const { ElectoralDistrict } = require("../models");
const { Op } = require("sequelize");

exports.getElectoralDistrictCount = async (req, res) => {
  try {
    const count = await ElectoralDistrict.count();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching district count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchElectoralDistricts = async (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Query parameter 'name' is required" });
  }

  try {
    const districts = await ElectoralDistrict.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    if (districts.length === 0) {
      return res.status(404).json({ message: "No districts found" });
    }

    res.json(districts);
  } catch (error) {
    console.error("Error searching for districts:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve districts", details: error.message });
  }
};
