import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LiveStreem = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    const generatedRoomId = randomId + timestamp;
    setRoomId(generatedRoomId);
  };

  const startDebate = () => {
    if (!roomId) {
      alert("Please Generate Room ID First");
      return;
    }
    // Navigate to the debate room with host role
    navigate(`/debate/${roomId}?role=host`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Host a Debate</h1>
      <button
        onClick={handleRoomIdGenerate}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Generate Room ID
      </button>
      {roomId && (
        <div>
          <p className="mb-4">Room ID: {roomId}</p>
          <button
            onClick={startDebate}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Start Debate
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveStreem;
