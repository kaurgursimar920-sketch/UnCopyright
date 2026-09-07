import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789§¶•·";

// Forensic "decrypt" reveal: characters resolve left-to-right from noise.
export default function ScrambleText({ text, className = "", delay = 0, duration = 900 }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let interval;
    const start = setTimeout(() => {
      let revealed = 0;
      const step = Math.max(1, Math.ceil(text.length / (duration / 40)));
      interval = setInterval(() => {
        revealed += step;
        const next = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealed) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplay(next);
        if (revealed >= text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 40);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, duration]);

  return (
    <span className={className} aria-label={text}>
      {display || " "}
    </span>
  );
}
