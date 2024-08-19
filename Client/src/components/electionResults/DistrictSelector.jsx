import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function DistrictSelector({ selectedDistrict, setSelectedDistrict }) {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/districts");
        setDistricts(response.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <label
        htmlFor="district-select"
        className="block text-xl font-medium text-red-800 mb-2"
      >
        اختر الدائرة:
      </label>
      <select
        id="district-select"
        value={selectedDistrict || ""}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        className="w-full py-3 px-4 border-2 border-red-700 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg transition-all duration-300 ease-in-out"
      >
        <option value="">جميع الدوائر</option>
        {districts.map((district) => (
          <option key={district.district_id} value={district.name}>
            {district.name}
          </option>
        ))}
      </select>
    </motion.div>
  );
}

export default DistrictSelector;
