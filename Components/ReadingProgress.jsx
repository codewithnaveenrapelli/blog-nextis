"use client";
import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (scrollTop / height) * 100;
      setWidth(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9999]">
      <div
        className="h-[3px] bg-black transition-all duration-150"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
