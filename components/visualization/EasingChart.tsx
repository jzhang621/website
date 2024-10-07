"use client";
import React from "react";
import { useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import { getEasingFunction } from "@/hooks/useEasedValues";
import { ACCENT, BLUE } from "@/palette";

const generateEasingPath = (
    easingFunction: (t: number) => number,
    width: number,
    height: number,
    steps: number
) => {
    const points: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const easedValue = easingFunction(t);
        const x = t * width;
        const y = (1 - easedValue) * height;
        points.push([x, y]);
    }
    return points;
};

const pathToD = (points: [number, number][]) =>
    points.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");

interface EasingChartProps {
    width: number;
    height: number;
    steps?: number;
    easingType: "cubic" | "elastic" | "linear";
    startY?: number;
    endY?: number;
    yAxisLabel?: string; // New prop for Y-axis label
}

const EasingChart: React.FC<EasingChartProps> = ({
    width,
    height,
    steps = 100,
    easingType = "cubic",
    startY = 0,
    endY = 1,
    yAxisLabel = "value", // Default label if none provided
}) => {
    const { easedProgress, progress } = useAnimatedValuesContext();

    const xm = 40;
    const ym = 30;
    const margin = { top: ym, right: xm, bottom: ym, left: xm }; // Increased left margin for y-axis label
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = progress * innerWidth;
    const y = (1 - easedProgress) * innerHeight;

    const easingFunction = getEasingFunction(easingType);

    const easingPoints = generateEasingPath(easingFunction, innerWidth, innerHeight, steps);
    const axisColor = "#9CA3AF";

    return (
        <svg width={width} height={height} className="mx-auto">
            <g transform={`translate(${margin.left},${margin.top})`}>
                {/* Y-axis label */}
                <text
                    x={0}
                    dx={-5}
                    y={innerHeight / 2}
                    textAnchor="end"
                    fontSize={10}
                    fill={axisColor}
                    transform={`${-margin.left} ${innerHeight / 2})`}
                >
                    {yAxisLabel}
                </text>

                {/* Existing axis elements */}
                <g
                    strokeDasharray={"8 4"}
                    strokeWidth={0.5}
                    className="axis"
                    fill={axisColor}
                    fontSize={10}
                    fontWeight={500}
                >
                    <text dx={-5} y={0} textAnchor="end" dominantBaseline={"middle"}>
                        {endY}
                    </text>

                    <text dx={-5} y={innerHeight} textAnchor="end">
                        {startY}
                    </text>
                    <line
                        x1={0}
                        y1={innerHeight}
                        x2={innerWidth}
                        y2={innerHeight}
                        stroke={axisColor}
                    />
                    <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={axisColor} />
                </g>

                {/* Path and circle */}
                <circle cx={x} cy={y} r={5} fill={BLUE} />
                <path d={pathToD(easingPoints)} stroke={BLUE} fill="none" strokeWidth={3} />

                {/* X-axis label */}
                <text
                    x={innerWidth / 2}
                    y={innerHeight + 12.5}
                    textAnchor="middle"
                    fontSize={10}
                    fill={axisColor}
                >
                    time
                </text>
            </g>
        </svg>
    );
};

export default EasingChart;