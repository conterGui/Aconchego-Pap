import { useState, useEffect } from "react";

interface TypewriterProps {
  text?: string;
  speed?: number; // tempo entre cada letra em ms
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text = "Aconchego",
  speed = 150,
  className = "font-playfair text-5xl md:text-7xl text-foreground font-bold",
}) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Digitação da palavra
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  // Cursor piscando indefinidamente
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayed}
      {showCursor && <span className="animate-blink">|</span>}
    </span>
  );
};

export default Typewriter;
