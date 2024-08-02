"use client";

import { FC, useEffect, useState } from "react";

interface Props {
  text: string;
  onComplete?: () => void;
}

const Typewriter: FC<Props> = ({ text, onComplete }) => {
  const [words, setWords] = useState<string[]>(
    text.split(" ").map((word) => word + " ")
  );
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      if (!words.length) {
        if (onComplete) onComplete();
        return clearInterval(interval);
      }
      setTyped((prev) => prev + words[0]);
      setWords((prev) => prev.slice(1));
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete, words]);

  return <span>{typed}</span>;
};

export default Typewriter;
