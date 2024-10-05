"use client";
import { useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import SVGGrid from "../SVGGrid";

interface RectangleAttributes {
    // svgWidth: number;
    // svgHeight: number;
    height?: number;
    width?: number;
    fill?: string;
    strokeWidth?: number;
    stroke?: string;
    x?: number;
    y?: number;
    rx?: number;
}

interface SVGWrapperProps {
    width: number;
    height: number;
}

interface RectangleProps {
    data: RectangleAttributes;
    svg: SVGWrapperProps;
    children?: React.ReactNode;
}

const AnimatedRectangle: React.FC<RectangleProps> = ({ data, svg, children }) => {
    const { values, restartAnimations } = useAnimatedValuesContext();

    const mergedValues = {
        ...data,
        ...values,
    };

    const { width: svgWidth, height: svgHeight } = svg;

    // remove undefined values from the object so that the attributes are not set to undefined on the element
    const filteredValues = Object.fromEntries(Object.entries(mergedValues).filter(([_, value]) => value !== undefined));

    // TODO: make sure that the cellSize of the grid is a multiple of the width and height of the rectangle

    return (
        <>
            <button onClick={restartAnimations}>Restart</button>
            <svg width={svgWidth} height={svgHeight}>
                <SVGGrid width={svgWidth} height={svgHeight} cellSize={20} stroke="#dbeafe" strokeWidth={0.5} />
                <rect {...filteredValues} />

                {/* <g transform="translate(50, 50)">
                    {array.map((value, index) => {
                        const x = index * rectWidth; // Position rectangles horizontally based on index
                        const y = 0; // All rectangles are in the same row (y = 0)
                        return (
                            <rect
                                key={index}
                                x={x}
                                y={y}
                                width={rectWidth}
                                height={rectHeight}
                                fill={"white"} // Default fill if not animated
                                stroke="#333"
                                strokeWidth={1}
                            />
                        );
                    })}
                </g> */}

                {children}
            </svg>
        </>
    );
};

export default AnimatedRectangle;
