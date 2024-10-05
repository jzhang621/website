"use client";
import React, { useContext } from "react";
import { easeCubicInOut, easeElasticInOut, easeLinear } from "d3-ease";
import { useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider"; // Import your context

// Utility function to get points for the easing function
const generateEasingPath = (easingFunction: (t: number) => number, width: number, height: number, steps: number) => {
    const points: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const easedValue = easingFunction(t);
        const x = t * width; // Normalized x-axis (0 to width)
        const y = (1 - easedValue) * height; // Invert y for SVG (0 at top, height at bottom)
        points.push([x, y]);
    }

    return points;
};

const pathToD = (points: [number, number][]) => points.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");

interface EasingChartProps {
    width: number;
    height: number;
    steps?: number; // Optional: Number of points for the path (default is 100)
    easingType: "cubic" | "elastic" | "linear"; // Choose which easing function to render
    startY?: number;
    endY?: number;
}

const EasingChart: React.FC<EasingChartProps> = ({ width, height, steps = 100, easingType = "cubic", startY = 0, endY = 1 }) => {
    const { easedProgress, progress } = useAnimatedValuesContext(); // Get progress from the context

    // Define margins
    const margin = { top: 35, right: 35, bottom: 45, left: 35 }; // Increased bottom margin for x-axis label
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = progress * innerWidth;
    const y = (1 - easedProgress) * innerHeight;

    // Choose the easing function based on the easingType prop
    let easingFunction;
    switch (easingType) {
        case "elastic":
            easingFunction = easeElasticInOut;
            break;
        case "linear":
            easingFunction = easeLinear;
            break;
        case "cubic":
        default:
            easingFunction = easeCubicInOut;
            break;
    }

    // Generate points for the selected easing function
    const easingPoints = generateEasingPath(easingFunction, innerWidth, innerHeight, steps);

    const axisColor = "#9CA3AF";

    return (
        <svg width={width} height={height}>
            {/* Apply margins by creating a group and translating it */}
            <g transform={`translate(${margin.left},${margin.top})`}>
                {/* Draw x and y axis (as simple lines) */}
                <g className="axis" stroke={axisColor}>
                    <text x={-margin.left / 5} y={0} textAnchor="end" dominantBaseline={"middle"} fontSize={12}>
                        {endY}
                    </text>

                    <text x={-margin.left / 5} y={innerHeight} textAnchor="end" fontSize={12}>
                        {startY}
                    </text>
                    <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke={axisColor} />
                    <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={axisColor} />
                </g>

                {/* Path for selected easing */}
                <circle cx={x} cy={y} r={5} fill="#415A77" />
                <path d={pathToD(easingPoints)} stroke="#415A77" fill="none" strokeWidth={2} />

                {/* X-axis label */}
                <text x={innerWidth / 2} y={innerHeight + 15} textAnchor="middle" fontSize={12} fill={axisColor}>
                    Time
                </text>
            </g>
        </svg>
    );
};

export default EasingChart;
