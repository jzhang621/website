import { AnimatedValueProvider } from "@/contexts/AnimatedValuesProvider";
import React from "react";
import SVGElementSnippet, { AnimatedSVGElementSnippet } from "../editor/SVGElementSnippet";
import AnimatedRectangle from "../visualization/AnimatedRectangle";
import SVGWrapper from "../editor/SVGWrapperElement";
import EasingChart from "@/components/visualization/EasingChart";

const data = { name: "rect", fill: "white", x: 20, y: 20, width: 260, height: 260, strokeWidth: 2, stroke: "black", rx: 4 };
const svg = { width: 850, height: 300 };

export const GrowingRectangle: React.FC<{ ease: "linear" | "cubic" | "elastic" }> = ({ ease = "cubic" }) => {
    return (
        <AnimatedValueProvider
            animations={{
                width: { from: data.width, to: 500, duration: 5, ease },
            }}
        >
            <div className="flex my-4 gap-4">
                <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                    <AnimatedSVGElementSnippet data={data} />
                </SVGWrapper>
                <AnimatedRectangle data={data} svg={svg} />
            </div>

            <EasingChart width={400} height={150} startY={data.width} endY={500} easingType="cubic" />
        </AnimatedValueProvider>
    );
};

export const MovingRectangle: React.FC<{ ease: "linear" | "cubic" | "elastic" }> = ({ ease = "elastic" }) => {
    return (
        <AnimatedValueProvider
            animations={{
                x: { from: 100, to: 300, duration: 5, ease },
            }}
        >
            <div className="flex my-4 gap-4">
                <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                    <AnimatedSVGElementSnippet data={data} />
                </SVGWrapper>
                <AnimatedRectangle data={data} svg={svg} />
            </div>
            <EasingChart width={400} height={150} startY={100} endY={300} easingType="elastic" />
        </AnimatedValueProvider>
    );
};

export const HighlightedRectangle: React.FC<{ ease: "linear" | "cubic" | "elastic" }> = ({ ease = "cubic" }) => {
    return (
        <div className="flex my-4 gap-4">
            <AnimatedValueProvider
                animations={{
                    strokeWidth: { from: data.strokeWidth, to: data.strokeWidth * 5, duration: 2, ease },
                }}
            >
                <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                    <AnimatedSVGElementSnippet data={data} />
                    <br />
                    <SVGElementSnippet data={{ ...data, x: data.x + data.width }} />
                </SVGWrapper>
                <AnimatedRectangle data={data} svg={svg}>
                    <rect x={data.x + data.width} y={data.y} width={data.width} height={data.height} fill={data.fill} strokeWidth={data.strokeWidth} stroke="black" />
                </AnimatedRectangle>
            </AnimatedValueProvider>
        </div>
    );
};
