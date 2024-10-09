"use client";
import { AnimatedValueProvider, useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import React from "react";
import SVGElementSnippet, { AnimatedSVGElementSnippet } from "../editor/SVGElementSnippet";
import AnimatedRectangle from "../AnimatedRectangle";
import SVGWrapper from "../editor/SVGWrapperElement";
import EasingChart from "@/components/EasingChart";
import { BLUE_ACCENT, BLUE, COGNAC, COGNAC_ACCENT } from "@/palette";
import { Ease } from "@/hooks/useEasedValues";
import { Replay } from "@mui/icons-material";
import PlayButton from "../ReplayButton";

const svg = { width: 600, height: 600 };
const data = {
    name: "rect",
    fill: COGNAC,
    x: 50,
    y: svg.height / 2 - 260 / 2,
    width: 260,
    height: 260,
    strokeWidth: 4,
    stroke: COGNAC_ACCENT,
    rx: 4,
};

const Comparision: React.FC = ({}) => {
    const { values, restartAnimations, progress, restartKey } = useAnimatedValuesContext();

    const { widthLinear, widthCubic } = values;

    const linearData = { ...data, width: widthLinear };

    const linear = (
        <div className="flex flex-col">
            <div className="mb-4 mx-auto text-lg">Linear</div>
            <AnimatedRectangle data={linearData} svg={svg} replay={false} />
            <EasingChart
                valueName="widthLinear"
                width={400}
                height={150}
                startY={data.width}
                endY={500}
                easingType={"linear"}
                yAxisLabel="width"
            />
        </div>
    );

    const cubicData = { ...data, width: widthCubic };
    const cubic = (
        <div className="flex flex-col">
            <div className="mb-4 mx-auto text-lg">Cubic</div>
            <AnimatedRectangle data={cubicData} svg={svg} replay={false} />
            <EasingChart
                valueName="widthCubic"
                width={400}
                height={150}
                startY={data.width}
                endY={500}
                easingType={"cubic"}
                yAxisLabel="width"
            />
        </div>
    );

    return (
        <div className="relative grid grid-cols-2 gap-8 p-4 my-12">
            {linear}
            {cubic}
            <PlayButton onClick={restartAnimations} progress={progress} restartKey={restartKey} />
        </div>
    );
};

export const ComparisionRectangles: React.FC = ({}) => {
    return (
        <AnimatedValueProvider
            animations={{
                widthLinear: { from: data.width, to: 500, duration: 5, ease: "linear" },
                widthCubic: { from: data.width, to: 500, duration: 5, ease: "cubic" },
            }}
        >
            <Comparision />
        </AnimatedValueProvider>
    );
};

// export const GrowingRectangle: React.FC<{
//     ease: Ease;
// }> = ({ ease = "cubic" }) => {
//     return (
//         <AnimatedValueProvider
//             animations={{
//                 width: { from: data.width, to: 500, duration: 5, ease },
//             }}
//         >
//             <div className="grid grid-cols-2 gap-2 p-4">
//                 {/* <div className="flex items-center justify-center rounded-lg mx-auto "> */}
//                 <div className="rounded-lg h-fit-content mx-auto">
//                     <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
//                         <AnimatedSVGElementSnippet data={data} />
//                     </SVGWrapper>
//                 </div>
//                 <div className="space-y-2">
//                     <AnimatedRectangle data={data} svg={svg} />
//                     <EasingChart
//                         valueName="width"
//                         width={400}
//                         height={150}
//                         startY={data.width}
//                         endY={500}
//                         easingType={ease}
//                         yAxisLabel="width"
//                     />
//                 </div>
//             </div>
//         </AnimatedValueProvider>
//     );
// };

export const GrowingRectangle: React.FC<{ ease: Ease }> = ({ ease = "cubic" }) => {
    return (
        <AnimatedValueProvider
            animations={{
                width: { from: data.width, to: 500, duration: 5, ease },
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 p-4">
                {/* SVG Wrapper */}
                <div className="rounded-lg mx-auto">
                    <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                        <AnimatedSVGElementSnippet data={data} />
                    </SVGWrapper>
                </div>

                {/* Animated Rectangle and Easing Chart */}
                <div className="space-y-4">
                    <AnimatedRectangle data={data} svg={svg} />
                    <EasingChart
                        valueName="width"
                        width={300} // Adjusted width for mobile
                        height={150}
                        startY={data.width}
                        endY={500}
                        easingType={ease}
                        yAxisLabel="width"
                    />
                </div>
            </div>
        </AnimatedValueProvider>
    );
};

export const MovingRectangle: React.FC<{ ease: Ease }> = ({ ease = "elastic" }) => {
    const x = { from: 75, to: 420, duration: 5, ease };

    const height = 200;

    const rect = { width: 100, height, y: svg.height / 2 - height / 2 };

    return (
        <AnimatedValueProvider
            animations={{
                x,
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 p-4">
                {/* <div className="flex items-center justify-center rounded-lg mx-auto "> */}
                <div className="rounded-lg h-fit-content mx-auto">
                    <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                        <AnimatedSVGElementSnippet data={{ ...data, ...rect }} />
                    </SVGWrapper>
                </div>
                <div className="space-y-2">
                    <AnimatedRectangle data={{ ...data, ...rect }} svg={svg} />
                    <EasingChart
                        valueName="x"
                        width={400}
                        height={120}
                        startY={x.from}
                        endY={x.to}
                        easingType={ease}
                        yAxisLabel="x"
                    />
                </div>
            </div>
        </AnimatedValueProvider>
    );
};

export const HighlightedRectangle: React.FC<{ ease: Ease }> = ({ ease = "cubic" }) => {
    return (
        <div className="flex my-4">
            <AnimatedValueProvider
                animations={{
                    strokeWidth: {
                        from: data.strokeWidth,
                        to: data.strokeWidth * 5,
                        duration: 2,
                        ease,
                    },
                }}
            >
                <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                    <AnimatedSVGElementSnippet data={data} />
                    <br />
                    <SVGElementSnippet data={{ ...data, x: data.x + data.width }} />
                </SVGWrapper>
                <AnimatedRectangle data={data} svg={svg}>
                    <rect
                        x={data.x + data.width}
                        y={data.y}
                        width={data.width}
                        height={data.height}
                        fill={data.fill}
                        strokeWidth={data.strokeWidth}
                        stroke="black"
                    />
                </AnimatedRectangle>
            </AnimatedValueProvider>
        </div>
    );
};
