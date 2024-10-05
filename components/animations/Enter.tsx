"use client";
import { AnimatedValueProvider, useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";
import React from "react";
import SVGElementSnippet, { AnimatedSVGElementSnippet } from "../editor/SVGElementSnippet";
import SVGWrapper from "../editor/SVGWrapperElement";

const data = { opacity: 0 };
const svg = { width: 850, height: 300 };

export const EnteringGroup: React.FC<{ ease: "linear" | "cubic" | "elastic"; duration: number }> = ({ ease = "cubic", duration = 3 }) => {
    return (
        <div className="flex my-4 gap-4">
            <AnimatedValueProvider
                animations={{
                    opacity: { from: data.opacity, to: 1, duration, ease },
                }}
            >
                <SVGWrapper name="svg" attributes={{ width: svg.width, height: svg.height }}>
                    <AnimatedSVGElementSnippet data={{ ...data, name: "g" }}>
                        <SVGElementSnippet level={2} data={{ name: "rect", x: 20, y: 10, width: 250, height: 250, fill: "white", strokeWidth: 2, stroke: "black" }} />
                        <br />
                        <SVGElementSnippet level={2} data={{ name: "rect", x: 270, y: 10, width: 250, height: 250, fill: "white", strokeWidth: 2, stroke: "black" }} />
                        <br />
                        <SVGElementSnippet level={2} data={{ name: "rect", x: 540, y: 10, width: 250, height: 250, fill: "white", strokeWidth: 2, stroke: "black" }} />
                        <br />
                    </AnimatedSVGElementSnippet>
                </SVGWrapper>

                <AnimatedSVGGroup>
                    <rect x={20} y={10} width={250} height={250} fill="white" strokeWidth={2} stroke="black" />
                    <rect x={270} y={10} width={250} height={250} fill="white" strokeWidth={2} stroke="black" />
                    <rect x={20 + 2 * 250} y={10} width={250} height={250} fill="white" strokeWidth={2} stroke="black" />
                </AnimatedSVGGroup>
            </AnimatedValueProvider>
        </div>
    );
};

const AnimatedSVGGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { values } = useAnimatedValuesContext();

    return (
        <svg width={svg.width} height={svg.height}>
            <g opacity={values.opacity}>{children}</g>
        </svg>
    );
};
