import { AnimatedValueProvider } from "@/contexts/AnimatedValuesProvider";
import React from "react";
import SVGElementSnippet, { AnimatedSVGElementSnippet } from "../editor/SVGElementSnippet";
import AnimatedRectangle from "../visualization/AnimatedRectangle";
import SVGWrapper from "../editor/SVGWrapperElement";
import EasingChart from "@/components/visualization/EasingChart";
import { ACCENT_BLUE, BLUE } from "@/palette";

const svg = { width: 600, height: 600 };
const data = {
    name: "rect",
    fill: BLUE,
    x: 50,
    y: svg.height / 2 - 210,
    width: 260,
    height: 260,
    strokeWidth: 3,
    stroke: ACCENT_BLUE,
    rx: 4,
};

export const GrowingRectangle1: React.FC<{
    ease: "linear" | "cubic" | "elastic";
}> = ({ ease = "cubic" }) => {
    return (
        <AnimatedValueProvider
            animations={{
                width: { from: data.width, to: 500, duration: 5, ease },
            }}
        >
            <div className="flex my-4">
                <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                    <AnimatedSVGElementSnippet data={data} />
                </SVGWrapper>
                <AnimatedRectangle data={data} svg={svg} ease={ease} />
            </div>
        </AnimatedValueProvider>
    );
};

export const GrowingRectangle: React.FC<{
    ease: "linear" | "cubic" | "elastic";
}> = ({ ease = "cubic" }) => {
    return (
        <AnimatedValueProvider
            animations={{
                width: { from: data.width, to: 500, duration: 5, ease },
            }}
        >
            <div className="flex my-4">
                <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                    <AnimatedSVGElementSnippet data={data} />
                </SVGWrapper>
                <AnimatedRectangle data={data} svg={svg} ease={ease} />
            </div>
        </AnimatedValueProvider>
    );
};

export const MovingRectangle: React.FC<{ ease: "linear" | "cubic" | "elastic" }> = ({
    ease = "elastic",
}) => {
    const x = { from: 75, to: 420, duration: 5, ease };

    const height = 160;

    const rect = { width: 100, height, y: svg.height / 2 - height / 2 };

    return (
        <AnimatedValueProvider
            animations={{
                x,
            }}
        >
            <div className="rounded-md flex flex-col  my-12 w-[85%] mx-auto border-2 border-[rgb(253,226,154)]">
                <div className="flex">
                    <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                        <AnimatedSVGElementSnippet data={{ ...data, ...rect }} />
                    </SVGWrapper>
                    <AnimatedRectangle data={{ ...data, ...rect }} svg={svg} ease={ease} />
                </div>
                {/* <div className="w-full border-2 p-4">
                    <EasingChart
                        width={400}
                        height={150}
                        startY={x.from}
                        endY={x.to}
                        easingType="elastic"
                        yAxisLabel="x"
                    />
                </div> */}
            </div>
        </AnimatedValueProvider>
    );
};

export const HighlightedRectangle: React.FC<{ ease: "linear" | "cubic" | "elastic" }> = ({
    ease = "cubic",
}) => {
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
