import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
  const [showLine, setShowLine] = useState(false);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    setShowLine(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }, [navigate]);

  return (
    <div
      className="fullscreen-bg flex flex-col items-center justify-center text-white"
      style={{
        background: "url('/background1.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      {/* Fade-in effect for subtitle */}
      <motion.h3
        className="text-lg md:text-xl font-light uppercase tracking-wide mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        WELCOME TO
      </motion.h3>

      {/* Main Title with Fade-In and Scale-Up Animation */}
      <motion.div
        className="relative cursor-pointer mt-2 text-5xl md:text-7xl font-extrabold leading-tight"
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-white">S3YF</span>
        <span className="text-[#5DE2F0]"> BIN</span>

        {/* Underline Animation */}
        <motion.div
          className="absolute left-0 bottom-[-5px] h-1 bg-[#5DE2F0]"
          initial={{ width: 0 }}
          animate={{ width: showLine ? "100%" : "0%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
};

export default Welcome;
