import React from "react";

export interface DataItem {
    index: number;
    value: number;
    interpolatedIndex?: number; // Used for interpolation
}

export interface Variable {
    name: string;
    value: number; // Represents the index
    interpolatedValue?: number; // Used for interpolation
}

interface ArrayVisualizationProps {
    data: DataItem[];
    variables: Variable[];
    boxSize?: number;
    margin?: number; // The margin around the content
}

const Array: React.FC<ArrayVisualizationProps> = ({
    data,
    variables,
    boxSize = 50,
    margin = 20,
}) => {
    const totalArrayWidth = data.length * boxSize;

    // ViewBox dimensions (including margin)
    const viewBoxWidth = totalArrayWidth + margin * 2;
    const viewBoxHeight = boxSize + margin * 2;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Render the array elements */}
            {data.map((item, idx) => (
                <g
                    key={item.index}
                    transform={`translate(${margin + item.index * boxSize}, ${margin})`}
                >
                    <rect
                        width={boxSize}
                        height={boxSize}
                        fill="lightblue"
                        stroke="black"
                        strokeWidth={2}
                        rx={1}
                    />
                    <text
                        x={boxSize / 2}
                        y={boxSize / 2}
                        alignmentBaseline="middle"
                        fontFamily="monospace"
                        textAnchor="middle"
                        fontSize="16"
                        fill="black"
                    >
                        {item.value}
                    </text>
                </g>
            ))}

            {/* Render the variables */}
            {variables.map((variable) => {
                const dataIndex = variable.interpolatedValue ?? variable.value;

                return (
                    <g
                        key={variable.name}
                        transform={`translate(${margin + dataIndex * boxSize}, ${margin})`}
                    >
                        <rect
                            width={boxSize}
                            height={boxSize}
                            fill="none"
                            stroke="green"
                            strokeWidth={2}
                        />
                        <text
                            x={boxSize / 2}
                            y={-10}
                            alignmentBaseline="middle"
                            textAnchor="middle"
                            fontFamily="monospace"
                            fontSize="12"
                            fill="black"
                        >
                            {variable.name}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default Array;
