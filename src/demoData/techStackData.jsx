// constants/techStackData.jsx (note the .jsx extension)
import React from "react";
import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

export const techStackData = [
  {
    name: "React.js",
    icon: (
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
        <SiReact className="text-blue-500 text-2xl" />
      </div>
    ),
    color: "from-blue-400 to-blue-600",
    description: "Building interactive UIs",
    proficiency: 95,
  },
  {
    name: "Tailwind CSS",
    icon: (
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
        <SiTailwindcss className="text-cyan-500 text-2xl" />
      </div>
    ),
    color: "from-cyan-400 to-cyan-600",
    description: "Utility-first CSS framework",
    proficiency: 90,
  },
  {
    name: "Node.js",
    icon: (
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
        <SiNodedotjs className="text-green-500 text-2xl" />
      </div>
    ),
    color: "from-green-400 to-green-600",
    description: "JavaScript runtime",
    proficiency: 85,
  },
  {
    name: "Express.js",
    icon: (
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
        <SiExpress className="text-gray-600 text-2xl" />
      </div>
    ),
    color: "from-gray-400 to-gray-600",
    description: "Web application framework",
    proficiency: 88,
  },
  {
    name: "MongoDB",
    icon: (
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
        <SiMongodb className="text-emerald-500 text-2xl" />
      </div>
    ),
    color: "from-emerald-400 to-emerald-600",
    description: "NoSQL database",
    proficiency: 82,
  },
];
