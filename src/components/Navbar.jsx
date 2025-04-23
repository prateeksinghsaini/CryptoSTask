import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ scrollProgress = 0 }) => {
  // Calculate background color based on scroll progress
  const backgroundStyle = useMemo(() => {
    // For the initial transition (0 to 0.1): transparent to gray
    // For the second transition (0.1 to 0.2): gray to black
    let backgroundColor;
    let textColor = "white";

    if (scrollProgress < 0.1) {
      // First phase: transparent to gray
      const grayOpacity = scrollProgress / 0.1;
      backgroundColor = `rgba(80, 80, 80, ${grayOpacity})`;
      textColor = grayOpacity > 0.5 ? "white" : "black";
    } else if (scrollProgress < 0.2) {
      // Second phase: gray to black
      const blackness = (scrollProgress - 0.1) / 0.1; // 0 to 1
      const r = Math.floor(80 * (1 - blackness));
      const g = Math.floor(80 * (1 - blackness));
      const b = Math.floor(80 * (1 - blackness));
      backgroundColor = `rgb(${r}, ${g}, ${b})`;
      textColor = "white";
    } else {
      // Final state: solid black
      backgroundColor = "#0a0a0a";
      textColor = "white";
    }

    return {
      backgroundColor,
      color: textColor,
      transition: "background-color 0.3s ease, color 0.3s ease",
    };
  }, [scrollProgress]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-4 max-w-screen-2xl px-3 md:px-12 lg:px-28 2xl:px-2 mx-auto"
      //   style={backgroundStyle}
    >
      <nav className="flex items-center justify-between">
        <Link className="flex items-center" to="/">
          <img
            src="/images/logo.png"
            alt="Crypto Strategy"
            width="141"
            height="32"
            className="h-8 w-auto "
            style={{ opacity: 1 }}
          />
        </Link>
        <button
          className="w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.33334 8H26.6667M5.33334 16H26.6667M5.33334 24H26.6667"
              stroke={backgroundStyle.color}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>
    </motion.header>
  );
};

export default Navbar;
