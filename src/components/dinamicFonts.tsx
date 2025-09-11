import { useState, useEffect } from "react";

const Typewriter = () => {
  const text = "Aconchego";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [blinkCount, setBlinkCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < text.length) {
      const interval = setInterval(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 150);
      return () => clearInterval(interval);
    } else {
      const blinkInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
        setBlinkCount((prev) => prev + 1);
      }, 500);

      if (blinkCount >= 6) {
        clearInterval(blinkInterval);
        setShowCursor(false);
      }

      return () => clearInterval(blinkInterval);
    }
  }, [index, blinkCount]);

  return (
    <span className="font-playfair text-5xl md:text-7xl text-foreground font-bold">
      {displayed}
      {showCursor && <span>|</span>}
    </span>
  );
};

export default Typewriter;
