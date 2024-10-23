"use client";
import React, { useState } from 'react';
import { redwood } from '@/data/redwood';
import { applyMatrixTransformation } from '@/data/utils';

interface SVGImageProps {
    pixelData: Uint8Array;
    width: number;
    factor?: number;
}

const SVGImage: React.FC<SVGImageProps> = ({ pixelData = redwood, width, factor = .125 }) => {
    const [hoverState, setHoverState] = useState({
        isHovering: false,
        color: '',
        x: 0,
        y: 0,
        row: 0,
        col: 0
    });

    const height = width;
    const rows = Math.sqrt(pixelData.length / 3);
    const cols = rows;
    const rowsToRender = Math.floor(rows * factor);
    const colsToRender = Math.floor(cols * factor);
    const rectWidth = width / colsToRender;
    const rectHeight = height / rowsToRender;

    // const transformedPixelData = applyMatrixTransformation(pixelData, [[.33, .33, .33], [.33, .33, .33], [.33, .33, .33]]);

    function showHighlightRect(rectWidth: number, col: number, row: number, color: string) {
        const rectHeight = rectWidth;
        const offset = rectHeight;
        const centerX = col * rectWidth + rectWidth / 2;
        const centerY = row * rectHeight + rectHeight / 2;

        setHoverState({
            isHovering: true,
            color,
            x: centerX,
            y: centerY,
            row,
            col
        });
    }

    const renderRects = () => {
        const rects = [];
        for (let row = 0; row < rowsToRender; row++) {
            for (let col = 0; col < colsToRender; col++) {
                const index = (row * cols + col) * 3;
                const r = pixelData[index];
                const g = pixelData[index + 1];
                const b = pixelData[index + 2];
                const color = `rgb(${r}, ${g}, ${b})`;
                rects.push(
                    <rect
                        key={`${row}-${col}`}
                        id={`${row}-${col}`}
                        x={col * rectWidth}
                        y={row * rectHeight}
                        width={rectWidth}
                        height={rectHeight}
                        fill={color}
                        stroke="#a8b3c5"
                        strokeWidth=".25"
                        onMouseEnter={() => showHighlightRect(rectWidth, col, row, color)}
                        onMouseLeave={() => {
                            setHoverState({
                                isHovering: false,
                                color: '',
                                x: 0,
                                y: 0,
                                row: 0,
                                col: 0
                            });
                        }}
                    />
                );
            }
        }
        return rects;
    };

    const targetRow = 9;
    const targetCol = 12;
    const targetIndex = (targetRow * cols + targetCol) * 3;
    const targetR = pixelData[targetIndex];
    const targetG = pixelData[targetIndex + 1];
    const targetB = pixelData[targetIndex + 2];
    const targetColor = `rgb(${targetR}, ${targetG}, ${targetB})`;

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {renderRects()}
            {hoverState.isHovering && (
                <g pointerEvents="none">
                    <rect
                        x={hoverState.col * rectWidth}
                        y={hoverState.row * rectHeight}
                        width={rectWidth}
                        height={rectHeight}
                        stroke="white"
                        strokeWidth="1"
                        fill={hoverState.color}
                    />
                    <rect
                        x={hoverState.x - rectWidth * 1.5}
                        y={hoverState.y + rectHeight}
                        width={rectWidth * 3}
                        height={rectWidth * 3}
                        rx="4"
                        ry="4"
                        fill={hoverState.color}
                    />
                    <text
                        x={hoverState.x}
                        y={hoverState.y - rectHeight}
                        fill="white"
                        fontSize="14px"
                        textAnchor="middle"
                        dominantBaseline="hanging"
                    >
                        {hoverState.color}
                    </text>
                </g>
            )}
            <g pointerEvents="none">
                <rect
                    x={targetCol * rectWidth}
                    y={targetRow * rectHeight}
                    width={rectWidth}
                    height={rectWidth}
                    stroke="white"
                    strokeWidth="1"
                    fill={targetColor}
                />
                <rect
                    x={(targetCol * rectWidth + rectWidth / 2) - (rectWidth * 3)}
                    y={(targetRow * rectHeight) + (rectHeight * 2)}
                    width={rectWidth * 6}
                    height={rectWidth * 6}
                    rx="4"
                    ry="4"
                    fill={targetColor}
                />
                <text
                    x={targetCol * rectWidth + rectWidth / 2}
                    y={(targetRow * rectHeight) - (rectHeight * 2)}
                    fill="white"
                    fontSize="14px"
                    textAnchor="middle"
                    dominantBaseline="hanging"
                >
                    {targetColor}
                </text>
            </g>
        </svg>
    );
};

export default SVGImage;
