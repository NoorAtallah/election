import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Modal from "../Modal";

function VoiceSearch({ onSearch }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  let recognition = null;

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "ar-JO";

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Transcript:", transcript);
        setTranscript(transcript);

        try {
          const response = await axios.get(
            "http://localhost:4000/api/districts",
            {
              params: { name: transcript },
            }
          );
          console.log("Response Data:", response.data);

          if (response.data && response.data.length > 0) {
            const formattedData = response.data.map((district) => (
              <div
                key={district.district_id}
                className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm text-right"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  {district.name}
                </h3>
                <p className="text-gray-700">
                  <strong>المدينة:</strong> {district.city}
                </p>
                <p className="text-gray-700">
                  <strong>عدد المقاعد:</strong> {district.number_of_seats}
                </p>
                <p className="text-gray-700">
                  <strong>مقعد نسائي:</strong>{" "}
                  {district.Female_seat ? "نعم" : "لا"}
                </p>
                <p className="text-gray-700">
                  <strong>مقعد شركسي أو شيشاني:</strong>{" "}
                  {district.Circassian_or_Chechen_seat ? "نعم" : "لا"}
                </p>
                <p className="text-gray-700">
                  <strong>مقعد مسيحي:</strong>{" "}
                  {district.Christian_seat ? "نعم" : "لا"}
                </p>
                <p className="text-gray-700">
                  <strong>أصوات فارغة:</strong> {district.blankVotes}
                </p>
              </div>
            ));
            setModalContent(
              <div>
                <h2 className="text-2xl font-bold mb-4">نتائج البحث</h2>
                {formattedData}
              </div>
            );
            setModalOpen(true);
          } else {
            setModalContent(
              <div>
                <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
                <p>No districts match the search criteria.</p>
              </div>
            );
            setModalOpen(true);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
          setModalContent(
            <div>
              <h2 className="text-2xl font-bold mb-4">Error</h2>
              <p>There was an error fetching the search results.</p>
            </div>
          );
          setModalOpen(true);
        }
      };

      recognition.onerror = (event) => {
        console.error("خطأ في التعرف على الصوت:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error("Speech recognition is not supported.");
    }

    return () => {
      if (recognition) recognition.abort();
    };
  }, [onSearch]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setTranscript("");
      recognition.start();
    } else {
      console.error("Speech recognition is not supported.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
            isListening ? "bg-red-500" : "bg-white"
          } text-red-700`}
          onClick={startListening}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </motion.button>
        <div className="mr-3">
          <p className="text-sm text-white opacity-80">
            {isListening ? "جارٍ الاستماع..." : "ابحث عن دائرة صوتياً"}
          </p>
          {transcript && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold text-white"
            >
              "{transcript}"
            </motion.p>
          )}
        </div>
      </motion.div>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default VoiceSearch;
