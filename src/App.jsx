import React, { useEffect, useState, useMemo } from "react";
import { useScroll } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Centralize background color calculation
  const appBgColor = useMemo(() => {
    if (scrollProgress < 0.1) {
      const grayness = scrollProgress / 0.1;
      const colorValue = 255 - 175 * grayness;
      return `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else if (scrollProgress < 0.2) {
      const darkness = (scrollProgress - 0.1) / 0.1;
      const colorValue = 80 - 80 * darkness;
      return `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else {
      return "#0a0a0a";
    }
  }, [scrollProgress]);

  return (
    <div
      style={{
        backgroundColor: appBgColor,
        transition: "background-color 0.3s ease",
      }}
    >
      <Navbar scrollProgress={scrollProgress} />
      <Hero scrollProgress={scrollProgress} />
    </div>
  );
}

export default App;
