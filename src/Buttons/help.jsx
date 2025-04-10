import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Help = () => {
  const navigate = useNavigate();

  // Define help steps with images
  const steps = [
    { img: "18.png", text: "POWER ON THE SYSTEM" },
    { img: "19.png", text: "PLACE YOUR TRASH ON THE PLATFORM" },
    { img: "20.png", text: "CLICK DETECT THROW BUTTON" },
    { img: "21.png", text: "PROCEED WITH STERILIZATION" },
    { img: "22.png", text: "REPEAT STEPS IF NECESSARY" },
    { img: "23.png", text: "CHECK BINS' STATUS" },
    { img: "24.png", text: "DISPOSE WASTE IF FULL" },
    { img: "25.png", text: "SHUT DOWN THE SYSTEM" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <motion.div
        className="flex flex-col items-center justify-center h-screen text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className="text-5xl font-bold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          S3YF <span className="text-blue-300 border-b-4 border-blue-300 pb-2">BIN</span>
        </motion.h1>
        <motion.h2
          className="text-3xl mt-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          HELP
        </motion.h2>

        {/* Grid layout with better spacing */} 
        <div className="grid grid-cols-4 gap-15 mt-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <img
                src={step.img}
                alt={step.text}
                className="drop-shadow-lg transition-all duration-300"
                style={{ maxWidth: "80%", height: "auto" }} // Keep original size
              />
              {/* Add Text Below Each Image */}
              <p className="text-white text-center mt-2 text-lg font-semibold w-35">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
                <motion.button
                  onClick={() => navigate("/dashboard")}
                  className="mt-6 bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-10 rounded-full shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  BACK
                </motion.button>
      </motion.div>
    </div>
  );
};

export default Help;
