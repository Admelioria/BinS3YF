import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const syringeLabel = "syringe";
const infectiousWastes = ["disposable gloves", "head-cap", "mask"];

function ThrowWaste() {
  const [status, setStatus] = useState("Waiting for YOLO Detection...");
  const [wasteType, setWasteType] = useState(null);
  const videoRef = useRef(null); // Reference for video element
  const navigate = useNavigate();
  const socket = useRef(null); // Reference for WebSocket connection
  const isSyringe = wasteType === syringeLabel;
  const isInfectious =
    wasteType && infectiousWastes.includes(wasteType.toLowerCase());

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:3000/ws");

    socket.current.onopen = () => {
      console.log("WebSocket connected.");
    };

    socket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const annotation = data?.annotation?.toLowerCase();

        if (annotation === syringeLabel || infectiousWastes.includes(annotation)) {
          setWasteType(annotation);
          setStatus(`${annotation.toUpperCase()} Detected!`);
        } else {
          setWasteType(null);
          setStatus("Unrecognized waste or no detection.");
        }
      } catch (err) {
        console.error("Failed to parse YOLO data:", err);
      }
    };

    socket.current.onerror = () => {
      console.error("WebSocket connection failed.");
      setStatus("WebSocket Error - Make sure the YOLO server is running on port 8080");
    };

    socket.current.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    return () => {
      socket.current.close();
    };
  }, []);

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          console.log("Camera stream started...");
        }

        const sendVideoFrame = () => {
          if (videoRef.current) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/jpeg");
            socket.current.send(JSON.stringify({ imageData }));

            requestAnimationFrame(sendVideoFrame);
          }
        };

        sendVideoFrame();
      }).catch((err) => {
        console.error("Error accessing camera: ", err);
        setStatus("Error accessing camera: " + err.message);
      });
    }
  };

  const handleAction = (action) => {
    setStatus(`${action} in Progress...`);
    setTimeout(() => {
      setStatus(`${action} Completed`);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/background.png')" }}>
      <motion.div className="flex flex-col items-center justify-center h-screen text-white">
        <motion.h1 className="text-5xl font-bold">S3YF <span className="text-blue-300 border-b-4 border-blue-300 pb-2">BIN</span></motion.h1>
        <motion.h2 className="text-3xl mt-4">THROW WASTE</motion.h2>

        <p className="text-2xl font-bold text-white mt-4">{status}</p>
        <video ref={videoRef} className="w-full max-w-lg" onPlay={startCamera}></video>

        <motion.button onClick={() => handleAction("Throwing Waste")} className={`${
            wasteType ? (isSyringe ? "bg-orange-600" : isInfectious ? "bg-red-600" : "bg-yellow-500") : "bg-gray-500 cursor-not-allowed"
          } text-white font-bold py-3 px-8 rounded-full shadow-lg mt-6`} disabled={!wasteType}>
          {wasteType ? `THROW ${wasteType.toUpperCase()}` : "Waiting for Detection..."}
        </motion.button>

        <div className="flex justify-center gap-6 mt-6">
          <motion.button onClick={() => handleAction("Sanitization")} className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg">SANITIZE</motion.button>
          <motion.button onClick={() => handleAction("Sterilization")} className="bg-purple-400 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg">STERILIZE</motion.button>
        </div>

        <motion.button onClick={() => navigate("/dashboard")} className="mt-6 bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-10 rounded-full shadow-md">BACK</motion.button>
      </motion.div>
    </div>
  );
}

export default ThrowWaste;
