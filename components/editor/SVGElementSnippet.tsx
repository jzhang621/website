"use client";
import React from "react";
import styles from "./SVGSyntax.module.css"; // Assuming CSS module for syntax highlighting
import { useAnimatedValuesContext } from "@/contexts/AnimatedValuesProvider";

interface SVGElementAttributes {
    [key: string]: string | number;
}

interface SVGElementSnippetProps {
    data: SVGElementAttributes;
    tabSize?: number;
    level?: number;
    children?: React.ReactNode;
    highlights?: string[];
    invert?: boolean;
}

const jsxToSvgMap = {
    strokeWidth: "stroke-width",
    fontSize: "font-size",
    dominantBaseline: "dominant-baseline",
    textAnchor: "text-anchor",
};

const SPACE = " ";

export const AnimatedSVGElementSnippet: React.FC<SVGElementSnippetProps> = ({
    data,
    tabSize = 2,
    level = 1,
    children,
    invert = false,
}) => {
    const { name, ...attributes } = data;

    const { values } = useAnimatedValuesContext();

    let mergedAttributes = {
        ...attributes,
        ...values,
    };

    const highlights = Object.keys(values);

    if (invert) {
        for (const key in values) {
            const value = 1 - values[key];

            mergedAttributes = {
                ...mergedAttributes,
                [key]: value === 0 || value === 1 ? value : value.toFixed(4),
            };
        }
    }

    return (
        <SVGElementSnippet
            data={{ name, ...mergedAttributes }}
            tabSize={tabSize}
            level={level}
            highlights={highlights}
            invert={invert}
        >
            {children}
        </SVGElementSnippet>
    );
};

const SVGElementSnippet: React.FC<SVGElementSnippetProps> = ({
    data,
    tabSize = 2,
    level = 1,
    children,
    highlights = [],
    invert = false,
}) => {
    const { name, ...attributes } = data;

    const renderAttributes = () => {
        return Object.entries(attributes).map(([key, value]) => {
            const content = (
                <>
                    {SPACE.repeat(tabSize * (1 + level))}
                    <span className={styles.attribute}>
                        {jsxToSvgMap[key as keyof typeof jsxToSvgMap] ?? key}
                    </span>
                    {`="${value}"`}
                    <br />
                </>
            );

            // highlight the attribute that is being animated
            if (highlights.includes(key)) {
                const invertColor = invert ? `bg-[#B0807045]` : `bg-[#98a86945]`;

                return (
                    <div key={key} className={`${invertColor} rounded-md`}>
                        {content}
                    </div>
                );
            }

            return <span key={key}>{content}</span>;
        });
    };

    return (
        <>
            {SPACE.repeat(tabSize * level)}
            <span className={styles.tag}>&lt;{name}</span>
            <br />
            {renderAttributes()}
            {children ? (
                <>
                    {SPACE.repeat(tabSize * level)}
                    <span className={styles.tag}>{`>`}</span>
                    <br />
                    {children}
                    {SPACE.repeat(tabSize * level)}
                    <span className={styles.tag}>{`</${name}>`}</span>
                </>
            ) : (
                <>
                    {SPACE.repeat(tabSize * level)}
                    <span className={styles.tag}>{`/>`}</span>
                </>
            )}
        </>
    );
};

export default SVGElementSnippet;
