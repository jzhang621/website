import React from "react";
import { MemoryCell } from "@/models/Memory";

interface MemoryGridProps {
    gridData: MemoryCell[]; // Accept the grid data array directly
    cellSize?: number; // Optional size for each cell
    marginXPercent?: number; // Margin as a percentage of total width
    marginYPercent?: number; // Margin as a percentage of total height
}

const MemoryGrid: React.FC<MemoryGridProps> = ({
    gridData,
    cellSize = 30,
    marginXPercent = 0.05, // Default to 5% of the width
    marginYPercent = 0.15, // Default to 5% of the height
}) => {
    // Calculate the number of columns and rows based on gridData
    const cols = Math.max(...gridData.map((cell) => cell.colIdx)) + 1;
    const rows = Math.max(...gridData.map((cell) => cell.rowIdx)) + 1;

    // Calculate the total grid width and height
    const gridWidth = cols * cellSize;
    const gridHeight = rows * cellSize;

    // Calculate marginX and marginY as a percentage of total width and height
    const marginX = gridWidth * marginXPercent;
    const marginY = gridHeight * marginYPercent;

    return (
        <svg viewBox={`0 0 ${gridWidth + 2 * marginX} ${gridHeight + 2 * marginY}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="max-h-screen">
            <g transform={`translate(${marginX}, ${marginY})`}>
                {gridData.map((cell) => (
                    <rect key={`${cell.rowIdx}-${cell.colIdx}`} x={cell.colIdx * cellSize} y={cell.rowIdx * cellSize} width={cellSize} height={cellSize} fill={cell.fill} stroke={cell.stroke} strokeWidth={cell.strokeWidth} opacity={cell.opacity} />
                ))}
            </g>
        </svg>
    );
};

export default MemoryGrid;
