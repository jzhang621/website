"use client";
import React, { useState } from 'react';
import { gc } from '@/data/gc';


interface SVGImageProps {
    pixelData: Uint8Array;
    width: number;
    factor?: number;
    startRow?: number;
    startCol?: number;
    initialHover?: {
        row: number;
        col: number;
    };
}

const SVGImage: React.FC<SVGImageProps> = ({
    pixelData = gc,
    width,
    factor = .125,
    startRow = 0,
    startCol = 0,
    initialHover
}) => {
    const height = width;
    const rows = Math.sqrt(pixelData.length / 3);
    const cols = rows;
    const rowsToRender = Math.floor(rows * factor);
    const colsToRender = Math.floor(cols * factor);
    const rectWidth = width / colsToRender;
    const rectHeight = height / rowsToRender;

    const getHoverState = (row: number, col: number) => {
        const index = ((row + startRow) * cols + (col + startCol)) * 3;
        const r = pixelData[index];
        const g = pixelData[index + 1];
        const b = pixelData[index + 2];
        const color = `rgb(${r}, ${g}, ${b})`;
        const centerX = col * rectWidth + rectWidth / 2;
        const centerY = row * rectHeight + rectHeight / 2;

        return {
            isHovering: true,
            color,
            x: centerX,
            y: centerY,
            row,
            col
        };
    };

    const [hoverState, setHoverState] = useState(
        initialHover ? getHoverState(initialHover.row, initialHover.col) : {
            isHovering: false,
            color: '',
            x: 0,
            y: 0,
            row: 0,
            col: 0
        }
    );

    // const transformedPixelData = applyMatrixTransformation(pixelData, [[.33, .33, .33], [.33, .33, .33], [.33, .33, .33]]);

    function showHighlightRect(col: number, row: number) {
        setHoverState(getHoverState(row, col));
    }

    const renderRects = () => {
        const rects = [];
        for (let row = 0; row < rowsToRender; row++) {
            for (let col = 0; col < colsToRender; col++) {
                const index = ((row + startRow) * cols + (col + startCol)) * 3;
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
                        onMouseEnter={() => {
                            if (initialHover) return;
                            showHighlightRect(col, row)
                        }}
                        onMouseLeave={() => {
                            if (initialHover) return;
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



    const buffer = rectWidth * 10;

    const hoverRatio = 6;

    return (
        <svg width={width} height={height} viewBox={`${-buffer} ${-buffer} ${width + (2 * buffer)} ${height + (2 * buffer)}`}>
            {renderRects()}
            {hoverState.isHovering && (
                <g pointerEvents="none">
                    <rect
                        x={hoverState.col * rectWidth}
                        y={hoverState.row * rectHeight}
                        width={rectWidth}
                        height={rectHeight}
                        stroke="white"
                        strokeWidth="1.5"
                        fill={hoverState.color}
                    />
                    <rect
                        x={hoverState.x - rectWidth * hoverRatio / 2}
                        y={hoverState.y + rectHeight}
                        width={rectWidth * hoverRatio}
                        height={rectWidth * hoverRatio}
                        rx="4"
                        ry="4"
                        fill={hoverState.color}
                    />
                    <text
                        x={hoverState.x}
                        y={hoverState.y - rectHeight * 3}
                        fill="black"
                        fontFamily="monospace"
                        fontSize="14px"
                        textAnchor="middle"
                        dominantBaseline="hanging"
                    >
                        {hoverState.color}
                    </text>
                </g>
            )}

        </svg>
    );
};

export default SVGImage;
