import React from "react";
import SVGGrid from "../SVGGrid";

interface InterpolatedItem {
    interpolatedValue?: number;
    progress?: number;
    enter?: boolean;
    exit?: boolean;
}

export interface DataItem extends InterpolatedItem {
    index: number;
    value: number;
}

export interface Variable extends InterpolatedItem {
    name: string;
    value: number;
}

export interface State {
    data: DataItem[];
    variables: Variable[];
}

interface ArrayVisualizationProps {
    data: DataItem[];
    variables: Variable[];
    boxSize?: number;
    margin?: number; // The margin around the content
    marginX?: number; // The margin around the x-axis
}

const Array: React.FC<ArrayVisualizationProps> = ({
    data,
    variables,
    boxSize = 50,
    margin = 20,
    marginX = 40,
}) => {
    const totalArrayWidth = data.length * boxSize;

    // viewBox dimensions (including margin)
    const viewBoxWidth = totalArrayWidth + marginX * 2;
    const viewBoxHeight = boxSize + margin * 2;

    const rect = {
        // fill: "#a7de83",
        fill: "#77A993",
        // stroke: "#84b067",
        stroke: "#5C917A",
        // stroke: "#c9684b",
        strokeWidth: 1.5,
        strokeOpacity: 0.85,
        rx: 1,
    };

    const text = {
        fontSize: 16,
        fontWeight: 700,
        fill: "#ffffe3",
        opacity: 1,
    };

    const variableRect = {
        fill: "none",
        // stroke: "#fdfbd4",
        stroke: "#a7de83",
        strokeWidth: 2,
        rx: 1,
        // rx: 2,
    };

    const buffer = 0.5;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`${-buffer} ${-buffer} ${viewBoxWidth + buffer * 2} ${
                viewBoxHeight + buffer * 2
            }`}
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Render the array elements */}
            <SVGGrid
                width={viewBoxWidth}
                height={viewBoxHeight}
                cellSize={boxSize / 2}
                stroke={"#d3d3d3aa"}
                strokeWidth={0.25}
            />

            {data.map((item, idx) => (
                <g
                    key={item.index}
                    transform={`translate(${
                        marginX + (item.interpolatedValue ?? item.index) * boxSize
                    }, ${margin})`}
                >
                    <rect width={boxSize} height={boxSize} {...rect} />
                    <text
                        x={boxSize / 2}
                        y={boxSize / 2}
                        alignmentBaseline="middle"
                        fontFamily="monospace"
                        textAnchor="middle"
                        {...text}
                    >
                        {item.value}
                    </text>
                </g>
            ))}

            {/* Render the variables */}
            {variables.map((variable) => {
                const dataIndex = variable.interpolatedValue ?? variable.value;

                let opacity = 1;
                if (variable.enter && variable.progress === undefined) {
                    opacity = 0;
                }

                if ((variable.enter || variable.exit) && variable.progress !== undefined) {
                    opacity = variable.progress;
                }

                return (
                    <g
                        key={variable.name}
                        opacity={opacity}
                        transform={`translate(${marginX + dataIndex * boxSize}, ${margin})`}
                    >
                        <rect width={boxSize} height={boxSize} {...variableRect} />
                    </g>
                );
            })}
        </svg>
    );
};

export default Array;
