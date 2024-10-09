"use client";
import { useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import SVGGrid from "./SVGGrid";
import PlayButton from "./ReplayButton";
import { ACCENT } from "@/palette";
import { Ease } from "@/hooks/useEasedValues";

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
    replay?: boolean;
}

const AnimatedRectangle: React.FC<RectangleProps> = ({ data, svg, children, replay = true }) => {
    const { values, restartAnimations, progress, restartKey } = useAnimatedValuesContext();

    const mergedValues = {
        ...data,
        ...values,
    };

    const { width: svgWidth, height: svgHeight } = svg;

    // remove undefined values from the object so that the attributes are not set to undefined on the element
    const filteredValues = Object.fromEntries(
        Object.entries(mergedValues).filter(([_, value]) => value !== undefined)
    );

    return (
        <div className="max-h-[600px] gap-2 w-full flex flex-col items-center justify-center bg-[#fdf6e399]">
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
                {replay && (
                    <PlayButton
                        onClick={restartAnimations}
                        restartKey={restartKey}
                        progress={progress}
                    />
                )}
            </div>
        </div>
    );
};

export default AnimatedRectangle;
