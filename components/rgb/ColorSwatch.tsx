import React from 'react';

interface ColorSwatchProps {
    rgb: [number, number, number];
    label?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ rgb, label }) => {
    const [r, g, b] = rgb;
    const color = `rgb(${r}, ${g}, ${b})`;

    return (
        <div className="flex flex-col items-center">
            <div className={`rounded-sm w-24 h-24`} style={{ backgroundColor: color }} />
            <div style={{ color: color }} className="font-mono mt-2 text-xs font-semibold">
                {color}
            </div>
            {label && (
                <div style={{ color: color }} className="font-mono text-sm">
                    {label}
                </div>
            )}
        </div>
    );
};

export default ColorSwatch;