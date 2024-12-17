"use client";

import React from "react";
import useWindowSize from "../../hooks/useWindowSize";

interface ColorSwatchProps {
    rgb: [number, number, number];
    label?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ rgb, label }) => {
    const [r, g, b] = rgb;
    const color = `rgb(${r}, ${g}, ${b})`;
    const { width } = useWindowSize();

    // Determine class based on screen width
    const sizeClass = width > 768 ? "w-24 h-24" : "w-12 h-12";

    return (
        <div className="flex flex-col items-center">
            <div className={`rounded-sm ${sizeClass}`} style={{ backgroundColor: color }} />
            <div style={{ color: color }} className="font-mono mt-2 text-xs font-semibold">
                {color}
            </div>
            {label && (
                <div
                    style={{ color: color }}
                    className={`font-mono ${width > 768 ? "text-sm" : "text-xs"}`}
                >
                    {label}
                </div>
            )}
        </div>
    );
};

export default ColorSwatch;
