"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface ColorGradientProps {
    minValue: number;
    maxValue: number;
    width: number;
    height: number;
    labelMargin: number;
    colorScale: d3.ScaleSequential<string>;
    id: string;
}

export const ColorGradient: React.FC<ColorGradientProps> = ({
    minValue,
    maxValue,
    width,
    height,
    labelMargin,
    colorScale,
    id,
}) => {
    const stops = 5;

    const gradientStops = Array.from({ length: stops + 1 }, (_, i) => {
        const value = maxValue - (i / stops) * (maxValue - minValue);
        return <stop key={i} offset={`${(i / stops) * 100}%`} stopColor={colorScale(value)} />;
    });

    return (
        <g>
            <defs>
                <linearGradient id={`colorScaleGradient-${id}`} gradientTransform="rotate(90)">
                    {gradientStops}
                </linearGradient>
            </defs>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={`url(#colorScaleGradient-${id})`}
            />
            <text x={width + labelMargin} y={0} fill="#888" fontSize={10} dominantBaseline="middle">
                {maxValue.toFixed(2)}
            </text>
            <text
                x={width + labelMargin}
                y={height}
                fill="#888"
                fontSize={10}
                dominantBaseline="middle"
            >
                {minValue.toFixed(2)}
            </text>
        </g>
    );
};

interface EmbeddingVisualizerProps {
    embedding: number[];
    maxPerRow?: number;
    min?: number;
    max?: number;
    abs?: boolean;
    id: string;
}

const estimateMonospaceWidth = (text: string, fontSize: number) => {
    // Approximate width of a monospace character (around 60% of fontSize)
    const charWidth = fontSize * 0.6;
    return text.length * charWidth;
};

export const EmbeddingVisualizer: React.FC<EmbeddingVisualizerProps> = ({
    embedding,
    maxPerRow = 100,
    min = undefined,
    max = undefined,
    abs = false,
    id,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(800);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateWidth = () => {
            const newWidth = containerRef.current?.getBoundingClientRect().width || 960;
            setContainerWidth(newWidth);
        };

        updateWidth();
        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(containerRef.current);

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    if (!embedding.length) return null;

    const PADDING = 30;
    const GRADIENT_WIDTH = 10;
    const MARGIN_RIGHT = 10;
    const LABEL_WIDTH = 30;
    const LABEL_MARGIN = 5;
    const AVAILABLE_WIDTH =
        containerWidth - GRADIENT_WIDTH - MARGIN_RIGHT - LABEL_WIDTH - LABEL_MARGIN - PADDING * 2;

    const cellWidth = AVAILABLE_WIDTH / Math.min(embedding.length, maxPerRow);
    const height = cellWidth;
    const spacing = 0;

    const rows = Math.ceil(embedding.length / maxPerRow);
    const totalHeight = (height + spacing) * rows + PADDING * 2;

    let [minValue, maxValue] = [min, max];
    if (minValue === undefined || maxValue === undefined) {
        [minValue, maxValue] = d3.extent(embedding) as [number, number];
    }

    const interpolater = abs ? d3.interpolateBlues : d3.interpolateRdBu;
    const colorScale = d3.scaleSequential().domain([minValue, maxValue]).interpolator(interpolater);

    const cells = embedding.map((value, index) => {
        const row = Math.floor(index / maxPerRow);
        const col = index % maxPerRow;
        const x = PADDING + GRADIENT_WIDTH + LABEL_WIDTH + LABEL_MARGIN + col * cellWidth;
        const y = PADDING + row * (height + spacing) + spacing;
        const isHovered = hoveredIndex === index;

        const FONT_SIZE = 12;
        const TEXT_PADDING = 8;
        const tooltipText = value.toFixed(3);
        const textWidth = estimateMonospaceWidth(tooltipText, FONT_SIZE);
        const tooltipWidth = textWidth + TEXT_PADDING * 2;
        const tooltipHeight = 20;

        return (
            <g
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Main rectangle */}
                <rect x={x} y={y} width={cellWidth} height={height} fill={colorScale(value)} />

                {/* Hover highlight */}
                {isHovered && (
                    <rect
                        x={x}
                        y={y}
                        width={cellWidth}
                        height={height}
                        stroke="black"
                        strokeWidth={1}
                        fill="none"
                    />
                )}

                {/* Tooltip */}
                {isHovered && (
                    <g>
                        <rect
                            x={x + cellWidth / 2 - tooltipWidth / 2}
                            y={y - tooltipHeight - 5}
                            width={tooltipWidth}
                            height={tooltipHeight}
                            fill="#77A6A9"
                            rx={4}
                            ry={4}
                        />
                        <text
                            x={x + cellWidth / 2}
                            y={y - tooltipHeight / 2 - 4}
                            fill="white"
                            fontSize={FONT_SIZE}
                            fontFamily="monospace"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {tooltipText}
                        </text>
                    </g>
                )}
            </g>
        );
    });

    return (
        <div ref={containerRef} className="w-full h-full">
            <svg width={containerWidth} height={totalHeight}>
                <g transform={`translate(${PADDING / 2}, ${PADDING})`}>
                    <ColorGradient
                        minValue={minValue}
                        maxValue={maxValue}
                        width={GRADIENT_WIDTH}
                        height={totalHeight - PADDING * 2}
                        labelMargin={LABEL_MARGIN}
                        colorScale={colorScale}
                        id={id}
                    />
                </g>
                {cells}
            </svg>
        </div>
    );
};
