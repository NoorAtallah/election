import React from "react";
import { motion } from "framer-motion";

function Header({ activeTab, setActiveTab, VoiceSearch }) {
  return (
    <header className="bg-gradient-to-r from-red-700 via-green-700 to-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            نتائج الانتخابات البرلمانية الأردنية
          </motion.h1>
          {VoiceSearch}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white opacity-80 mt-2"
        >
          تاريخ الانتخابات: 15 آب 2024
        </motion.p>
        <div className="flex space-x-4 rtl:space-x-reverse mt-4">
          {["محلي", "حزبي"].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full transition-all duration-300 ease-in-out ${
                activeTab === tab
                  ? "bg-white text-red-700 shadow-md"
                  : "bg-red-800 text-white hover:bg-red-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              نتائج القوائم {tab}ة
            </motion.button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
