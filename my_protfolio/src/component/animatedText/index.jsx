import { useEffect, useState } from "react";

const texts = ["Raunak Kumar", "a Developer", "a Designer", "a Creator"];

const TypingText = () => {
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentText = texts[count];

    const timeout = setTimeout(() => {
      setDisplayText(currentText.slice(0, index + 1));
      setIndex(index + 1);

      // when word finished
      if (index === currentText.length) {
        setTimeout(() => {
          setIndex(0);
          setDisplayText("");
          setCount((count + 1) % texts.length);
        }, 800); // pause after word
      }
    }, 150); // typing speed

    return () => clearTimeout(timeout);
  }, [index, count]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingText;
