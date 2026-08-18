import { motion } from 'framer-motion';
import { fadeUp } from './HeroAnimations';
import { useEffect, useState } from 'react';

const text = "Full Stack Developer · Architect of Digital Realms";

export function HeroTyping() {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.h2 
      variants={fadeUp}
      className="text-xl md:text-2xl lg:text-3xl font-heading text-gold-muted mt-4 min-h-[40px]"
    >
      {displayedText}
      <span className="animate-pulse ml-1 text-gold-bright">|</span>
    </motion.h2>
  );
}
