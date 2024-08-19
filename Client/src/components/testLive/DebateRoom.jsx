import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const DebateRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);

  const setupRoom = () => {
    const appID = 267667667;
    const serverSecret = "bc152682ffa22937ccf0af51b10c3513";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Host" // اسم المضيف
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: videoContainerRef.current,
      scenario: ZegoUIKitPrebuilt.VideoCall, // أو وضع البث المباشر إذا كان مختلفًا
      maxUsers: 10,
      onJoinRoom: () => {
        console.log("Host joined the room.");
      },
    });
  };

  useEffect(() => {
    setupRoom();

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [roomId]);

  return (
    <div className="debate-room-container">
      <div ref={videoContainerRef} className="video-container" />
      <button onClick={() => navigate("/")}>Exit</button>
    </div>
  );
};

export default DebateRoom;
