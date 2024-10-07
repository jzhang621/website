"use client";
import React, { useState } from "react";
import TwoPane from "../layout/TwoPane";
import EditableAttribute from "./EditableSVGAttribute";
import { Source_Code_Pro } from "next/font/google";
import styles from "./SVGSyntax.module.css";
import SVGGrid from "../SVGGrid";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], weight: ["400", "700"] });

interface RectangleAttributes {
    svgWidth: number;
    svgHeight: number;
    height: number;
    width: number;
    fill: string;
    strokeWidth: number;
    stroke: string;
    x: number;
    y: number;
    rx: number;
}

interface SvgRectangleProps {
    attributes: RectangleAttributes;
}

const Rectangle: React.FC<SvgRectangleProps> = ({ attributes }) => {
    const { svgWidth, svgHeight, width, height, fill, strokeWidth, stroke, x, y, rx } = attributes;

    return (
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="bg-white mx-auto" height="100%">
            <SVGGrid
                width={svgWidth}
                height={svgHeight}
                cellSize={50}
                stroke="#dbeafe"
                strokeWidth={0.5}
            />
            <rect
                width={width}
                height={height}
                fill={fill}
                strokeWidth={strokeWidth}
                stroke={stroke}
                x={x}
                y={y}
                rx={rx}
            />
        </svg>
    );
};

const SPACE = "  ";

interface Attributes {
    svgWidth: number;
    svgHeight: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    x: number;
    y: number;
    rx: number;
}

const SVGEditor: React.FC = () => {
    const [attributes, setAttributes] = useState<Attributes>({
        svgWidth: 500,
        svgHeight: 500,
        width: 300,
        height: 300,
        fill: "white",
        stroke: "#a1a1aa",
        strokeWidth: 2,
        x: 100,
        y: 100,
        rx: 2,
    });

    const handleAttributeChange = (name: string, value: string | number) => {
        setAttributes((prevAttributes) => ({
            ...prevAttributes,
            [name]: value,
        }));
    };

    const syntaxHighlighted = (
        <div className={`${styles.codeContainer} text-slate-700 p-8`}>
            <pre>
                <code className={sourceCodePro.className}>
                    <span className={styles.tag}>&lt;svg</span>{" "}
                    <span className={styles.attribute}>width</span>={`"${attributes.svgWidth}" `}
                    <span className={styles.attribute}>height</span>
                    {`="${attributes.svgHeight}"`}
                    <span className={styles.tag}>{`>`}</span>
                    <br />
                    {SPACE.repeat(2)}
                    <span className={styles.tag}>{`<rect`}</span>
                    <br />
                    {SPACE.repeat(4)}
                    <span className={styles.attribute}>x</span>
                    {`="${attributes.x}"`}
                    <br />
                    {SPACE.repeat(4)}
                    <span className={styles.attribute}>y</span>
                    {`="${attributes.y}"`}
                    <br />
                    {SPACE.repeat(4)}
                    <span className={styles.attribute}>rx</span>
                    {`="${attributes.rx}"`}
                    <br />
                    {SPACE.repeat(4)}
                    <EditableAttribute
                        name="width"
                        label="width"
                        value={attributes.width}
                        onValueChange={handleAttributeChange}
                        min={300}
                        max={400}
                    />
                    <br />
                    {SPACE.repeat(4)}
                    <EditableAttribute
                        name="height"
                        label="height"
                        value={attributes.height}
                        onValueChange={handleAttributeChange}
                        min={300}
                        max={400}
                    />
                    <br />
                    {SPACE.repeat(4)}
                    <EditableAttribute
                        name="fill"
                        label="fill"
                        value={attributes.fill}
                        options={["white", "black", "red", "blue"]}
                        onValueChange={handleAttributeChange}
                    />
                    <br />
                    {SPACE.repeat(4)}
                    <EditableAttribute
                        name="stroke"
                        label="stroke"
                        value={attributes.stroke}
                        options={["#a1a1aa", "#000000", "#FF0000"]}
                        onValueChange={handleAttributeChange}
                    />
                    <br />
                    {SPACE.repeat(4)}
                    <EditableAttribute
                        name="strokeWidth"
                        label="stroke-width"
                        value={attributes.strokeWidth}
                        onValueChange={handleAttributeChange}
                        min={1}
                        max={5}
                    />
                    <br />
                    {SPACE.repeat(2)}
                    <span className={styles.tag}>{`/>`}</span>
                    <br />
                    <span className={styles.tag}>{`</svg>`}</span>
                </code>
            </pre>
        </div>
    );

    const visual = <Rectangle attributes={attributes} />;

    // return <TwoPane content={syntaxHighlighted} visual={visual} />;
    return (
        <div className="flex w-[90%] mx-auto mt-16 mb-8">
            <div>{syntaxHighlighted}</div>
            <div className="w-full">{visual}</div>
        </div>
    );
};

export default SVGEditor;
