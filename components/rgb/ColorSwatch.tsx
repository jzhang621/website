"use client";

import React, { useState, useEffect } from "react";

interface ColorSwatchProps {
    rgb: [number, number, number];
    label?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ rgb, label }) => {
    const [r, g, b] = rgb;
    const color = `rgb(${r}, ${g}, ${b})`;
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth > 768);
      };

      // Set initial value
      checkScreenSize();

      // Add event listener
      window.addEventListener("resize", checkScreenSize);

      // Cleanup
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Use consistent default for server-side rendering
    const sizeClass = isLargeScreen ? "w-24 h-24" : "w-12 h-12";
    const textClass = isLargeScreen ? "text-sm" : "text-xs";

    return (
      <div className="flex flex-col items-center">
        <div className={`rounded-sm ${sizeClass}`} style={{ backgroundColor: color }} />
        <div style={{ color: color }} className="font-mono mt-2 text-xs font-semibold">
          {color}
        </div>
        {label && (
          <div style={{ color: color }} className={`font-mono ${textClass}`}>
            {label}
          </div>
        )}
      </div>
    );
};

export default ColorSwatch;
