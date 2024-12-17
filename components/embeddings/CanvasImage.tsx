"use client";
import React, { useEffect, useRef, useState } from "react";

interface CanvasImageProps {
    imageUrl: string;
    otherImageUrl: string;
    width: number;
    functionLabel: string;
}

interface HoverState {
    isHovering: boolean;
    x: number;
    y: number;
    rgb: [number, number, number];
}

const CanvasImage: React.FC<CanvasImageProps> = ({
    imageUrl,
    otherImageUrl,
    functionLabel = "Function",
}) => {
    const width = 512;
    const height = width;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const transformedCanvasRef = useRef<HTMLCanvasElement>(null);
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [transformedImageData, setTransformedImageData] = useState<ImageData | null>(null);
    const [hoverStateOriginal, setHoverStateOriginal] = useState<HoverState>({
        isHovering: false,
        x: 0,
        y: 0,
        rgb: [0, 0, 0],
    });
    const [hoverStateTransformed, setHoverStateTransformed] = useState<HoverState>({
        isHovering: false,
        x: 0,
        y: 0,
        rgb: [0, 0, 0],
    });

    useEffect(() => {
        const loadImage = (url: string, callback: (data: ImageData) => void) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const image = new Image();
            image.src = url;
            image.onload = () => {
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(image, 0, 0, width, height);
                const data = ctx.getImageData(0, 0, width, height);
                callback(data);
            };
            image.onerror = () => {
                console.error("Failed to load image:", url);
            };
        };

        loadImage(imageUrl, setImageData);
        loadImage(otherImageUrl, setTransformedImageData);
    }, [imageUrl, otherImageUrl, width, height]);

    useEffect(() => {
        if (imageData && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                ctx.putImageData(imageData, 0, 0);
            }
        }
    }, [imageData]);

    useEffect(() => {
        if (transformedImageData && transformedCanvasRef.current) {
            const ctx = transformedCanvasRef.current.getContext("2d");
            if (ctx) {
                ctx.putImageData(transformedImageData, 0, 0);
            }
        }
    }, [transformedImageData]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>, isTransformed: boolean) => {
        const data = isTransformed ? transformedImageData : imageData;
        const otherData = isTransformed ? imageData : transformedImageData;
        if (!data) return;

        const canvas = isTransformed ? transformedCanvasRef.current : canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
        const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

        const i = (y * width + x) * 4;
        const rgb: [number, number, number] = [data.data[i], data.data[i + 1], data.data[i + 2]];
        const otherRgb: [number, number, number] = [
            otherData!.data[i],
            otherData!.data[i + 1],
            otherData!.data[i + 2],
        ];

        const baseState = {
            isHovering: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        // we are hovering over the transformed image
        // so we need to get our hover state to the transformed image
        // we need to set the original image hover state to the original image
        if (isTransformed) {
            setHoverStateTransformed({ ...baseState, rgb });
            setHoverStateOriginal({ ...baseState, rgb: otherRgb });
        } else {
            setHoverStateOriginal({ ...baseState, rgb });
            setHoverStateTransformed({ ...baseState, rgb: otherRgb });
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(data, 0, 0);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 0.5, y - 0.5, 1, 1);

        const otherCanvas = isTransformed ? canvasRef.current : transformedCanvasRef.current;
        if (!otherCanvas) return;

        const otherCtx = otherCanvas.getContext("2d");
        if (!otherCtx) return;

        if (!otherData) return;

        otherCtx.clearRect(0, 0, otherCanvas.width, otherCanvas.height);
        otherCtx.putImageData(otherData, 0, 0);
        otherCtx.strokeStyle = "white";
        otherCtx.lineWidth = 1;
        otherCtx.strokeRect(x - 0.5, y - 0.5, 1, 1);
    };

    const handleMouseLeave = () => {
        setHoverStateTransformed({
            isHovering: false,
            x: 0,
            y: 0,
            rgb: [0, 0, 0],
        });
        setHoverStateOriginal({
            isHovering: false,
            x: 0,
            y: 0,
            rgb: [0, 0, 0],
        });

        // clear the rects
        const canvas = canvasRef.current;
        const otherCanvas = transformedCanvasRef.current;
        if (!canvas || !otherCanvas) return;

        const ctx = canvas.getContext("2d");
        const otherCtx = otherCanvas.getContext("2d");
        if (!ctx || !otherCtx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        otherCtx.clearRect(0, 0, otherCanvas.width, otherCanvas.height);

        ctx.putImageData(imageData!, 0, 0);
        otherCtx.putImageData(transformedImageData!, 0, 0);
    };

    return (
        <div className="flex items-center space-x-4 w-full h-full">
            <div
                onMouseLeave={handleMouseLeave}
                className="relative flex-1"
                style={{ overflow: "visible" }}
            >
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    onMouseMove={(e) => handleMouseMove(e, false)}
                    className="cursor-none w-full h-auto"
                    style={{ aspectRatio: `${width} / ${height}` }}
                />
                {(hoverStateOriginal.isHovering || hoverStateTransformed.isHovering) && (
                    <div
                        className="absolute pointer-events-none bg-white p-1 rounded shadow-lg whitespace-nowrap"
                        style={{
                            left: hoverStateOriginal.x + 10,
                            top: hoverStateOriginal.y + 10,
                            zIndex: 50,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 rounded"
                                style={{
                                    backgroundColor: `rgb(${hoverStateOriginal.rgb.join(",")})`,
                                }}
                            />
                            <code style={{ fontSize: "10px" }}>
                                rgb({hoverStateOriginal.rgb.join(", ")})
                            </code>
                        </div>
                    </div>
                )}
            </div>

            <svg
                className="flex-none w-1/5 h-auto"
                viewBox="0 0 100 50"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#6C6C6C" />
                    </marker>
                </defs>
                <line
                    x1="0"
                    y1="25"
                    x2="100"
                    y2="25"
                    stroke="#6C6C6C"
                    strokeWidth="1.5"
                    markerEnd="url(#arrow)"
                    opacity={0.5}
                />
                <text
                    x="50"
                    y="40"
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="8px"
                    fill="#5B5B5B"
                    opacity={0.75}
                >
                    {functionLabel}
                </text>
            </svg>

            <div onMouseLeave={handleMouseLeave} className="relative flex-1">
                <canvas
                    ref={transformedCanvasRef}
                    width={width}
                    height={height}
                    onMouseMove={(e) => handleMouseMove(e, true)}
                    className="cursor-none w-full h-auto"
                    style={{ aspectRatio: `${width} / ${height}` }}
                />
                {(hoverStateTransformed.isHovering || hoverStateOriginal.isHovering) && (
                    <div
                        className="absolute pointer-events-none bg-white p-1 rounded shadow-lg whitespace-nowrap"
                        style={{
                            left: hoverStateTransformed.x + 10,
                            top: hoverStateTransformed.y + 10,
                            zIndex: 50,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 rounded"
                                style={{
                                    backgroundColor: `rgb(${hoverStateTransformed.rgb.join(",")})`,
                                }}
                            />
                            <code style={{ fontSize: "10px" }}>
                                rgb({hoverStateTransformed.rgb.join(", ")})
                            </code>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CanvasImage;
