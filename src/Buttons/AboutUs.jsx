import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Cal, Efren Jr. M.", role: "HARDWARE 1", subRole: "UI DESIGNER 2", img: "/images/cal.png" },
  { name: "Dimas, Joshua B.", role: "DEVELOPER 1", subRole: "HARDWARE 2", img: "/images/dimas.png" },
  { name: "Parreño, Paul Allen M.", role: "DEVELOPER 2", subRole: "HARDWARE 3", img: "/images/parreno.png" },
  { name: "Tanglao Jr., Jower L.", role: "UI DESIGNER 1", subRole: "HARDWARE 4", img: "/images/tanglao.png" }
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-10 text-white"
      style={{ backgroundImage: "url('/background1.jpg')" }}
    >
      <h1 className="text-5xl font-bold mb-10">MEET THE TEAM</h1>
      
      <div className="grid md:grid-cols-4 gap-8 justify-center">
        {teamMembers.map((member, index) => (
          <motion.div key={index} className="flex flex-col items-center hover:scale-105 transition-all">
            <motion.div className="bg-gray-700 w-36 h-36 flex items-center justify-center rounded-lg shadow-lg">
              <img src={member.img} alt={member.name} className="w-28 h-28 rounded-lg border-4 border-gray-500" />
            </motion.div>
            <motion.div className="bg-gray-800 w-44 p-4 mt-3 rounded-lg text-center shadow-lg">
              <h2 className="text-lg font-bold">{member.name}</h2>
              <p className="text-gray-300 font-semibold">{member.role}</p>
              <p className="text-gray-400">{member.subRole}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        className="mt-10 bg-gray-700 px-6 py-3 text-white font-bold rounded-full hover:bg-gray-900"
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate(-1)}
      >
        BACK
      </motion.button>
    </div>
  );
};

export default AboutUs;
