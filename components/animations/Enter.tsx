"use client";
import { AnimatedValueProvider, useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import React from "react";
import SVGElementSnippet, { AnimatedSVGElementSnippet } from "../editor/SVGElementSnippet";
import SVGWrapper from "../editor/SVGWrapperElement";
import { ACCENT, BLUE, BLUE_ACCENT, COGNAC, COGNAC_ACCENT, SAGE, SAGE_ACCENT } from "@/palette";
import SVGGrid from "../SVGGrid";
import PlayButton from "../ReplayButton";
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

const text = {
    x: boxWidth / 2,
    y: boxWidth / 2,
    fontSize: 134,
    fill: "white",
    dominantBaseline: "middle",
    textAnchor: "middle",
    fontFamily: "monospace",
};

const translate = `translate(${(svg.width - boxWidth) / 2},${(svg.height - boxWidth) / 2})`;

export const EnteringGroup: React.FC<{
    ease: Ease;
    duration: number;
}> = ({ ease = "easeInExpo", duration = 3 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 p-4">
            <AnimatedValueProvider
                animations={{
                    opacity: { from: data.opacity, to: 1, duration, ease },
                }}
            >
                <div className="rounded-lg h-fit-content mx-auto">
                    <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                        <AnimatedSVGElementSnippet
                            data={{ ...data, name: "g", transform: translate }}
                        >
                            <SVGElementSnippet level={2} data={{ ...rect, name: "rect" }} />
                            <br />
                            <SVGElementSnippet level={2} data={{ ...text, name: "text" }}>
                                {" ".repeat(6)}3<br />
                            </SVGElementSnippet>
                            <br />
                        </AnimatedSVGElementSnippet>
                    </SVGWrapper>
                </div>

                <div className="space-y-2">
                    <AnimatedSVGGroup {...svg}>
                        <rect {...rect} />
                        <text {...text}>3</text>
                    </AnimatedSVGGroup>
                    <EasingChart
                        valueName="opacity"
                        width={400}
                        height={120}
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
    const { values, restartAnimations, progress, restartKey } = useAnimatedValuesContext();

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
                <g opacity={values.opacity} transform={translate}>
                    {children}
                </g>
            </svg>
            <PlayButton onClick={restartAnimations} restartKey={restartKey} progress={progress} />
        </div>
    );
};
