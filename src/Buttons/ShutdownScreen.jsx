import React, { useEffect } from "react";
import { motion } from "framer-motion";

const ShutdownScreen = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose(); // Ensure onClose is called only if provided
      }
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white text-center">
      {/* S3YF BIN Tagline */}
      <motion.h1
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        S3YF BIN
      </motion.h1>
      <motion.p
        className="text-2xl mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        For Safer Life, <br /> For Safer Disposal.
      </motion.p>

      {/* Throwing Garbage Animation */}
      <motion.img
        src="/images/garbage_throw.gif"
        alt="Throwing Garbage Animation"
        className="w-40 h-40 mt-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 1 }}
      />

      {/* Shutting Down Text */}
      <motion.p
        className="text-lg mt-6 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        Shutting down...
      </motion.p>
    </div>
  );
};

export default ShutdownScreen;
