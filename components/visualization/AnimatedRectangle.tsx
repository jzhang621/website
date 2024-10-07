"use client";
import { useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import SVGGrid from "../SVGGrid";
import ReplayButton from "../ReplayButton";
import EasingChart from "./EasingChart";
import { ACCENT } from "@/palette";

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
    ease?: "linear" | "cubic" | "elastic";
}

const AnimatedRectangle: React.FC<RectangleProps> = ({ data, svg, children, ease = "cubic" }) => {
    const { values, restartAnimations, progress } = useAnimatedValuesContext();

    const mergedValues = {
        ...data,
        ...values,
    };

    const { width: svgWidth, height: svgHeight } = svg;

    // remove undefined values from the object so that the attributes are not set to undefined on the element
    const filteredValues = Object.fromEntries(
        Object.entries(mergedValues).filter(([_, value]) => value !== undefined)
    );

    // TODO: make sure that the cellSize of the grid is a multiple of the width and height of the rectangle

    return (
        <div className="max-h-[600px] gap-2 w-full flex flex-1 flex-col items-center justify-center bg-[#fdf6e399]">
            <div className="relative w-full">
                <svg width={"100%"} className="mx-auto" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    <SVGGrid
                        width={svgWidth}
                        height={svgHeight}
                        cellSize={100}
                        stroke={ACCENT}
                        // stroke="
                        strokeWidth={1.5}
                    />
                    {children}
                    <rect {...filteredValues} />
                </svg>
                <ReplayButton onClick={restartAnimations} disabled={progress < 1} />
                {/* <div className="absolute bottom-0 w-full p-2 bg-none rounded-md ">
                    <EasingChart
                        width={355}
                        height={100}
                        startY={data.width}
                        endY={500}
                        easingType={ease}
                        yAxisLabel="width"
                    />
                </div> */}
            </div>
            {/* <div className="w-full p-2 bg-none rounded-md ">
                <EasingChart
                    width={355}
                    height={100}
                    startY={data.width}
                    endY={500}
                    easingType={ease}
                    yAxisLabel="width"
                />
            </div> */}
        </div>
    );
};

export default AnimatedRectangle;
