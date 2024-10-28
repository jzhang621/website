"use client";

import React, { useEffect, useRef, useState } from 'react';
import { redwood } from '@/data/redwood';

// Function to load binary data from a file and convert it to Uint8Array
async function loadBinaryFile(url: string): Promise<Uint8Array> {
    const response = await fetch(url); // Fetch the binary file
    const arrayBuffer = await response.arrayBuffer(); // Get ArrayBuffer from the response
    return new Uint8Array(arrayBuffer); // Convert ArrayBuffer to Uint8Array
}

// Function to render the Uint8Array (RGB values) to a canvas
function renderUint8ArrayToCanvas(canvas: HTMLCanvasElement, uint8Array: Uint8Array, width: number, height: number) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);

    // Copy the Uint8Array into the ImageData (RGB format assumed)
    for (let i = 0; i < uint8Array.length; i += 3) {
        const r = uint8Array[i];
        const g = uint8Array[i + 1];
        const b = uint8Array[i + 2];
        const index = (i / 3) * 4; // Mapping 3 channels to 4 (RGB -> RGBA)

        imageData.data[index] = r; // Red
        imageData.data[index + 1] = g; // Green
        imageData.data[index + 2] = b; // Blue
        imageData.data[index + 3] = 255; // Alpha (fully opaque)
    }

    // Put the ImageData onto the canvas
    ctx.putImageData(imageData, 0, 0);
}

interface ImageRendererProps {
    matrix?: number[][][];
    width?: number;
    height?: number;
    data?: Uint8Array;
}



const ImageRenderer: React.FC<ImageRendererProps> = ({ data = redwood, width = 512, height = 512, matrix }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const imageData = ctx.createImageData(width, height);

            for (let i = 0; i < data.length; i += 3) {
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];

                if (matrix) {
                    const [mr, mg, mb] = matrix;
                    r = mr[0]! * r + mr[1]! * g + mr[2]! * b;
                    g = mg[0]! * r + mg[1]! * g + mg[2]! * b;
                    b = mb[0]! * r + mb[1]! * g + mb[2]! * b;

                    r = Math.max(0, Math.min(255, r));
                    g = Math.max(0, Math.min(255, g));
                    b = Math.max(0, Math.min(255, b));
                }

                const index = (i / 3) * 4;
                imageData.data[index] = r;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = b;
                imageData.data[index + 3] = 255;
            }

            ctx.putImageData(imageData, 0, 0);
            setDataLoaded(true);
        }
    }, [data, width, height, matrix]);

    return (
        <div>
            {/* {!dataLoaded && <p>Loading image data...</p>} */}
            <canvas ref={canvasRef} width={width} height={height}></canvas>
        </div>
    );
};

export default ImageRenderer;