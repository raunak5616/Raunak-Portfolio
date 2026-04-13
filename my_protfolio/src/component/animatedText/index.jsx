import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts = ["MERN Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Creative Thinker"];

const TypingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-12 flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 font-bold"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default TypingText;
