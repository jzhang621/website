/**
 * Applies a 3x3 matrix transformation to a Uint8Array of pixel values.
 * @param pixels - Uint8Array representing pixel values (R, G, B, R, G, B, ...)
 * @param matrix - 3x3 matrix for transformation
 * @returns A new Uint8Array with transformed pixel values
 */
export function applyMatrixTransformation(pixels: Uint8Array, matrix: number[][]): Uint8Array {
    if (matrix.length !== 3 || matrix.some(row => row.length !== 3)) {
        throw new Error('Matrix must be 3x3');
    }

    const result = new Uint8Array(pixels.length);

    for (let i = 0; i < pixels.length; i += 3) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const newR = Math.round(r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2]);
        const newG = Math.round(r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2]);
        const newB = Math.round(r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2]);

        result[i] = clampRGB([newR, 0, 0])[0];
        result[i + 1] = clampRGB([0, newG, 0])[1];
        result[i + 2] = clampRGB([0, 0, newB])[2];
    }

    return result;
}


export function generateRGBGradient(startRGB: [number, number, number], endRGB: [number, number, number], steps = 3) {
    const gradient = [];

    // Linear interpolation helper function
    function interpolate(start: number, end: number, factor: number) {
        return Math.round(start + (end - start) * factor);
    }

    // Generate gradient
    for (let i = 0; i <= steps; i++) {
        const factor = i / steps; // factor for interpolation (from 0 to 1)
        const r = interpolate(startRGB[0], endRGB[0], factor);
        const g = interpolate(startRGB[1], endRGB[1], factor);
        const b = interpolate(startRGB[2], endRGB[2], factor);

        gradient.push([r, g, b]);
    }

    return gradient;
}



export function clampRGB(rgb: [number, number, number]): [number, number, number] {
    return rgb.map(value => Math.max(0, Math.min(255, value))) as [number, number, number];
}


/**
 * Extracts a square of RGB points from a Uint8Array of pixel values.
 * @param pixels - Uint8Array representing pixel values (R, G, B, R, G, B, ...)
 * @param startRow - Starting row in the 2D grid
 * @param startCol - Starting column in the 2D grid
 * @param size - Number of rows and columns to extract
 * @returns An array of [r, g, b] points
 */
export function extractRGBPoints(
    pixels: Uint8Array,
    startRow: number = 0,
    startCol: number = 0,
    size: number = 10
): Array<[number, number, number]> {
    const imageWidth = Math.sqrt(pixels.length / 3);
    if (!Number.isInteger(imageWidth)) {
        throw new Error('Pixels array length is not a perfect square when divided by 3');
    }

    const result: Array<[number, number, number]> = [];

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const pixelRow = startRow + row;
            const pixelCol = startCol + col;
            const index = (pixelRow * imageWidth + pixelCol) * 3;

            if (index + 2 < pixels.length && pixelCol < imageWidth) {
                result.push([
                    pixels[index],
                    pixels[index + 1],
                    pixels[index + 2]
                ]);
            }
        }
    }

    return result;
}

/**
 * Interpolates between two RGB colors over a given animation duration.
 * @param start - Starting RGB color [r, g, b]
 * @param end - Ending RGB color [r, g, b]
 * @param duration - Animation duration in milliseconds
 * @param currentTime - Current time of the animation in milliseconds
 * @returns Interpolated RGB color [r, g, b]
 */
export function interpolateRGB(
    start: [number, number, number],
    end: [number, number, number],
    duration: number,
    currentTime: number
): [number, number, number] {
    const progress = Math.min(currentTime / duration, 1);

    const r = Math.round(start[0] + (end[0] - start[0]) * progress);
    const g = Math.round(start[1] + (end[1] - start[1]) * progress);
    const b = Math.round(start[2] + (end[2] - start[2]) * progress);

    return clampRGB([r, g, b]);
}
