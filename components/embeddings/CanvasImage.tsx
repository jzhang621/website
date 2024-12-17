"use client";
import React, { useEffect, useRef, useState } from "react";

interface CanvasImageProps {
    imageUrl: string;
    otherImageUrl: string;
    width: number;
}

interface HoverState {
    isHovering: boolean;
    x: number;
    y: number;
    rgb: [number, number, number];
}

const CanvasImage: React.FC<CanvasImageProps> = ({ imageUrl, otherImageUrl, width }) => {
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
        <div className="flex space-x-4">
            <div onMouseLeave={() => handleMouseLeave()} className="relative">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    onMouseMove={(e) => handleMouseMove(e, false)}
                    className="cursor-none"
                />
                {(hoverStateOriginal.isHovering || hoverStateTransformed.isHovering) && (
                    <div
                        className="absolute pointer-events-none bg-white p-1 rounded shadow-lg"
                        style={{
                            left:
                                hoverStateOriginal.x - hoverStateOriginal.rgb.join(", ").length * 7,
                            top: hoverStateOriginal.y + 5,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 rounded"
                                style={{
                                    backgroundColor: `rgb(${hoverStateOriginal.rgb.join(",")})`,
                                }}
                            />
                            <code className="text-xs">
                                rgb({hoverStateOriginal.rgb.join(", ")})
                            </code>
                        </div>
                    </div>
                )}
            </div>
            <div onMouseLeave={() => handleMouseLeave()} className="relative">
                <canvas
                    ref={transformedCanvasRef}
                    width={width}
                    height={height}
                    onMouseMove={(e) => handleMouseMove(e, true)}
                    className="cursor-none"
                />
                {(hoverStateTransformed.isHovering || hoverStateOriginal.isHovering) && (
                    <div
                        className="absolute pointer-events-none bg-white p-1 rounded shadow-lg"
                        style={{
                            left:
                                hoverStateTransformed.x -
                                hoverStateTransformed.rgb.join(", ").length * 7,
                            top: hoverStateTransformed.y + 5,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 rounded"
                                style={{
                                    backgroundColor: `rgb(${hoverStateTransformed.rgb.join(",")})`,
                                }}
                            />
                            <code className="text-xs">
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
