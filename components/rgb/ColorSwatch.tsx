import React from 'react';

interface ColorSwatchProps {
    rgb: [number, number, number];
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ rgb }) => {
    const [r, g, b] = rgb;
    const color = `rgb(${r}, ${g}, ${b})`;

    return (
        <div>
            <div
                className={`rounded-sm w-36 h-36`}
                style={{ backgroundColor: color }}
            />
            <div style={{ marginTop: '8px', fontSize: '15px' }}>{color}</div>
        </div>
    );
};

export default ColorSwatch;