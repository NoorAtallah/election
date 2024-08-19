import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const ViewerPage = () => {
  const { roomId } = useParams();
  const videoContainerRef = useRef(null);

  useEffect(() => {
    if (!roomId) {
      console.error("Room ID is empty");
      return;
    }

    const appID = 267667667; // Your App ID
    const serverSecret = "bc152682ffa22937ccf0af51b10c3513"; // Your Server Secret

    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Viewer" // Viewer role
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: videoContainerRef.current,
        scenario: ZegoUIKitPrebuilt.VideoCall,
        maxUsers: 10,
        onJoinRoom: () => {
          console.log("Viewer joined the room.");
        },
        turnOnMicrophoneWhenJoining: false, // Ensure microphone is off
        turnOnCameraWhenJoining: false, // Ensure camera is off
        showMicrophoneStateOnView: false, // Hide mic button
        showCameraStateOnView: false, // Hide camera button
        showMicrophoneState: false, // Hide mic state
        showCameraButton: false, // Hide camera button
        showAudioVideoSettingsButton: false, // Hide audio/video settings
        showScreenSharingButton: false, // Hide screen sharing button
        showLeavingConfirmation: false, // Disable leaving confirmation
        showPreJoinView: false, // Disable pre-join view
        showTextChat: false, // Disable text chat
        showUserList: false, // Disable user list
        showFullScreenButton: false, // Hide full-screen button
        showMessageButton: false, // Hide message button
        showMemberListButton: false, // Hide member list button
      });

      // Set up a MutationObserver to hide elements
      const observer = new MutationObserver(() => {
        hideElements();
      });

      // Observe the video container for changes
      if (videoContainerRef.current) {
        observer.observe(videoContainerRef.current, {
          childList: true,
          subtree: true,
        });
      }

      return () => {
        zp.destroy();
        observer.disconnect(); // Clean up the observer when the component unmounts
      };
    } catch (error) {
      console.error("Failed to join the room:", error);
    }
  }, [roomId]);

  const hideElements = () => {
    const micButton = document.querySelector(".zego-mic-button");
    const cameraButton = document.querySelector(".zego-camera-button");
    const controls = document.querySelector(".zego-ui .zego-controls");

    if (micButton) micButton.style.display = "none";
    if (cameraButton) cameraButton.style.display = "none";
    if (controls) controls.style.display = "none";
  };

  return (
    <div className="viewer-container">
      <style>
        {`
          /* Additional CSS just in case */
          .zego-ui .zego-controls {
            display: none !important;
          }
          .zego-mic-button,
          .zego-camera-button {
            display: none !important;
          }
        `}
      </style>
      <div ref={videoContainerRef} className="video-container" />
    </div>
  );
};

export default ViewerPage;
