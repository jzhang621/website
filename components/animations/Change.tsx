"use client";
import { AnimatedValueProvider, useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import React, { useEffect, useRef } from "react";
import SVGElementSnippet, { AnimatedSVGElementSnippet } from "../editor/SVGElementSnippet";
import SVGWrapper from "../editor/SVGWrapperElement";
import { ACCENT, BLUE, BLUE_ACCENT, COGNAC, COGNAC_ACCENT, SAGE, SAGE_ACCENT } from "@/palette";
import SVGGrid from "../SVGGrid";
import PlayButon from "../ReplayButton";
import EasingChart from "../EasingChart";
import { Ease } from "@/hooks/useEasedValues";

const data = { opacity: 0 };
const svg = { width: 600, height: 600 };

const boxWidth = 300;

const rect = {
    fill: COGNAC,
    x: 0,
    y: 0,
    width: boxWidth,
    height: boxWidth,
    strokeWidth: 4,
    stroke: COGNAC_ACCENT,
    rx: 4,
};

const g = {
    name: "g",
    transform: `translate(${(svg.width - boxWidth) / 2},${(svg.height - boxWidth) / 2})`,

    fontSize: 134,
    fill: "white",
    dominantBaseline: "middle",
    textAnchor: "middle",
    fontFamily: "monospace",
};

const text = {
    opacity: 0,
    x: boxWidth / 2,
    y: boxWidth / 2,
};

export const Change: React.FC<{
    ease: Ease;
    duration: number;
}> = ({ ease = "cubic", duration = 3 }) => {
    return (
        <div className="grid grid-cols-2 gap-2 p-4">
            <AnimatedValueProvider
                animations={{
                    opacity: { from: data.opacity, to: 1, duration, ease },
                }}
            >
                <div className="rounded-lg h-fit-content mx-auto">
                    <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                        <SVGElementSnippet data={g}>
                            {" ".repeat(4)}
                            <span className="text-gray-400">{`<rect ... />`}</span>
                            <br />
                            <AnimatedSVGElementSnippet level={2} data={{ ...text, name: "text" }}>
                                {" ".repeat(6)}5<br />
                            </AnimatedSVGElementSnippet>
                            <br />
                            <AnimatedSVGElementSnippet
                                invert
                                level={2}
                                data={{ ...text, name: "text" }}
                            >
                                {" ".repeat(6)}3<br />
                            </AnimatedSVGElementSnippet>
                            <br />
                        </SVGElementSnippet>
                    </SVGWrapper>
                </div>

                <div className="space-y-2">
                    <AnimatedSVGGroup {...svg}>
                        <rect {...rect} />
                    </AnimatedSVGGroup>
                    <EasingChart
                        valueName="opacity"
                        width={400}
                        height={120}
                        invert
                        startY={data.opacity}
                        endY={1}
                        easingType={ease}
                        yAxisLabel="opacity"
                    />
                </div>
            </AnimatedValueProvider>
        </div>
    );
};

const AnimatedSVGGroup: React.FC<{ children: React.ReactNode; width: number; height: number }> = ({
    children,
    width,
    height,
}) => {
    const { values, restartAnimations, restartKey, progress } = useAnimatedValuesContext();
    const { opacity } = values;

    return (
        <div className="max-h-[600px] relative w-full flex items-center justify-center ">
            <svg
                width={"100%"}
                className="mx-auto bg-[#fdf6e399]"
                viewBox={`0 0 ${width} ${height}`}
            >
                <SVGGrid
                    width={width}
                    height={height}
                    cellSize={100}
                    stroke={ACCENT}
                    strokeWidth={1.5}
                />
                <g {...g}>
                    {children}
                    <text {...text} opacity={opacity}>
                        5
                    </text>
                    <text {...text} opacity={1 - opacity}>
                        3
                    </text>
                </g>
            </svg>
            <PlayButon onClick={restartAnimations} restartKey={restartKey} progress={progress} />
        </div>
    );
};
