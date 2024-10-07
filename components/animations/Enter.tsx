"use client";
import { AnimatedValueProvider, useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import React from "react";
import SVGElementSnippet, { AnimatedSVGElementSnippet } from "../editor/SVGElementSnippet";
import SVGWrapper from "../editor/SVGWrapperElement";

const data = { opacity: 0 };
const svg = { width: 600, height: 600 };

export const EnteringGroup: React.FC<{
    ease: "linear" | "cubic" | "elastic";
    duration: number;
}> = ({ ease = "cubic", duration = 3 }) => {
    const boxWidth = 250;
    const translate = `translate(${svg.width - boxWidth / 2},${svg.height - boxWidth / 2})`;

    return (
        <div className="flex mx-auto w-[90%] my-12">
            <AnimatedValueProvider
                animations={{
                    opacity: { from: data.opacity, to: 1, duration, ease },
                }}
            >
                <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                    <AnimatedSVGElementSnippet data={{ ...data, name: "g", transform: translate }}>
                        <SVGElementSnippet
                            level={2}
                            data={{
                                name: "rect",
                                width: boxWidth,
                                height: boxWidth,
                                fill: "white",
                                "stroke-width": 2,
                                stroke: "black",
                            }}
                        />
                        <br />
                        <SVGElementSnippet
                            level={2}
                            data={{
                                name: "text",
                                x: boxWidth / 2,
                                y: boxWidth / 2,
                                "font-size": 100,
                                fill: "black",
                                "dominant-baseline": "middle",
                                "text-anchor": "middle",
                            }}
                        >
                            {" ".repeat(6)}3<br />
                        </SVGElementSnippet>
                        <br />
                    </AnimatedSVGElementSnippet>
                </SVGWrapper>

                <AnimatedSVGGroup {...svg}>
                    <g transform="translate(50,50)">
                        <rect
                            width={250}
                            height={250}
                            fill="white"
                            strokeWidth={2}
                            stroke="black"
                            rx="4"
                        />
                        <text
                            x={250 / 2}
                            y={250 / 2}
                            fontSize={100}
                            fill="black"
                            dominantBaseline={"middle"}
                            textAnchor={"middle"}
                            fontFamily="monospace"
                        >
                            3
                        </text>
                    </g>
                </AnimatedSVGGroup>
            </AnimatedValueProvider>
        </div>
    );
};

const AnimatedSVGGroup: React.FC<{ children: React.ReactNode; width: number; height: number }> = ({
    children,
    width,
    height,
}) => {
    const { values } = useAnimatedValuesContext();

    return (
        <div className="flex-1 max-h-[600px] relative w-full flex items-center justify-center bg-[#fdf6e399]">
            <svg height={"100%"} className="mx-auto" viewBox={`0 0 ${width} ${height}`}>
                <g opacity={values.opacity} transform={"translate(475, 475}"}>
                    {children}
                </g>
            </svg>
        </div>
    );
};
