"use client";
import React, { useState } from 'react';
import { gc } from '@/data/gc';
import { applyMatrixTransformation } from '@/data/utils';

interface DualSVGImageProps {
    pixelData: Uint8Array;
    width: number;
    factor?: number;
    startRow?: number;
    startCol?: number;
    matrixTransformation: number[][];
    filterName: string;
}

const DualSVGImage: React.FC<DualSVGImageProps> = ({
    pixelData = gc,
    width,
    factor = .125,
    startRow = 0,
    startCol = 0,
    matrixTransformation,
    filterName
}) => {
    const height = width;

    const [hoverState, setHoverState] = useState({
        isHovering: false,
        x: 0,
        y: 0,
        row: 0,
        col: 0
    });

    const rows = Math.sqrt(pixelData.length / 3);
    const cols = rows;
    const rowsToRender = Math.floor(rows * factor);
    const colsToRender = Math.floor(cols * factor);
    const rectWidth = width / colsToRender;
    const rectHeight = height / rowsToRender;

    const transformedPixelData = applyMatrixTransformation(pixelData, matrixTransformation);

    function showHighlightRect(rectWidth: number, col: number, row: number) {
        const rectHeight = rectWidth;
        const centerX = col * rectWidth + rectWidth / 2;
        const centerY = row * rectHeight + rectHeight / 2;

        setHoverState({
            isHovering: true,
            x: centerX,
            y: centerY,
            row,
            col
        });
    }

    const renderRects = (data: Uint8Array, isTransformed: boolean) => {
        const rects = [];
        for (let row = 0; row < rowsToRender; row++) {
            for (let col = 0; col < colsToRender; col++) {
                const index = ((row + startRow) * cols + (col + startCol)) * 3;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const color = `rgb(${r}, ${g}, ${b})`;
                const transformedColor = isTransformed ? color : `rgb(${transformedPixelData[index]}, ${transformedPixelData[index + 1]}, ${transformedPixelData[index + 2]})`;
                rects.push(
                    <rect
                        key={`${isTransformed ? 'transformed-' : ''}${row}-${col}`}
                        // x={col * rectWidth + (isTransformed ? width + 20 : 0)}
                        x={col * rectWidth}
                        y={row * rectHeight}
                        width={rectWidth}
                        height={rectHeight}
                        fill={color}
                        stroke="#a8b3c5"
                        strokeWidth=".25"
                        onMouseEnter={() => showHighlightRect(rectWidth, col, row)}
                        onMouseLeave={() => {
                            setHoverState({
                                isHovering: false,
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

    const SPACE = 0;
    const ENLARGED_SQUARE_FACTOR = 8;
    const buffer = rectWidth * 10;

    return (
        <div className="mx-auto" style={{ display: 'flex', justifyContent: 'space-between', width: `${width * 2 + SPACE}px` }}>
            <figure style={{ margin: 0, textAlign: 'center' }}>
                <svg width={width} height={height} viewBox={`${-buffer} ${-buffer} ${width + (2 * buffer)} ${height + (2 * buffer)}`}>
                    {renderRects(pixelData, false)}
                    {hoverState.isHovering && (
                        <>
                            <g pointerEvents="none">
                                {/* Original color */}
                                {(() => {
                                    const index = ((hoverState.row + startRow) * cols + (hoverState.col + startCol)) * 3;
                                    return (
                                        <>
                                            <rect
                                                x={hoverState.col * rectWidth}
                                                y={hoverState.row * rectHeight}
                                                width={rectWidth}
                                                height={rectHeight}
                                                stroke="white"
                                                strokeWidth="1.5"
                                                fill={`rgb(${pixelData[index]}, ${pixelData[index + 1]}, ${pixelData[index + 2]})`}
                                            />
                                            <rect
                                                x={hoverState.x - rectWidth * ENLARGED_SQUARE_FACTOR / 2}
                                                y={hoverState.y + rectHeight}
                                                width={rectWidth * ENLARGED_SQUARE_FACTOR}
                                                height={rectWidth * ENLARGED_SQUARE_FACTOR}
                                                rx="4"
                                                ry="4"
                                                fill={`rgb(${pixelData[index]}, ${pixelData[index + 1]}, ${pixelData[index + 2]})`}
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
                                                {`rgb(${pixelData[index]}, ${pixelData[index + 1]}, ${pixelData[index + 2]})`}
                                            </text>
                                        </>
                                    );
                                })()}
                            </g>
                        </>
                    )}
                </svg>
                <figcaption className="text-sm text-gray-500">Original</figcaption>
            </figure>
            <figure style={{ margin: 0, textAlign: 'center' }}>
                <svg width={width} height={height} viewBox={`${-buffer} ${-buffer} ${width + (2 * buffer)} ${height + (2 * buffer)}`}>
                    {renderRects(transformedPixelData, true)}
                    {hoverState.isHovering && (
                        <>
                            <g pointerEvents="none">
                                {/* Transformed color */}
                                {(() => {
                                    const index = ((hoverState.row + startRow) * cols + (hoverState.col + startCol)) * 3;
                                    return (
                                        <>
                                            <rect
                                                x={hoverState.col * rectWidth + SPACE}
                                                y={hoverState.row * rectHeight}
                                                width={rectWidth}
                                                height={rectHeight}
                                                stroke="white"
                                                strokeWidth="1.5"
                                                fill={`rgb(${transformedPixelData[index]}, ${transformedPixelData[index + 1]}, ${transformedPixelData[index + 2]})`}
                                            />
                                            <rect
                                                x={hoverState.x + SPACE - rectWidth * ENLARGED_SQUARE_FACTOR / 2}
                                                y={hoverState.y + rectHeight}
                                                width={rectWidth * ENLARGED_SQUARE_FACTOR}
                                                height={rectWidth * ENLARGED_SQUARE_FACTOR}
                                                rx="4"
                                                ry="4"
                                                fill={`rgb(${transformedPixelData[index]}, ${transformedPixelData[index + 1]}, ${transformedPixelData[index + 2]})`}
                                            />
                                            <text
                                                x={hoverState.x + SPACE}
                                                y={hoverState.y - rectHeight * 3}
                                                fill="black"
                                                fontFamily="monospace"
                                                fontSize="14px"
                                                textAnchor="middle"
                                                dominantBaseline="hanging"
                                            >
                                                {`rgb(${transformedPixelData[index]}, ${transformedPixelData[index + 1]}, ${transformedPixelData[index + 2]})`}
                                            </text>
                                        </>
                                    );
                                })()}
                            </g>
                        </>
                    )}
                </svg>
                <figcaption className="text-sm text-gray-500">{filterName}</figcaption>
            </figure>
        </div>
    );
};

export default DualSVGImage;
