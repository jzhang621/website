import React from 'react';

interface ColorSwatchProps {
    rgb: [number, number, number];
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ rgb }) => {
    const [r, g, b] = rgb;
    const color = `rgb(${r}, ${g}, ${b})`;

    return (
        <div className="flex flex-col items-center">
            <div
                className={`rounded-sm w-32 h-32`}
                style={{ backgroundColor: color }}
            />
            <div className="mt-2 text-sm font-semibold">{color}</div>
        </div>
    );
};

export default ColorSwatch;